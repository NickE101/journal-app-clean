function saveEntry() {
  const entryText = document.getElementById("entry").value;
  if (!entryText) return;

  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.unshift(entryText);
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  document.getElementById("entry").value = "";
  renderEntries();
}

function renderEntries() {
  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  const list = document.getElementById("entriesList");
  list.innerHTML = "";
  entries.forEach(e => {
    const li = document.createElement("li");
    li.textContent = e;
    list.appendChild(li);
  });
}

function clearEntries() {
  localStorage.removeItem("journalEntries");
  renderEntries();
}

const toggle = document.getElementById('themeToggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', toggle.checked);
  localStorage.setItem("darkMode", toggle.checked);
});

if (localStorage.getItem("darkMode") === "true") {
  toggle.checked = true;
  document.body.classList.add("dark");
}

renderEntries();
