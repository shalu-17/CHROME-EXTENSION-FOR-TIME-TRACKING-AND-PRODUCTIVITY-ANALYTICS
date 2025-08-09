// Wait until the popup's DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get references to popup UI elements
  const siteNameEl = document.getElementById("siteName");
  const timerEl = document.getElementById("timeValue");
  const categoryEl = document.getElementById("category");
  const openDashboardBtn = document.getElementById("openDashboardBtn");

  // List of website categories (Productive vs Non-Productive)
  const websiteCategories = {
    // Productive sites
    "leetcode.com": "Productive",
    "geeksforgeeks.org": "Productive",
    "github.com": "Productive",
    "stackoverflow.com": "Productive",
    "w3schools.com": "Productive",
    "tutorialspoint.com": "Productive",
    "google.com": "Productive",
    "chat.openai.com": "Productive",
    "chatgpt.com": "Productive",       
    "medium.com": "Productive",
    "dev.to": "Productive",
    "hackerrank.com": "Productive",
    "codechef.com": "Productive",
    "coursera.org": "Productive",
    "edx.org": "Productive",
    "khanacademy.org": "Productive",
    "udemy.com": "Productive",
    "stackexchange.com": "Productive",
    "docs.python.org": "Productive",
    "developer.mozilla.org": "Productive",
    "codeninjas.com": "Productive",

    // Non-Productive sites
    "linkedin.com": "Non-Productive",
    "facebook.com": "Non-Productive",
    "instagram.com": "Non-Productive",
    "twitter.com": "Non-Productive",
    "youtube.com": "Non-Productive",
    "netflix.com": "Non-Productive",
    "hotstar.com": "Non-Productive",
    "discord.com": "Non-Productive",
    "tiktok.com": "Non-Productive",
    "reddit.com": "Non-Productive",
    "9gag.com": "Non-Productive",
    "buzzfeed.com": "Non-Productive",
    "pinterest.com": "Non-Productive",
    "tumblr.com": "Non-Productive",
    "snapchat.com": "Non-Productive",
    "quora.com": "Non-Productive",
    "imdb.com": "Non-Productive",
    "espn.com": "Non-Productive",
    "flipkart.com": "Non-Productive",
    "amazon.in": "Non-Productive",
    "myntra.com": "Non-Productive",
    "shopify.com": "Non-Productive"
  };

  // When the "Open Dashboard" button is clicked
  openDashboardBtn.addEventListener("click", () => {
    // Send message to background script to open the dashboard page
    chrome.runtime.sendMessage({ action: "openDashboard" });
  });

  // Get the active tab in current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    
    // If no active tab or URL available
    if (!tab || !tab.url) {
      siteNameEl.textContent = "No active tab"; // Show message
      categoryEl.textContent = "N/A";
      timerEl.textContent = "00:00:00";
      return; // Stop further execution
    }

    // Parse URL to get hostname
    const url = new URL(tab.url);
    // Lowercase and remove "www." prefix for uniformity
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    console.log("Current tab hostname:", host); // Debug log

    // Show the site name in popup
    siteNameEl.textContent = host;

    // Determine site category, default to Non-Productive if unknown
    const currentCategory = websiteCategories[host] || "Non-Productive";
    categoryEl.textContent = currentCategory;

    // Set CSS class to style the category label (green/red)
    categoryEl.className = currentCategory === "Productive" ? "productive" : "non-productive";

    // Fetch time spent data from backend server API
    fetch(`http://localhost:5000/analytics`)
      .then(res => res.json())
      .then(data => {
        // Find the entry for current site
        const siteEntry = data.find(entry => entry.site === host);
        // If found, use stored timeSpent; otherwise zero
        let elapsed = siteEntry ? siteEntry.timeSpent : 0;

        // Update timer display initially
        updateTimer(elapsed);

        // Every second, increment elapsed time and update timer UI
        setInterval(() => {
          elapsed++;
          updateTimer(elapsed);
        }, 1000);
      })
      .catch(err => {
        // If server fetch fails, show default timer
        console.error("Error fetching time data from server:", err);
        timerEl.textContent = "00:00:00";
      });

    // Helper function to convert seconds to HH:MM:SS and display in timer element
    function updateTimer(seconds) {
      const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const s = String(seconds % 60).padStart(2, "0");
      timerEl.textContent = `${h}:${m}:${s}`;
    }
  });
});
