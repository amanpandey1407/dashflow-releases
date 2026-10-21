// Validates version manifest files (version.json or version.dev.json)
// Usage: node scripts/validate-manifest.mjs [path-to-version.json]
import fs from 'fs';
import path from 'path';

const targetPath = process.argv[2] || path.resolve('version.json');

console.log(`[Manifest Validator] Checking: ${targetPath}`);

if (!fs.existsSync(targetPath)) {
  console.error(`❌ Error: File not found: ${targetPath}`);
  process.exit(1);
}

let data;
try {
  const content = fs.readFileSync(targetPath, 'utf8');
  data = JSON.parse(content);
} catch (err) {
  console.error(`❌ Invalid JSON syntax:`, err.message);
  process.exit(1);
}

let errors = 0;
const semverRegex = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/;

function parseSemver(v) {
  const match = String(v).trim().match(semverRegex);
  if (!match) return null;
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10)
  };
}

function compareSemver(a, b) {
  const pa = parseSemver(a);
  const pb = parseSemver(b);
  if (!pa || !pb) return 0;
  if (pa.major !== pb.major) return pa.major - pb.major;
  if (pa.minor !== pb.minor) return pa.minor - pb.minor;
  return pa.patch - pb.patch;
}

// 1. Validate Desktop
if (!data.desktop) {
  console.error(`❌ Missing root 'desktop' object`);
  errors++;
} else {
  const d = data.desktop;
  if (!d.latestVersion || !semverRegex.test(d.latestVersion)) {
    console.error(`❌ desktop.latestVersion is missing or invalid semver: "${d.latestVersion}"`);
    errors++;
  }
  if (!d.minVersion || !semverRegex.test(d.minVersion)) {
    console.error(`❌ desktop.minVersion is missing or invalid semver: "${d.minVersion}"`);
    errors++;
  }
  if (d.latestVersion && d.minVersion && compareSemver(d.minVersion, d.latestVersion) > 0) {
    console.error(`❌ desktop.minVersion (${d.minVersion}) cannot be greater than latestVersion (${d.latestVersion})`);
    errors++;
  }
  if (!Array.isArray(d.releaseNotes) || d.releaseNotes.length === 0) {
    console.error(`❌ desktop.releaseNotes must be a non-empty array of strings`);
    errors++;
  }
  if (!d.downloadUrl || !d.downloadUrl.startsWith('http')) {
    console.error(`❌ desktop.downloadUrl must be a valid http/https URL: "${d.downloadUrl}"`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n💥 Validation failed with ${errors} error(s).`);
  process.exit(1);
}

console.log(`\n✅ Manifest is valid!`);
console.log(`   Desktop Latest: ${data.desktop?.latestVersion} (Min: ${data.desktop?.minVersion})`);

