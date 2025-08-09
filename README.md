

# ⏱️ Time Tracker Chrome Extension

A Chrome Extension to track time spent on different websites and visualize productivity analytics with a Node.js + MongoDB backend.

---

## 📁 Project Structure

time-tracker-extension/
│
├── server/
│   ├── server.js
│   ├── database.js          
│   └── models/
│       └── UserData.js
│
├── extension/
│   ├── popup.js
│   ├── popup.html
│   ├── manifest.json
│   ├── content.js
│   ├── background.js
│   ├── icons/
│   │   └── icon.png
│   └── dashboard/
│       ├── dashboard.js
│       ├── dashboard.html
│       └── dashboard.css
│
└── README.md

---

## 🛠️ Installation Instructions

### 1. 🚀 Start Backend Server

```bash
cd server
npm install express mongoose cors
node server.js

