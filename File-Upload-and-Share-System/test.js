const entriesContainer = document.getElementById("entries");
const STORAGE_KEY = "localshare_entries";

window.onload = function() {
  loadEntries();
};

function addEntry() {
  const message = document.getElementById("messageInput").value.trim();
  const files = document.getElementById("fileInput").files;

  if (!message && files.length === 0) {
    alert("Please enter a message or select a file!");
    return;
  }

  const newEntry = {
    id: Date.now(),
    message,
    files: []
  };

  // 處理上傳檔案
  if (files.length > 0) {
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = function(e) {
        newEntry.files.push({
          name: file.name,
          type: file.type,
          data: e.target.result
        });
        saveAndRender(newEntry);
      };
      reader.readAsDataURL(file);
    }
  } else {
    saveAndRender(newEntry);
  }

  document.getElementById("messageInput").value = "";
  document.getElementById("fileInput").value = "";
}

function saveAndRender(entry) {
  let allEntries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const exists = allEntries.find(e => e.id === entry.id);
  if (!exists) allEntries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allEntries));
  renderEntries();
}

function loadEntries() {
  renderEntries();
}

function renderEntries() {
  const allEntries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  entriesContainer.innerHTML = "";

  allEntries.forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry";

    let content = "";
    if (entry.message) {
      content += `<p>${entry.message}</p>`;
    }

    if (entry.files && entry.files.length > 0) {
      content += `<div class="preview">`;
      for (let f of entry.files) {
        if (f.type.startsWith("image/")) {
          content += `<img src="${f.data}" alt="${f.name}">`;
        } else if (f.type.startsWith("video/")) {
          content += `<video controls src="${f.data}"></video>`;
        } else if (f.type.startsWith("audio/")) {
          content += `<audio controls src="${f.data}"></audio>`;
        } else {
          content += `<a href="${f.data}" download="${f.name}">${f.name}</a>`;
        }
      }
      content += `</div>`;
    }

    div.innerHTML = content + `
      <div class="actions">
        <button onclick="deleteEntry(${entry.id})">Delete</button>
      </div>
    `;

    entriesContainer.appendChild(div);
  });
}

function deleteEntry(id) {
  if (!confirm("Are you sure you want to delete this entry?")) return;
  let allEntries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  allEntries = allEntries.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allEntries));
  renderEntries();
}
