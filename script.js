body, html {
  margin:0;
  padding:0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #111;
  color: white;
  height: 100%;
}

#toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #0a64c8;
}

#search-bar {
  flex:1;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
}

#datetime {
  margin-left: 20px;
  font-weight: bold;
}

#results {
  padding: 10px;
  overflow-y: auto;
  height: calc(100% - 50px);
}

.result-item {
  padding: 10px;
  margin-bottom: 8px;
  background: #222;
  border-radius: 6px;
}

.result-item a {
  color: #0af;
  font-weight: 600;
  text-decoration: none;
}

.result-item .snippet {
  color: #ccc;
  font-size: 14px;
  margin-top: 4px;
}
