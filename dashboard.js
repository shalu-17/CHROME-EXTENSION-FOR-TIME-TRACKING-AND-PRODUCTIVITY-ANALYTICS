// Convert seconds into HH:MM:SS format
function secondsToHMS(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600); // Calculate total hours
  const m = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
  const s = totalSeconds % 60; // Remaining seconds
  // Pad each value to ensure two digits
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// Store website usage data
// Format: { siteName: { total: secondsSpent, category: "Productive"/"Non-Productive" } }
let siteData = {};
let activeSite = null; // Currently active website

// Predefined website categories (Productive / Non-Productive)
const websiteCategories = {
  // Productive websites
  "leetcode.com": "Productive",
  "geeksforgeeks.org": "Productive",
  "github.com": "Productive",
  "stackoverflow.com": "Productive",
  "w3schools.com": "Productive",
  "tutorialspoint.com": "Productive",
  "google.com": "Productive",
  "chat.openai.com": "Productive",
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

  // Non-Productive websites
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

// Fetch previously stored website usage data from server
async function fetchInitialData() {
  try {
    const res = await fetch("http://localhost:5000/analytics"); // Get data from backend
    const data = await res.json();

    // Merge fetched data into siteData object
    data.forEach(entry => {
      siteData[entry.site] = { 
        total: (siteData[entry.site]?.total || 0) + entry.timeSpent, 
        category: entry.category 
      };
    });
    updateTable(); // Update UI after fetching
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

// Update the HTML table with latest website usage data
function updateTable() {
  const tbody = document.querySelector("#timeTable tbody");
  tbody.innerHTML = ""; // Clear old table rows

  // Loop through each website and create a table row
  for (const [site, info] of Object.entries(siteData)) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${site}</td>
      <td>${secondsToHMS(info.total)}</td>
      <td>${info.category}</td>
    `;
    tbody.appendChild(tr);
  }
}

// Set the active website being tracked
function setActiveSite(site) {
  activeSite = site;
  if (!siteData[site]) {
    // Assign predefined category, default to Non-Productive if unknown
    const category = websiteCategories[site] || "Non-Productive";
    siteData[site] = { total: 0, category };
  }
}

// Increment time spent on the active site every second
setInterval(() => {
  if (activeSite) {
    siteData[activeSite].total = (siteData[activeSite].total || 0) + 1; // Add 1 sec
    updateTable(); // Refresh table display
  }
}, 1000);

// Load initial data from backend
fetchInitialData();

// Listen for messages from background/popup scripts to update active site
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "activeSiteChanged") {
    setActiveSite(msg.site);
  }
});
