/* 
 * Created by Uran Kajtazaj 
 */

function SimpleSlider() {

    var self = this;

    this.DotsVisible = true;
    this.Auto = true;
    this.PauseSlideOnMouseEntered = true;
    this.ArrowsVisible = true;

    this.ContHeight = 800;
    this.SliderWidth = "100%";
    this.SlideSpeed = 500;
    this.AutoSlideTime = 5000;
    this.next = $("#next");
    this.prev = $("#prev");
    this.images = [];

    this.sliderContainer = $(".slider");
    this.container = $(".slider-container");
    this.contWidth = $(self.container)[0].getBoundingClientRect().width;
    this.currentIndex = 0;

    $(".arrow").css({
        "display": "none"
    });

    self.nextImage = function() {
        if (self.currentIndex >= $(self.container).find("img").length - 1) {
            self.currentIndex = -1;
        }
        
        $(self.container).animate({
            scrollLeft: self.contWidth * ++self.currentIndex
        }, self.SlideSpeed);

        self.changeDotLocation(self.currentIndex);
    }

    this.prevImage = function() {
        if (self.currentIndex <= 0) {
            self.currentIndex = $(self.container).find("img").length;
        }

       $(self.container).animate({
            scrollLeft: self.contWidth * --self.currentIndex
        }, self.SlideSpeed);

        self.changeDotLocation(this.currentIndex);
    }
    
    this.slideToIndex = function(index) {
        $(self.container).animate({
             scrollLeft: self.contWidth * index
         }, self.SlideSpeed);
    
         self.changeDotLocation(index);
         self.currentIndex = index;
     }

    this.sliderDots = function() {
        self.sliderContainer.append("<div class='slider-dots'></div>");
        for (var i = 0; i < self.images.length; i++) {
            self.sliderContainer.find(".slider-dots").append("<span class='dot' data-index='" + i + "'></span>");
        }

        $(".dot").each(function(i, el) {
            var el = $(el);
            el.click(function() {
                var id = el.attr("data-index");
                self.slideToIndex(id);
                $(self.sliderContainer.find(".dot")[0]).addClass("current");
            });
        });
        $(self.sliderContainer.find(".dot")[0]).addClass("current");
    }

    this.changeDotLocation = function(index) {
        $(".dot").css({
            "background-color": "rgba(255, 255, 255, .7)"
            ,"box-shadow": "0 0 0 2px rgba(0, 0, 0, 0.3)"
        });

        $($(".dot")[index]).css({
            "background-color": "#fff"
            ,"box-shadow": "0 0 0 3px rgba(0, 0, 0, 0.5)"
        });
    }

    $(this.next).on('click', function() {
        self.nextImage();
    });

    $(this.prev).on('click', function() {
        self.prevImage();
    });

    this.addImages = function() {
        self.images.forEach(imagePath => {
            $(self.container).append("<img src='" + imagePath + "'/>");        
        });
    }

    this.addStyles = function() {
        self.sliderContainer.css({
            "width": self.SliderWidth
            ,"position": "relative"
        });

        $(".slider-dots").css({
            "text-align": "center"
            ,"position": "absolute"
            ,"width": "100%"
        });

        $(".dot").css({
            "margin": "-25px 5px 0 5px"
            ,"display": "inline-block"
            ,"height": "12px"
            ,"width": "12px"
            ,"background-color": "rgba(255, 255, 255, .7)"
            ,"border-radius": "20px"
            ,"z-index": "3"
            ,"cursor": "pointer"
            ,"transition": "150ms ease-in-out"
        });

        $(".dot.current").css({
            "background-color": "#fff"
            ,"box-shadow": "0 0 0 3px rgba(0, 0, 0, 0.5)"
        });

        $(".container").css({
            "position": "relative"
            ,"display": "flex"
            ,"justify-content": "space-between"
        });

        $(".arrow").css({
            "position": "absolute"
            ,"display": "inline-block"
            ,"height": "40px"
            ,"padding": "10px"
            ,"margin-top": "calc(" + self.ContHeight + "px / 2 - 40px)"
            ,"display": "flex"
            ,"justify-content": "center"
            ,"align-items": "center"
            ,"cursor": "pointer"
        });

        $(".arrow img").css({
            "height": "35px"
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

       this.container.css({
            "height": self.ContHeight + "px"
            ,"width": "100%"
            ,"margin": "auto"
            ,"display": "flex"
            ,"justify-content": "flex-start"
            ,"align-items": "center"
            ,"overflow": "hidden"
        });

        $(this.container).find("img").css({
            "min-width": "100%"
        });
    }

    this.Show = function() {
        self.addImages();

        if (self.images.length > 0) {
            if (self.DotsVisible && self.images.length > 1) {
                self.sliderDots();
            }
        
            self.addStyles();

            if (self.ArrowsVisible) {
                $(".arrow").css({
                    "display": "normal"
                });
            }

            if (self.Auto) {
                this.slideInterval = setInterval(self.nextImage, self.AutoSlideTime);
            }

            if (self.Auto && self.PauseSlideOnMouseEntered) {
                self.sliderContainer.mouseenter(function() {
                    clearInterval(self.slideInterval);
                });
        
                self.sliderContainer.mouseleave(function() {
                    self.slideInterval = setInterval(self.nextImage, self.AutoSlideTime);
                });
            }
        } else {
            alert("Add images to the slider to continue");
        }

    };
}