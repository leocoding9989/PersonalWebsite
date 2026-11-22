const sectionNav = document.querySelector(".section-nav");
const sectionLinks = [...sectionNav.querySelectorAll("a")];
const sections = sectionLinks.map((link) => document.getElementById(link.hash.slice(1)));
const projectCards = document.querySelector(".project-cards");
const desktopLayout = matchMedia("(min-width: 56rem)");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const segmentAngle = 360 / sectionLinks.length;
const scrollSettleDelay = 150;

let activeIndex = 0;
let wheelAngle = 0;
let pendingScrollTop = null;
let settleTimer;
let lastTouchY;

function setActiveSection(index) {
  if (index === activeIndex) return;

  // Use the shorter turn when moving across the first or last segment.
  let turn = index - activeIndex;
  const halfWheel = sectionLinks.length / 2;
  if (turn > halfWheel) turn -= sectionLinks.length;
  if (turn < -halfWheel) turn += sectionLinks.length;

  wheelAngle -= turn * segmentAngle;
  sectionNav.style.setProperty("--wheel-angle", `${wheelAngle}deg`);
  sectionLinks[activeIndex].removeAttribute("aria-current");
  sectionLinks[index].setAttribute("aria-current", "location");
  activeIndex = index;
}

function getMaxScrollTop() {
  return document.scrollingElement.scrollHeight - document.scrollingElement.clientHeight;
}

function updateFromPagePosition() {
  if (window.scrollY <= 1) {
    setActiveSection(0);
    return;
  }

  if (window.scrollY >= getMaxScrollTop() - 1) {
    setActiveSection(sections.length - 1);
    return;
  }

  const readingLine = window.innerHeight / 3;
  const index = sections.findLastIndex((section) => section.getBoundingClientRect().top <= readingLine);
  setActiveSection(Math.max(0, index));
}

function waitForPageScrollToSettle() {
  // Keep the clicked segment active until the page arrives or stops short.
  clearTimeout(settleTimer);
  settleTimer = setTimeout(() => {
    const reachedTarget = Math.abs(window.scrollY - pendingScrollTop) <= 1;
    pendingScrollTop = null;
    if (!reachedTarget) updateFromPagePosition();
  }, scrollSettleDelay);
}

function scrollToSection(section) {
  const margin = parseFloat(getComputedStyle(section).scrollMarginBlockStart);
  const sectionTop = section.getBoundingClientRect().top + window.scrollY - margin;
  const destination = Math.max(0, Math.min(sectionTop, getMaxScrollTop()));
  if (destination === pendingScrollTop) return;

  pendingScrollTop = destination;
  waitForPageScrollToSettle();
  window.scrollTo({
    top: destination,
    behavior: reducedMotion.matches ? "instant" : "smooth",
  });
}

function interruptPageScroll(target, direction) {
  if (pendingScrollTop === null || !direction) return;

  if (target instanceof Node && projectCards.contains(target)) {
    const { scrollTop, scrollHeight, clientHeight } = projectCards;
    const canScroll = direction < 0 ? scrollTop > 1 : scrollTop < scrollHeight - clientHeight - 1;
    if (canScroll) return;
  }

  clearTimeout(settleTimer);
  pendingScrollTop = null;
  window.scrollTo({ top: window.scrollY, behavior: "instant" });
  updateFromPagePosition();
}

sectionLinks.forEach((link, index) => {
  link.parentElement.style.setProperty("--segment-angle", `${index * segmentAngle}deg`);
  link.addEventListener("click", (event) => {
    if (!desktopLayout.matches || event.defaultPrevented || event.button !== 0 ||
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

    event.preventDefault();
    setActiveSection(index);
    if (location.hash !== link.hash) history.pushState(null, "", link.hash);

    const section = sections[index];
    if (event.detail === 0) section.focus({ preventScroll: true });
    scrollToSection(section);
  });
});

window.addEventListener("scroll", () => {
  if (pendingScrollTop === null) {
    updateFromPagePosition();
  } else {
    waitForPageScrollToSettle();
  }
}, { passive: true });

window.addEventListener("wheel", (event) => {
  if (!event.ctrlKey) interruptPageScroll(event.target, event.deltaY);
}, { passive: true });

window.addEventListener("touchstart", (event) => {
  lastTouchY = event.touches.length === 1 ? event.touches[0].clientY : undefined;
}, { passive: true });

window.addEventListener("touchmove", (event) => {
  if (event.touches.length !== 1 || lastTouchY === undefined) return;
  const touchY = event.touches[0].clientY;
  interruptPageScroll(event.target, lastTouchY - touchY);
  lastTouchY = touchY;
}, { passive: true });

window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.altKey || event.metaKey) return;
  if (event.ctrlKey && event.key !== "Home" && event.key !== "End") return;

  if (event.key === " ") {
    interruptPageScroll(event.target, event.shiftKey ? -1 : 1);
  } else if (["ArrowUp", "PageUp", "Home"].includes(event.key)) {
    interruptPageScroll(event.target, -1);
  } else if (["ArrowDown", "PageDown", "End"].includes(event.key)) {
    interruptPageScroll(event.target, 1);
  }
});

window.addEventListener("resize", () => {
  if (pendingScrollTop === null) {
    updateFromPagePosition();
  } else {
    scrollToSection(sections[activeIndex]);
  }
});
window.addEventListener("hashchange", () => {
  clearTimeout(settleTimer);
  pendingScrollTop = null;
  updateFromPagePosition();
});

sectionNav.style.setProperty("--wheel-angle", "0deg");
sectionLinks[activeIndex].setAttribute("aria-current", "location");
updateFromPagePosition();
sectionNav.classList.add("section-nav--wheel");
