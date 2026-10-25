# DashFlow

> High-speed, multi-threaded download manager for Windows with seamless browser integration and media streaming capture.

[![Latest Release](https://img.shields.io/github/v/release/amanpandey1407/dashflow-releases?color=0d9488&label=Release&logo=github)](https://github.com/amanpandey1407/dashflow-releases/releases/latest)
[![Platform](https://img.shields.io/badge/Platform-Windows%2010%20%2F%2011%20(64--bit)-1e293b?logo=windows11&logoColor=white)](https://github.com/amanpandey1407/dashflow-releases/releases/latest)

---

## 📥 Downloads

| 🪟 Windows Desktop App | 🧩 Browser Companion |
| :--- | :--- |
| **Full Desktop Application** | **Chromium Extension** |
| Standalone manager with multi-threaded acceleration, queue scheduler, and media grabber. | Automatically intercepts downloads and video streams from Chrome, Edge, and Brave. |
| [![Download Windows App](https://img.shields.io/badge/Download-DashFlow--Setup.exe-059669?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/amanpandey1407/dashflow-releases/releases/latest/download/DashFlow-Setup.exe) | [![Download Extension](https://img.shields.io/badge/Download-DashFlow--Extension.zip-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white)](https://github.com/amanpandey1407/dashflow-releases/releases/latest/download/DashFlow-Extension.zip) |
| <sub>Windows 10 / 11 (64-bit)</sub> | <sub>Unzip & load in `chrome://extensions`</sub> |

---

## 🚀 Key Features

* **Multi-Threaded Turbo Engine**: Splits files into up to 16+ simultaneous connections to maximize download speeds.
* **1-Click Browser Catching**: Seamlessly intercepts downloads from Chrome, Edge, Brave, and other Chromium browsers.
* **Media & Stream Grabber**: Captures streaming video and audio with custom quality and format selection.
* **Smart Queue & Scheduler**: Set concurrency limits, schedule downloads, or enable speed limiting.
* **Auto-Categorization**: Automatically sorts completed files into Documents, Programs, Videos, Audio, and Archives.
* **Clean UI**: Modern dark interface with live speed charts, progress indicators, and system tray support.
* **Ad-Free**: No third-party toolbars or intrusive popups.

---

## 💻 Setup Guide

### 🪟 1. Desktop App Installation
1. Download **[DashFlow-Setup.exe](https://github.com/amanpandey1407/dashflow-releases/releases/latest/download/DashFlow-Setup.exe)**.
2. Run the installer and launch **DashFlow**.

### 🧩 2. Browser Extension Installation
1. Download and extract **[DashFlow-Extension.zip](https://github.com/amanpandey1407/dashflow-releases/releases/latest/download/DashFlow-Extension.zip)** to a permanent folder.
2. Open your browser's extension page:
   * **Chrome**: `chrome://extensions`
   * **Edge**: `edge://extensions`
   * **Brave**: `brave://extensions`
   * **Opera / Vivaldi**: `opera://extensions`
3. Toggle **Developer mode** (top-right corner).
4. Click **Load unpacked** and select the extracted folder.

---

## 📋 System Requirements

* **Operating System**: Windows 10 (1809+) or Windows 11 (64-bit)
* **Architecture**: x64 (AMD64 / Intel 64)
* **Storage**: ~150 MB free disk space

---

## 🔑 Checksum & Authenticity Verification

Verify the integrity of your installer to ensure it is authentic and has not been tampered with:

| File | SHA-256 Checksum |
| :--- | :--- |
| **`DashFlow-Setup.exe`** | `a5eafe45e2eae554ee1fac2fd491b8f7cbe47451f90124774b11c9c9c80c88b9` |
| **`DashFlow-Extension.zip`** | `ae81bb8800793211a8c355ce707f006bc91205659ddf8d8a3de84435ba913205` |

Verify in Windows PowerShell:
```powershell
Get-FileHash DashFlow-Setup.exe -Algorithm SHA256
```

---

## 🛡️ Security, Privacy & Extension Permissions

DashFlow is built on a strict **Local-First Architecture**. Your downloaded files, personal credentials, browsing history, and links stay 100% on your device. The companion browser extension communicates **only** with your local desktop application bridge (`http://127.0.0.1:9527`).

### 🧩 Why Browser Permissions Are Needed

| Permission | Purpose & Technical Reason |
| :--- | :--- |
| **`downloads`** | Intercepts browser download events and hands them to DashFlow's multi-stream accelerator. |
| **`webRequest`** | Detects downloadable file headers (such as `.zip`, `.exe`, `.iso`, `.mp4`) to show the pre-download confirmation dialog. |
| **`cookies`** | Securely hands authentication session tokens to DashFlow's local media engine so you can download high-resolution streams you have access to. |
| **`contextMenus`** | Adds "Download with DashFlow" and "Download all links with DashFlow" to your browser's right-click menu. |
| **`notifications`** | Shows native Windows desktop toast notifications when a download completes or is interrupted. |
| **`storage`** | Saves your local extension preferences (theme, button toggles) inside your browser's private local storage. |
| **`<all_urls>` (Host)** | Allows the in-page video detection button to render over online video players. |

---

### 🔒 100% Clean & Malware-Free Guarantee

DashFlow is built for user safety, speed, and trust:
* 🛡️ **Zero Malware / Zero Viruses**: 100% clean of trojans, adware, spyware, keyloggers, and cryptocurrency miners.
* 🛡️ **No Third-Party Bundles**: Clean installer without bundled toolbars, search hijackers, or unwanted software.
* 🛡️ **Strict Local Processing**: The extension communicates exclusively with the local desktop app on your PC. No browsing history, URLs, or personal data ever leave your machine.
* 🛡️ **Cryptographic Verification**: Every build is verified with SHA-256 checksums to guarantee file integrity.



