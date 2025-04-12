const form = document.getElementById('stepForm');
const dateInput = document.getElementById('date');
const stepsInput = document.getElementById('steps');
const entriesList = document.getElementById('entriesList');
const chartCanvas = document.getElementById('stepsChart');

let entries = JSON.parse(localStorage.getItem("stepEntries")) || [];

entries.sort((a, b) => new Date(b.date) - new Date(a.date));

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = dateInput.value;
  const steps = parseInt(stepsInput.value);

  if (!date || isNaN(steps)) return;

  entries = entries.filter(entry => entry.date !== date);
  entries.push({ date, steps });
  entries.sort((a, b) => new Date(a.date) - new Date(b.date));

  localStorage.setItem("stepEntries", JSON.stringify(entries));
  renderEntries();
  renderChart();
  form.reset();
});

function renderEntries() {
  entriesList.innerHTML = '';
  [...entries].reverse().forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.date}: ${entry.steps.toLocaleString()} steps`;
    entriesList.appendChild(li);
  });
}

function renderChart() {
  const labels = entries.map(e => e.date);
  const data = entries.map(e => e.steps);

  if (window.stepChart) window.stepChart.destroy();

  window.stepChart = new Chart(chartCanvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Steps per Day',
        data,
        fill: true,
        borderColor: '#007aff',
        backgroundColor: 'rgba(0,122,255,0.1)',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => value.toLocaleString()
          }
        }
      }
    }
  });
}

// Dark mode toggle
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggle.checked);
  localStorage.setItem("darkMode", toggle.checked);
});

if (localStorage.getItem("darkMode") === "true") {
  toggle.checked = true;
  document.body.classList.add("dark");
}

// Init
renderEntries();
renderChart();
