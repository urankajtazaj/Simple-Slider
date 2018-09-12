
var container = $(".slider-container");
var contWidth = $(container)[0].getBoundingClientRect().width;
var currentIndex = 0;

var imageName = "images/img-";
var imageExtension = ".jpeg";

function nextImage() {
    if (currentIndex >= $(container).find("img").length - 1) {
        currentIndex = -1;
    }
    
    container.animate({
        scrollLeft: contWidth * ++currentIndex
    });
}

function prevImage() {
    if (currentIndex <= 0) {
        currentIndex = $(container).find("img").length;
    }

    container.animate({
        scrollLeft: contWidth * --currentIndex
    });
}

function addImages(start, end) {
    for (var i = start; i <= end; i++) {
        $(container).append("<img src='" + imageName + i + imageExtension + "'/>");
    }
}

$(document).ready(function() {
    addImages(1, 6);
});
