window.onload = function() {
    var video = document.getElementById('video');
    video.play().catch(error =>{
        console.log("Auto play failed: ", error);
    });
};