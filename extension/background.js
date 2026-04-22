const API = "http://127.0.0.1:3000/check-url";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // Run only when page fully loads
    if (changeInfo.status !== "complete") return;

    const url = tab.url;

    // Ignore chrome internal + our warning page
    if (
        !url ||
        url.startsWith("chrome://") ||
        url.includes("warning.html")
    ) {
        return;
    }

    // Send URL to backend
    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: url })
    })
    .then(res => res.json())
    .then(data => {

        console.log("Checked:", url, data);

        // Block only HIGH risk
        if (data.risk > 70) {

            // Save data FIRST, then redirect
            chrome.storage.local.set({
                risk: data.risk || 0,
                reasons: data.reasons || []
            }, () => {

                chrome.tabs.update(tabId, {
                    url: chrome.runtime.getURL("warning.html")
                });

            });
        }
    })
    .catch(err => {
        console.error("Error:", err);
    });

});