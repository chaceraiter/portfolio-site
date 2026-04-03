const root = document.documentElement;
if (!root.dataset.theme) root.dataset.theme = "dark";

// Environment-aware project links
const isDev = window.location.hostname.startsWith("dev");
const links = {
  "infra-test-live": {
    dev: "https://test.chaceraiter.com",
    prod: "https://test.chaceraiter.com"
  },
  "mafia-live": {
    dev: "/llmafia/",
    prod: "https://llmafia.chaceraiter.com/"
  },
  "vta-live": {
    dev: "/vta/",
    prod: "https://assistant.chaceraiter.com/"
  }
};

for (const [key, urls] of Object.entries(links)) {
  const el = document.querySelector(`[data-link="${key}"]`);
  if (el) {
    el.href = isDev ? urls.dev : urls.prod;
    el.target = "_blank";
    el.rel = "noreferrer";
  }
}

// Snap contribution graph width to clean column boundaries
const contribImg = document.querySelector(".contrib-graph");
const contribWrap = document.querySelector(".contrib-wrap");
if (contribImg && contribWrap) {
  const snapToColumns = () => {
    const imgW = contribImg.offsetWidth;
    const imgH = contribImg.offsetHeight;
    // ghchart SVG is 53 columns wide; rendered column width = imgW / 53
    const colW = imgW / 53;
    const maxW = contribWrap.parentElement.offsetWidth - contribWrap.previousElementSibling.offsetWidth - 24;
    const cols = Math.floor(maxW / colW);
    contribWrap.style.width = `${(cols * colW) - 2}px`;
  };
  contribImg.addEventListener("load", snapToColumns);
  if (contribImg.complete) snapToColumns();
  window.addEventListener("resize", snapToColumns);
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// REFRESH: contact-email
const emailUser = "contact";
const emailDomain = "chaceraiter.com";
const email = `${emailUser}@${emailDomain}`;
const emailToggle = document.getElementById("emailToggle");
const copyEmail = document.getElementById("copyEmail");
const emailPopover = document.getElementById("emailPopover");
const emailAddr = document.getElementById("emailAddr");
let popoverTimeout;

if (emailAddr) emailAddr.textContent = email;

emailToggle?.addEventListener("click", () => {
  emailPopover?.classList.toggle("show");
  copyEmail?.classList.remove("copied");
  clearTimeout(popoverTimeout);
  if (emailPopover?.classList.contains("show")) {
    popoverTimeout = setTimeout(() => emailPopover?.classList.remove("show"), 5000);
  }
});

copyEmail?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyEmail.classList.add("copied");
    clearTimeout(popoverTimeout);
    popoverTimeout = setTimeout(() => {
      emailPopover?.classList.remove("show");
      copyEmail.classList.remove("copied");
    }, 5000);
  } catch {
    window.prompt("Copy email:", email);
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".email-wrap")) {
    emailPopover?.classList.remove("show");
  }
});
