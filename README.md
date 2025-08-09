# ⏱️ Time Tracker Chrome Extension
COMPANY : CODTECH SOLUTIONS
NAME: SHALU
INTERN ID:CT06DG2964
DOMAIN: FULL STACK DEVELOPER
DURATION: 6 WEEKS
MENTOR: NEELA SANTOSH

Chrome extension designed to help users monitor the time they spend on various websites and gain insights into their online productivity. By categorizing websites into "Productive" and "Non-Productive" categories, the extension allows users to understand their browsing habits, helping them stay focused and manage their time more effectively.

The extension collects browsing data and sends it to a backend server built with Node.js and MongoDB for storage and analysis. The server processes this data and exposes APIs that provide detailed analytics and weekly reports. A dashboard displays the time spent on each website in an easy-to-read format, with time shown in hours, minutes, and seconds.

This tool is especially useful for students, professionals, and anyone who wants to improve their productivity by tracking how their time is divided among different websites during their work sessions.
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



### 1. 🚀 Start Backend Server

```bash
cd server
npm install express mongoose cors
node server.js


