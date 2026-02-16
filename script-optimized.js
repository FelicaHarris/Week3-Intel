// Beginner-friendly JavaScript for the interactive page
// 1) Theme toggle, 2) Footprint slider, 3) Simple quiz handling

// Theme toggle: remembers choice in localStorage
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('themeDark', isDark ? '1' : '0');
});

// Restore stored theme on load
if (localStorage.getItem('themeDark') === '1') {
  document.body.classList.add('dark');
}

// Footprint slider: simple CO2 estimate (kg CO2 per km ~ 0.21)
const kmRange = document.getElementById('kmRange');
const kmValue = document.getElementById('kmValue');
const co2Estimate = document.getElementById('co2Estimate');

function updateFootprint(){
  const km = Number(kmRange.value);
  kmValue.textContent = km;
  const co2PerKm = 0.21; // approximate kg CO2 per km for an average car
  const weekly = (km * co2PerKm).toFixed(2);
  co2Estimate.textContent = weekly;
}

kmRange.addEventListener('input', updateFootprint);
updateFootprint();

// Simple quiz logic: count correct answers (values set to 1 for correct)
const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');

quizForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const data = new FormData(quizForm);
  // Score is sum of numeric values from radio inputs
  let score = 0;
  for (const key of ['q1','q2','q3']){
    const v = data.get(key);
    if (v !== null) score += Number(v);
  }
  quizResult.textContent = `You scored ${score} / 3. ` +
    (score === 3 ? 'Great job! 🎉' : score >= 1 ? 'Good try — learn and improve!' : 'Try again — small changes add up.');
});

// Cache DOM queries for better performance
const timelineCards = document.querySelectorAll('.timeline-card');
const descriptionMap = new Map();

// Initialize descriptions and map them to cards
timelineCards.forEach((card) => {
  const desc = card.querySelector('.desc');
  if(desc) {
    desc.setAttribute('aria-hidden', 'true');
    descriptionMap.set(card, desc);
  }
});

// Handle click and keyboard events for timeline cards
timelineCards.forEach((card) => {
  // Handle click events
  card.addEventListener('click', (e) => {
    // avoid toggling when interacting with form controls inside
    if (e.target.closest('button') || e.target.closest('input') || e.target.tagName === 'A') return;
    toggleCard(card);
  });
  
  // Handle keyboard events (Enter and Space)
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // prevent page scroll from Space key
      toggleCard(card);
    }
  });
});

// Helper function to toggle card expanded state
function toggleCard(card) {
  const expanded = card.classList.toggle('expanded');
  const desc = descriptionMap.get(card);
  if(desc) desc.setAttribute('aria-hidden', expanded ? 'false' : 'true');
  card.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}
