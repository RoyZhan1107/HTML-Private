// set Matrix Rain
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// show the content
const characters = "210518 5201314".split("");
// fontsize
const fontsize = 16;
// display are columns
const columns = Math.floor(canvas.width / fontsize);
const drops = Array(columns).fill(1);

function drawMatrixRain(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // set font color is green
    ctx.fillStyle = "#FFAEC9";
    ctx.font = fontsize + "px monospace";

    for(let i = 0; i < drops.length; i++){
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontsize, drops[i] * fontsize);
        if(drops[i] * fontsize > canvas.height || Math.random() > 0.975){
            drops[i] = 0;
        }
        drops[i]++;
    }
}
// set the speed
setInterval(drawMatrixRain, 100);
// atuoset the draw  size
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = height.innerHeight;
});
// limit right button
document.addEventListener("contextmenu", function(event){
    event.preventDefault();
});