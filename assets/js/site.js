/* SITE_NAME is the ONE swappable business-name constant for this site. */
const SITE_NAME = "Mademoiselle Hair&Styling";
document.querySelectorAll("[data-site-name]").forEach(el => { el.textContent = SITE_NAME; });

/* Mobile nav */
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");
if (burger && mobileNav) {
  burger.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));
}

/* Hero headline char stagger */
document.querySelectorAll("[data-stagger]").forEach(el => {
  const text = el.textContent;
  el.textContent = "";
  let i = 0;
  for (const ch of text) {
    const s = document.createElement("span");
    s.className = "ch";
    s.textContent = ch === " " ? "\u00a0" : ch;
    s.style.animationDelay = (i * 28) + "ms";
    el.appendChild(s);
    i++;
  }
});

/* Scroll reveal */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll("section, .tile, .card").forEach(el => { el.classList.add("reveal"); io.observe(el); });

/* Lookbook filters */
const chips = document.querySelectorAll(".chip[data-filter]");
const tiles = document.querySelectorAll("#lookGrid .tile");
chips.forEach(chip => chip.addEventListener("click", () => {
  chips.forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  const f = chip.dataset.filter;
  tiles.forEach(t => { t.classList.toggle("hidden", f !== "all" && t.dataset.cat !== f); });
}));

/* Booking form: time-of-day chips (plain selectable, no availability claim) */
document.querySelectorAll("#slotChips .slot").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll("#slotChips .slot").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}));

/* Booking form: demo submit */
const form = document.getElementById("bookForm");
if (form) {
  form.addEventListener("submit", ev => {
    ev.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const note = document.getElementById("formSuccess");
    if (note) note.hidden = false;
    note && note.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
