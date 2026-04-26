const btn = document.getElementById("toggle");

chrome.storage.local.get(["crabEnabled"], result => {
  const enabled = result.crabEnabled !== false;
  btn.innerText = enabled ? "Crab is ON" : "Crab is OFF";
});

btn.addEventListener("click", () => {
  chrome.storage.local.get(["crabEnabled"], result => {
    const enabled = result.crabEnabled !== false;
    const next = !enabled;

    chrome.storage.local.set({ crabEnabled: next }, () => {
      btn.innerText = next ? "Crab is ON" : "Crab is OFF";
    });
  });
});
