# User-Segmentation-Analyzer
A **real-time analytics dashboard** that automatically segments and tags users based on their activity patterns.  
The app **refreshes every 5 seconds** to display the latest stats for **active users**, **time spent**, and **last active time**.  

## 🏷 User Categories
- 🟢 **Most Active Users** — Top engagement & high session time  
- 🟡 **Active Users** — Consistent activity  
- 🔴 **Users at Risk** — Declining or minimal activity  

## ✨ Features
- ⚡ **Live auto-refresh** every 5 seconds  
- 🏷 **Automatic user tagging** into activity groups  
- ⏳ Track **time spent per session**  
- 📅 Show **last active timestamp** for each user  
- 📱 **Responsive UI** for desktop and mobile  

## 🛠 Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Data Handling:** JSON / API integration  
- **Deployment:** Works on any Node-compatible hosting  

## 🚀 Use Cases
- 📈 Detect **engagement trends** instantly  
- 🛡 Identify **churn risks** early  
- 🏆 Track **top contributors** in real time  

## 📂 Project Structure
user-segmentation-app/
│
├── index.html        # Main HTML file for UI
├── main.css          # Tailwind-generated CSS
├── script.js         # Frontend JS (fetch & update user table)
├── server.js         # Backend server logic
├── package.json      # Node.js dependencies
├── tailwind.config.js# Tailwind config file
└── node_modules/     # Installed dependencies
