// limit right button
document.addEventListener("contextmenu", function(event){
    event.preventDefault();
})
function setting(event){
    event.preventDefault();
    const setting = document.getElementById("setting");
    setting.style.display = (setting.style.display === "block") ? "none" : "block";
}
function setbg(event){
    event.preventDefault();
    const setbg = document.getElementById("change-bg");
    setbg.style.display = (setbg.style.display === "block") ? "none" : "block";
}
function about(event){
    event.preventDefault();
    const about = document.getElementById("about");
    about.style.display = (about.style.display === "block") ? "none" : "block";
}
// 設定視窗
function closewindow(id){
    document.getElementById(id).style.display = "none";
}
function openwindow(id, headerId){
    const win = document.getElementById(id);
    win.style.display = "block";
    if(!win.style.top) win.style.top = "100px";
    if(!win.style.left) win.style.left = "100px";
    dragElement(win, headerId);
}

let isMaximized = false;
function maxwindow(id){
    const win = document.getElementById(id);

    if(!win.classList.contains("maximized")){
        win.dataset.originalTop = win.style.top;
        win.dataset.originalLeft = win.style.left;
        win.dataset.originalWidth = win.style.width;
        win.dataset.originalHeight = win.style.height;

        win.style.top = "0";
        win.style.left = "0";
        win.style.width = "100vw";
        win.style.height = "100vh";
        win.classList.add("maximized");
    }
    else{
        win.style.top = win.dataset.originalTop;
        win.style.left = win.dataset.originalLeft;
        win.style.width = win.dataset.originalWidth;
        win.style.height = win.dataset.originalHeight;
        win.classList.remove("maximized");
    }
}
function minwindow(id){
    const win = document.getElementById(id);
    win.style.height = "100px";
}
// 拖曳功能
function dragElement(elmnt, headerId){
    const header = document.getElementById(headerId);
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    if(header){
        header.onmousedown = dragMouseDown;
    }
    
    function dragMouseDown(e){
        e.preventDefault();

        if(!elmnt.style.top) elmnt.style.top = elmnt.offsetTop + "px";
        if(!elmnt.style.left) elmnt.style.left = elmnt.offsetLeft + "px";

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e){
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement(){
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
dragElement(document.getElementById("change-bg"), "bg-header");
function changebg(imgPath){
    const fullPath = `img/${imgPath}`;
    const img = new Image();
    img.onload = () =>{
        document.body.style.backgroundImage = `url('${fullPath}')`;
        document.body.style.backgroundColor = "transparent";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";

        localStorage.setItem('backgroundImage', imgPath);
    };
    img.onerror = () =>{
        alert(`Photo ${imgPath} Loading Error, Please check your photo name and your file path`);
    };
    img.src = fullPath;
}
function hideAllFunctions(){
    document.querySelectorAll('#dp-window .window-body > div').forEach(div => {
        div.style.display = "none";
    });
}
window.onload = () => {
    const savedImage = localStorage.getItem('backgroundImage');
    if(savedImage){
        changebg(savedImage);
    }
}

document.querySelectorAll('.link').forEach(link => {
    link.addEventListener('contextmenu', function(e){
        e.preventDefault();
        const nw = window.open(this.href, '_blank');
        if(nw){
            nw.focus();
        }
        else{
            alert("請允許瀏覽器彈出視窗!");
        }
    });
});
