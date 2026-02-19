const sections = [
  "overview",
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "s10",
  "s11",
  "s12",
  "s13",
  "s14",
  "s15",
  "s16",
];
const visited = new Set(["overview"]);

function goTo(id) {
  // Hide all sections
  document
    .querySelectorAll(".section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));

  // Show target
  document.getElementById("sec-" + id).classList.add("active");
  const navItem = document.querySelector(`[data-section="${id}"]`);
  if (navItem) navItem.classList.add("active");

  // Track visited
  visited.add(id);
  updateProgress();

  // Scroll to top
  document.querySelector(".main").scrollTo(0, 0);
}

function updateProgress() {
  const pct = Math.round((visited.size / sections.length) * 100);
  document.getElementById("progressPct").textContent = pct + "%";
  document.getElementById("progressFill").style.width = pct + "%";

  // Mark nav items as done (visited but not active)
  visited.forEach((id) => {
    const nav = document.querySelector(`[data-section="${id}"]`);
    if (nav && !nav.classList.contains("active")) nav.classList.add("done");
  });

  // Store progress in localStorage
  localStorage.setItem("courseProgress", JSON.stringify(Array.from(visited)));
}

// Load progress from localStorage on page load
function loadProgress() {
  const saved = localStorage.getItem("courseProgress");
  if (saved) {
    visited.clear();
    JSON.parse(saved).forEach((id) => visited.add(id));
    updateProgress();
  }
}

function toggleQA(questionEl) {
  const card = questionEl.parentElement;
  card.classList.toggle("open");
}

// Initialize
loadProgress();
updateProgress();
