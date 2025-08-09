// background.js

// Listen for messages from popup.js or other parts of extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openDashboard") {
    // Open the dashboard page in a new tab
    chrome.tabs.create({ url: chrome.runtime.getURL("dashboard/dashboard.html") });
  }
});
