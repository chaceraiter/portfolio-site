const root = document.documentElement;
const key = "portfolio_theme";
const saved = localStorage.getItem(key);
if (saved === "light" || saved === "dark") root.dataset.theme = saved;
if (!root.dataset.theme) root.dataset.theme = "light";

const toggle = document.getElementById("themeToggle");
const setToggleLabel = () => {
  toggle.textContent = root.dataset.theme === "dark" ? "Light theme" : "Dark theme";
};
setToggleLabel();
toggle?.addEventListener("click", () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  localStorage.setItem(key, next);
  setToggleLabel();
});

const getViewFromHash = () => {
  const raw = window.location.hash.replace("#", "").trim();
  if (raw === "blog") return "writing";
  if (raw === "projects" || raw === "resume" || raw === "writing" || raw === "contact") return raw;
  return "projects";
};

const getAnchorIdFromHash = () => {
  const raw = window.location.hash.replace("#", "").trim();
  if (raw === "projects" || raw === "resume" || raw === "blog" || raw === "contact") return raw;
  return null;
};

const getViewLabel = (view) => {
  if (view === "projects") return "Projects";
  if (view === "resume") return "Resume";
  if (view === "writing") return "Blog";
  if (view === "contact") return "Contact";
  return "Projects";
};

const viewIndicator = document.getElementById("viewIndicator");
const setView = (view) => {
  const views = document.querySelectorAll(".view[data-view]");
  for (const section of views) {
    section.setAttribute("aria-hidden", section.getAttribute("data-view") === view ? "false" : "true");
  }

  const links = document.querySelectorAll("[data-view-link]");
  for (const link of links) {
    const isActive = link.getAttribute("data-view-link") === view;
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }

  if (viewIndicator) viewIndicator.textContent = `Viewing: ${getViewLabel(view)}`;
  document.title = `${getViewLabel(view)} — Chace Raiter`;
};

const scrollToAnchor = () => {
  const anchorId = getAnchorIdFromHash();
  if (!anchorId) return;
  const el = document.getElementById(anchorId);
  if (!el) return;

  try {
    el.focus({ preventScroll: true });
  } catch {
    // no-op
  }

  el.scrollIntoView({ block: "start" });
};

let didInitialHashScroll = false;
const onHashChange = () => {
  setView(getViewFromHash());
  if (!didInitialHashScroll) {
    didInitialHashScroll = true;
    scrollToAnchor();
  }
};

window.addEventListener("hashchange", onHashChange);
onHashChange();

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const setScrolled = () => {
  if (window.scrollY > 120) root.dataset.scrolled = "true";
  else delete root.dataset.scrolled;
};
setScrolled();
window.addEventListener("scroll", setScrolled, { passive: true });

const backToTop = document.getElementById("backToTop");
backToTop?.addEventListener("click", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

// Email handling: keep it copy-only by default to reduce scraping.
const emailUser = "(set)";
const emailDomain = "(set)";
const email = `${emailUser}@${emailDomain}`;
const copyEmail = document.getElementById("copyEmail");
copyEmail?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    copyEmail.textContent = "Copied!";
    window.setTimeout(() => (copyEmail.textContent = "Copy email"), 1200);
  } catch {
    window.prompt("Copy email:", email);
  }
});
