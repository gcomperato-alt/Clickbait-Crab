const hypeWords = [
  "shocking", "insane", "destroyed", "exposed", "secret",
  "millionaire", "you won’t believe", "changed my life",
  "fired", "quit", "broke", "forever"
];

const crabLines = [
  "🦀 Wah this one drama sia.",
  "🦀 This title shouting at me.",
  "🦀 Relax lah, I calm it down.",
  "🦀 Too much sauce. I reduce.",
  "🦀 Clickbait Crab activated."
];

function isClickbait(text) {
  const hasCaps = /[A-Z]{5,}/.test(text);
  const hasEmoji = /😱|🔥|💰|😭|🤯|🚨|⚠️/.test(text);
  const hasBang = /!{1,}/.test(text);
  const hasHype = hypeWords.some(word =>
    text.toLowerCase().includes(word)
  );

  return hasCaps || hasEmoji || hasBang || hasHype;
}

function calmTitle(title) {
  let clean = title;

  clean = clean.replace(/😱|🔥|💰|😭|🤯|🚨|⚠️/g, "");
  clean = clean.replace(/!+/g, "");
  clean = clean.replace(/\bSHOCKING\b/gi, "notable");
  clean = clean.replace(/\bINSANE\b/gi, "unusual");
  clean = clean.replace(/\bDESTROYED\b/gi, "criticized");
  clean = clean.replace(/\bEXPOSED\b/gi, "discussed");
  clean = clean.replace(/\bSECRET\b/gi, "lesser-known");
  clean = clean.replace(/\bFOREVER\b/gi, "for a long time");

  clean = clean.replace(/\s+/g, " ").trim();

  if (!clean) return title;

  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function crabifyTitle(el) {
  if (!el || el.dataset.crabbed === "true") return;

  const original = el.innerText.trim();
  if (!original || original.length < 8) return;

  if (!isClickbait(original)) return;

  const calm = calmTitle(original);
  const crabLine = crabLines[Math.floor(Math.random() * crabLines.length)];

  el.dataset.originalTitle = original;
  el.dataset.crabbed = "true";
  el.innerText = calm;

  const tag = document.createElement("span");
  tag.className = "clickbait-crab-tag";
  tag.innerText = crabLine;
  el.insertAdjacentElement("afterend", tag);
}

function scanYouTubeTitles() {
  const selectors = [
    "a#video-title",
    "yt-formatted-string#video-title",
    "h3 a",
    "a.yt-simple-endpoint"
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(crabifyTitle);
  });
}

scanYouTubeTitles();

const observer = new MutationObserver(() => {
  scanYouTubeTitles();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
