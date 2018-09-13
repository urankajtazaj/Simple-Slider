
// USER CONFIG
var contHeight = 800;
var sliderWidth = "100%";
var slideSpeed = 200;
var showDots = true;

var images = [
     "images/img-1.jpeg"
    ,"images/img-2.jpeg"
    ,"images/img-3.jpeg"
    ,"images/img-4.jpeg"
    ,"images/img-5.jpeg"
    ,"images/img-6.jpeg"
];


var sliderContainer = $(".slider");
var container = $(".slider-container");
var contWidth = $(container)[0].getBoundingClientRect().width;
var next = $("#next");
var prev = $("#prev");
var currentIndex = 0;

var imageName = "images/img-";
var imageExtension = ".jpeg";

$(next).on('click', function() {
    nextImage();
})

$(prev).on('click', function() {
    prevImage();
})

function sliderDots() {
    sliderContainer.append("<div class='slider-dots'></div>");
    for (var i = 0; i < images.length; i++) {
        sliderContainer.find(".slider-dots").append("<span class='dot' onclick='slideToIndex(" + i + ")'></span>");
    }

    $(sliderContainer.find(".dot")[0]).addClass("current");

}

function slideToIndex(index) {
    container.animate({
        scrollLeft: contWidth * index
    }, slideSpeed);

    $(".dot").css({
         "background-color": "rgba(255, 255, 255, .7)"
        ,"transform": "translateY(0)"
    });

    $($(".dot")[index]).css({
         "background-color": "#fff"
        ,"transform": "translateY(-4px)"
    })
}

function nextImage() {
    if (currentIndex >= $(container).find("img").length - 1) {
        currentIndex = -1;
    }
    
    container.animate({
        scrollLeft: contWidth * ++currentIndex
    }, slideSpeed);
}

function prevImage() {
    if (currentIndex <= 0) {
        currentIndex = $(container).find("img").length;
    }

    container.animate({
        scrollLeft: contWidth * --currentIndex
    }, slideSpeed);
}

function addImages() {
    images.forEach(imagePath => {
        $(container).append("<img src='" + imagePath + "'/>");        
    });
}

function addStyles() {
    sliderContainer.css({
         "width": sliderWidth
        ,"position": "relative"
    });

    $(".slider-dots").css({
         "text-align": "center"
        ,"position": "absolute"
        ,"width": "100%"
    });

    $(".dot").css({
         "margin": "-25px 4px 0 4px"
        ,"display": "inline-block"
        ,"height": "15px"
        ,"width": "15px"
        ,"background-color": "rgba(255, 255, 255, .7)"
        ,"box-shadow": "0 0 10px rgba(0, 0, 0, 0.5)"
        ,"border-radius": "20px"
        ,"z-index": "3"
        ,"cursor": "pointer"
        ,"transition": "150ms ease-in-out"
    });

    $(".dot.current").css({
         "background-color": "#fff"
        ,"transform": "translateY(-4px)"
    });

    $(".container").css({
         "position": "relative"
        ,"display": "flex"
        ,"justify-content": "space-between"
    });

    $(".arrow").css({
        "background-color": "rgba(0, 0, 0, 0.2)"
        ,"position": "absolute"
        ,"display": "inline-block"
        ,"height": "40px"
        ,"padding": "10px"
        ,"margin-top": "calc(" + contHeight + "px / 2 - 40px)"
        ,"display": "flex"
        ,"justify-content": "center"
        ,"align-items": "center"
    });

    $(".arrow img").css({
        "height": "30px"
    });

    $(".arrow.left").css({
         "left": "0"
    });

    $(".arrow.right").css({
        "right": "0"
    });
    
    $(".arrow.left").mouseenter(function() {
        $(this).animate({
            "padding-left": "5px"
            ,"padding-right": "15px"
        }, 150);
    })

    $(".arrow.left").mouseleave(function() {
        $(this).animate({
            "padding-left": "10px"
            ,"padding-right": "10px"
        }, 150);
    })
    
    $(".arrow.right").mouseenter(function() {
        $(this).animate({
            "padding-right": "5px"
            ,"padding-left": "15px"
        }, 150);
    })

    $(".arrow.right").mouseleave(function() {
        $(this).animate({
            "padding-right": "10px"
            ,"padding-left": "10px"
        }, 150);
    })

    container.css({
         "height": contHeight + "px"
        ,"width": "100%"
        ,"margin": "auto"
        ,"display": "flex"
        ,"justify-content": "flex-start"
        ,"align-items": "center"
        ,"overflow": "hidden"
    });

    $(container).find("img").css({
        "min-width": "100%"
    });

}

$(document).ready(function() {
    addImages();
    if (showDots) {
        sliderDots();
    }

    addStyles();
});