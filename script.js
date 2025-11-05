const tabs = document.querySelectorAll('.tab[data-tab]');
const tabBoxes = document.querySelectorAll('.tab-box');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const themeText = themeToggle.querySelector('span');

// Tabs
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.getAttribute('data-tab');
    tabs.forEach(t => t.classList.remove('active'));
    tabBoxes.forEach(box => box.classList.remove('active'));
    tab.classList.add('active');
    const activeBox = document.getElementById(targetId);
    if (activeBox) {
      activeBox.classList.add('active');
      filterRepoBoxes(); // keep search filtering
    }
  });
});

// Search filter
function filterRepoBoxes() {
  const searchQuery = searchInput.value.toLowerCase();
  const activeBox = document.querySelector('.tab-box.active');
  if (!activeBox) return;
  const repoBoxes = activeBox.querySelectorAll('.repo-box');
  let matchFound = false;
  
  repoBoxes.forEach(repo => {
    const title = repo.querySelector('.title').textContent.toLowerCase();
    const description = repo.querySelector('.description').textContent.toLowerCase();
    if (title.includes(searchQuery) || description.includes(searchQuery)) {
      repo.style.display = "";
      matchFound = true;
    } else {
      repo.style.display = "none";
    }
  });

  let noResults = activeBox.querySelector('.no-results');
  if (!matchFound) {
    if (!noResults) {
      noResults = document.createElement('p');
      noResults.classList.add('no-results');
      noResults.textContent = "No results found.";
      activeBox.appendChild(noResults);
    }
  } else if (noResults) {
    noResults.remove();
  }
}

searchInput.addEventListener('input', filterRepoBoxes);

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeText.textContent = "Light Mode";
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    themeText.textContent = "Dark Mode";
  }
});
