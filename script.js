const searchBar = document.getElementById('search-bar');
const resultsDiv = document.getElementById('results');
const datetime = document.getElementById('datetime');
const menuBtn = document.getElementById('menu-btn');

// Update time every second
function updateTime() {
  const now = new Date();
  datetime.textContent = now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

// Search on Enter
searchBar.addEventListener('keydown', e => {
  if (e.key === 'Enter') searchBing(searchBar.value);
});

// Menu button click
menuBtn.addEventListener('click', () => {
  resultsDiv.innerHTML = `
    <iframe 
      src="https://menus.healthepro.com/organizations/36/sites/374/menus/95879" 
      style="width:100%; height:100%; border:none;"
      title="Menu">
    </iframe>
  `;
});

// Function to perform Bing search via Node proxy
async function searchBing(query) {
  if (!query) return;
  resultsDiv.innerHTML = 'Searching…';
  try {
    const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) {
      resultsDiv.textContent = 'Error fetching results';
      return;
    }
    const data = await res.json();
    renderResults(data);
  } catch (err) {
    resultsDiv.textContent = `Network error: ${err.message}`;
  }
}

// Render Bing search results
function renderResults(data) {
  const pages = data.webPages?.value || [];
  if (!pages.length) {
    resultsDiv.innerHTML = '<em>No results found</em>';
    return;
  }

  resultsDiv.innerHTML = pages.map(p => `
    <div class="result-item">
      <a href="${p.url}" target="_blank">${p.name}</a>
      <div class="snippet">${p.snippet || ''}</div>
    </div>
  `).join('');
}
