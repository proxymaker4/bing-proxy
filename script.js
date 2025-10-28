document.getElementById('bing-icon').addEventListener('dblclick', () => openBingWindow());

function openBingWindow() {
  if (document.getElementById('bing-window')) return;

  const win = document.createElement('div');
  win.className = 'window';
  win.id = 'bing-window';
  win.innerHTML = `
    <div class="title">
      Bing Search
      <span class="close-btn">✕</span>
    </div>
    <div class="content">
      <div style="display:flex; gap:8px; margin-bottom:12px;">
        <input id="bing-q" placeholder="Search the web..." style="flex:1; padding:8px; font-size:14px;" />
        <button id="bing-go">Search</button>
      </div>
      <div id="bing-results">Type a query and press Search.</div>
    </div>
  `;
  document.getElementById('windows').appendChild(win);

  win.querySelector('.close-btn').addEventListener('click', () => win.remove());

  win.querySelector('#bing-go').addEventListener('click', fetchBingResults);
  win.querySelector('#bing-q').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') fetchBingResults();
  });

  async function fetchBingResults() {
    const q = win.querySelector('#bing-q').value.trim();
    const out = win.querySelector('#bing-results');
    if (!q) { out.innerHTML = '<em>Enter a search term.</em>'; return; }
    out.innerHTML = 'Searching…';

    try {
      const resp = await fetch(`/search?q=${encodeURIComponent(q)}`);
      if (!resp.ok) {
        const t = await resp.text();
        out.innerHTML = `<pre style="white-space:pre-wrap;">Error: ${escapeHtml(t)}</pre>`;
        return;
      }
      const json = await resp.json();
      renderResults(json, out);
    } catch (err) {
      out.innerHTML = `<pre style="white-space:pre-wrap;">Network error: ${escapeHtml(err.message)}</pre>`;
    }
  }

  function renderResults(json, outEl) {
    const pages = json.webPages || [];
    if (!pages.length) {
      outEl.innerHTML = '<em>No results.</em>';
      return;
    }
    const html = pages.map(p => `
      <div style="padding:10px; border-radius:6px; margin-bottom:8px; border:1px solid #e6e9ef;">
        <a href="${escapeAttr(p.url)}" target="_blank" style="font-weight:700; text-decoration:none;">${escapeHtml(p.name)}</a>
        <div style="font-size:13px; color:#444; margin-top:6px;">${escapeHtml(p.snippet || '')}</div>
        <div style="font-size:12px; color:#666; margin-top:6px;">${escapeHtml(p.displayUrl || p.url)}</div>
      </div>
    `).join('');
    outEl.innerHTML = html;
  }

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;'}[c])); }
  function escapeAttr(s){ return String(s).replace(/"/g,'&quot;'); }
}
