/*
*
*  Websocket synced slides test
*  (c)2020 Tim Knapen
*  www.timknapen.be
*
*/



// EDIT FILES HERE
var files = Array(
    "atelier.jpg",
    "blimp.jpg", 
    "lunar.mp4",
    "djeff.png", 
    "dog.jpg",
    "mems.jpg",
    "nasa.jpg",
    "room.jpg"
);
// EDIT NOTHING ELSE


//--------------------------------------------------
$(function () {
    connectSocket();
    selectSlide(0);
});


//--------------------------------------------------
function output(mssg) {
    console.log(" " + mssg);
}

//--------------------------------------------------
function status(mssg) {
    console.log(mssg);
}

//--------------------------------------------------
function selectSlide(filenumber) {
    if (filenumber < 0 || filenumber >= files.length) {
        return;
    }
    var filename = files[filenumber];


    var extension = filename.split('.').pop();
    $('body').empty();

    var $element = $(''); 
    switch(extension){
        case 'jpg':
        case 'png':
            $element = $('<div class="slide"><img src="./files/' + filename + '"/></div>');
            break;
        case 'mp4':
            $element = $('<div class="slide"><video autoplay muted playsinline > <source src="./files/' + filename + '" type="video/mp4" /></video></div>');
        break;
    }
    $('body').append($element);
}


