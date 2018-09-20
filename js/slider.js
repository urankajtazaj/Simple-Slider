/* 
 * Created by Uran Kajtazaj 
 */

function SimpleSlider() {

    var self = this;

    this.DotsVisible = true;
    this.Auto = false;
    this.PauseSlideOnMouseEntered = true;
    this.ArrowsVisible = true;
    this.CenterScreen = true;

    this.SliderHeight = 800;
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
    this.sliderContainer.find(".container").css({
        "max-width": "100%"
        ,"padding": "0"
    });

    this.sliderContainer.prepend("<div class=\"img-preview\"><img src=\"\"></div>");

    this.AddOverlay = function(title, description) {
        self.container.append("<div class='overlay dark'></div>");
        self.container.find(".overlay").append("<h2>Hello world</h2>");
    }

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
        for (var i = 0; i < self.images.length-1; i++) {
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

    this.imgPreview = $(".img-preview");

    this.mouseenter_handler = function() {
        clearInterval(self.slideInterval);
        console.log("ENTERED");
    }

    this.mouseleave_handler = function() {
        self.slideInterval = setInterval(self.nextImage, self.AutoSlideTime);
        console.log("EXITED");
    }

    this.imgPreview.click(function() {
        $(this).css("display", "none");
        self.sliderContainer.bind("mouseenter", self.mouseenter_handler)
        self.sliderContainer.bind("mouseleave", self.mouseleave_handler);
        self.sliderContainer.trigger("mouseleave");
    });

    this.previewImage = function(path) {
        self.imgPreview.css("display", "flex");
        self.imgPreview.find("img").attr("src", path);
        self.sliderContainer.unbind("mouseleave");
    }

    this.addImages = function() {
        self.images.forEach(imagePath => {
            $(self.container).append("<div class='image-placeholder'><img src='" + imagePath + "'/></div>");        
        });

        $(".image-placeholder").find("img").each(function(i, el) {
            var el = $(el);
            el.click(function() {
                self.previewImage($(this).attr("src"));
            });
        });
    }

    this.addStyles = function() {
        self.imgPreview.css({
            "position": "fixed"
            ,"width": "100vw"
            ,"height": "100vh"
            ,"z-index": "6"
            ,"top": "0"
            ,"left": "0"
            ,"background-color": "rgba(0,0,0,0.7)"
            ,"display": "none"
            ,"justify-content": "center"
            ,"align-items": "center"
            ,"box-sizing": "border-box"
            ,"padding": "10px"
        });

        self.imgPreview.find("img").css({
            "max-width": "90%"
            ,"max-height": "90%"
            ,"z-index": "7"
        });

        self.container.find(".image-placeholder").css({
            "display": "flex", 
            "justify-content": "center", 
            "align-items": "center", 
            "min-width": "100%",
            "height": "100%"
        });

        self.sliderContainer.css({
            "width": self.SliderWidth
            ,"position": "relative"
            ,"margin-left": "auto"
            ,"margin-right": "auto"
            //,"padding": "5px 10px"
            //,"border": "1px solid #eee"
        });

        $(".slider-dots").css({
            "text-align": "center"
            ,"position": "absolute"
            ,"width": "100%"
            ,"bottom": "5"
            ,"padding": "10px 0 10px 0"
            ,"left": "0"
            ,"background": "linear-gradient(to right, transparent, rgba(0,0,0,0.5), transparent)"
        });

        $(".dot").css({
            "margin": "0px 5px 0 5px"
            ,"display": "inline-block"
            ,"height": "12px"
            ,"width": "12px"
            ,"background-color": "rgba(255, 255, 255, .7)"
            ,"border-radius": "20px"
            ,"z-index": "3"
            ,"cursor": "pointer"
            ,"transition": "150ms ease-in-out"
            ,"box-shadow": "0 0 0 2px rgba(0, 0, 0, 0.3)"
        });

        $(".dot.current").css({
            "background-color": "#fff"
            ,"box-shadow": "0 0 0 3px rgba(0, 0, 0, 0.5)"
        });

        self.sliderContainer.find(".container").css({
            "position": "relative"
            ,"display": "flex"
            ,"justify-content": "space-between"
        });

        $(".arrow").css({
            "position": "absolute"
            ,"display": "inline-block"
            ,"height": "55px"
            ,"padding": "10px"
            ,"margin-top": "calc(" + self.SliderHeight + "px / 2 - 22px)"
            ,"display": "flex"
            ,"justify-content": "center"
            ,"align-items": "center"
            ,"display": "none"
            ,"cursor": "pointer"
            ,"z-index": "5"
            ,"background-color": "rgba(0, 0, 0, .4)"
            ,"border-radius": "100%"
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

       self.container.css({
            "height": self.SliderHeight + "px"
            ,"width": "100%"
            ,"margin": "auto"
            ,"display": "flex"
            ,"justify-content": "flex-start"
            ,"align-items": "center"
            ,"overflow": "hidden"
        });

        $(self.container).find("img").css({
            "max-width": "100%"
            ,"max-height": "100%"
            ,"cursor": "pointer"
        });

        self.container.find(".overlay").css({
            "background-color": "rgba(0,0,0,.5)"
            ,"color": "#fff"
            ,"position": "absolute"
            ,"height": "100%"
            ,"width": "100%"
            ,"display": "flex"
            ,"justify-content": "center"
            ,"align-items": "center"
        })
    }

    this.Show = function() {
        self.addImages();

        if (self.images.length > 0) {
            if (self.DotsVisible && self.images.length > 1) {
                self.sliderDots();
            }

            self.addStyles();

            self.contWidth = $(self.container).outerWidth(true);        

            if (!self.CenterScreen) {
                self.sliderContainer.css({
                    "margin-left": "initial"
                    ,"margin-right": "initial"
                });
            }

            if (self.ArrowsVisible) {
                $(".arrow").css({
                    "display": "initial"
                });
            }

            if (self.Auto) {
                this.slideInterval = setInterval(self.nextImage, self.AutoSlideTime);
            }

            if (self.Auto && self.PauseSlideOnMouseEntered) {
                self.sliderContainer.bind("mouseenter", self.mouseenter_handler)
                self.sliderContainer.bind("mouseleave", self.mouseleave_handler);
            }
        } else {
            alert("Add images to the slider to continue");
        }
    };

}