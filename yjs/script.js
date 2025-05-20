// auto play video
window.onload = function() {
    var video = document.getElementById('video');
    video.play().catch(error =>{
        console.log("Auto play failed: ", error);
    });
};
// limit right button
document.addEventListener("contextmenu", function(event){
    event.preventDefault();
})