// Self-invoking function to avoid polluting global scope
(function(){
  // Create a "Open Dashboard" button dynamically on every webpage
  const dashBtn = document.createElement("button");
  dashBtn.textContent = "Open Dashboard"; // Button text

  // Style the button (position fixed at bottom-right corner)
  dashBtn.style.cssText = `
    position: fixed;         /* Button stays fixed in place even when scrolling */
    bottom: 20px;            /* 20px from bottom of screen */
    right: 20px;             /* 20px from right side of screen */
    background: #4caf50;     /* Green background color */
    color: white;            /* White text color */
    border: none;            /* No border */
    padding: 8px 12px;       /* Button padding for better click area */
    border-radius: 6px;      /* Rounded corners */
    font-family: sans-serif; /* Clean, simple font */
    font-size: 14px;         /* Font size */
    cursor: pointer;         /* Show pointer on hover */
    z-index: 999999;         /* Keep button above all page content */
  `;

  // Add the button to the page
  document.body.appendChild(dashBtn);

  // When button is clicked → send a message to background script to open dashboard
  dashBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "openDashboard" });
  });
})();
