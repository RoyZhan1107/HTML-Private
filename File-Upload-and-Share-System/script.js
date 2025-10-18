// let the files can collect
let filesData = [];

function uploadFile(){
    const fileInput = document.getElementById('fileInput');
    const category = document.getElementById('categoryInput').value.trim() || 'Uncategorized';
    if(!fileInput.files[0]) return alert('Please choose the file.');

    const file = fileInput.files[0];
    const reader = new FileReader();
    // file and download link
    reader.onload = e => {
        const base64 = e.target.result;
        const data = {
            name: file.name,
            category: category,
            type: file.type,
            preview: base64,
            link: base64 // share / download link
        };
        filesData.push(data);
        renderFiles(filesData);
    };
    if(file.type.startsWith('text') || file.type === 'application/json'){
        reader.readAsText(file);
    }else{
        reader.readAsDataURL(file);
    }
    fileInput.value = '';
}
function renderFiles(data){
    const container = document.getElementById('fileList');
    container.innerHTML = '';

    if(data.length === 0){
        container.innerHTML = '<p>Are not file now.</p>';
        return;
    }
    data.forEach((f, index) => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.innerHTML = `
        <strong onclick="downloadFile(${index})">${f.name}</strong>
        <em>(${f.category})</em><br>
        <div class="preview">${getPreviewHTML(f)}</div>
        <div class="share-link">
        🔗 <input type="text" id="share-${index}" value="${f.link}" readonly style="width: 70%">
        <button onclick="copyLink(${index})">Copy link</button>
        </div>
        `;
        container.appendChild(div);
    });
}
function getPreviewHTML(file){
    if(file.type.startsWith('image')) return `<img src="${file.preview}" alt="preview">`;
    if(file.type === 'application/pdf') return `<iframe src="${file.preview}" width="100%" height="300"></iframe>`;
    if(file.type.startsWith('text') || file.type === 'application/json')
        return `<pre>${file.preview.slice(0, 300)}...</pre>`;
    return '(Unsupported of preview format.)';
}
// download file
function downloadFile(index){
    const f = filesData[index];
    const link = document.createElement('a');
    link.href = f.link;
    link.download = f.name;
    link.click();
}
// copy link
function copyLink(index){
    const input = document.getElementById(`share-${index}`)
    input.select();
    document.execCommand('copy');
    alert('Already copy the share link.');
}
// search file
function searchFiles(){
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const result = filesData.filter(f => 
        f.name.toLowerCase().includes(keyword) ||
        f.category.toLowerCase().includes(keyword)
    );
    renderFiles(result);
}
// export to JSON
function exportJSON(){
    const blob = new Blob([JSON.stringify(filesData, null, 2)], {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filesData.json';
    link.click();
}
// import the JSON
function importJSON(event){
    const file = event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        try{
            filesData = JSON.parse(e.target.result);
            renderFiles(filesData);
        }catch(err){
            alert('JSON file format error.');
        }
    };
    reader.readAsText(file);
}