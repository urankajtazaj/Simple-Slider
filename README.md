# SimpleSlider
A simple slider javascript library
#

### Getting started
Create a html template as below
```html
<div class="slider">
    <div class="container">
        <div class="left arrow" id="prev"><img src="icons/back.png"></div>
        <div class="slider-container"></div>
        <div class="right arrow" id="next"><img src="icons/next.png"></div>
    </div>
</div>

<!-- Include the jquery and SimpleSlider libraries -->
<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/slider.js"></script>
```
#
### How to use
```javascript
// Create a new SimpleSlider object
var slider = new SimpleSlider();

slider.SliderHeight = 800;                // Sets the slider height :double
slider.SliderWidth = "100%"               // Sets the slider width :string
slider.SlideSpeed = 500                   // Animation speed :double
slider.Auto = true;                       // Change slides automaticaly :bool
slider.AutoSlideTime = 2000;              // Slider auto-slide delay (if set to auto) :double
slider.PauseSlideOnMouseEntered = false;  // When mouse entered pause the slide (is set to auto) :bool
slider.DotsVisible = true;                // Show dots at the bottom of the slide :bool
slider.ArrowsVisible = true;              // Show/hide arrows :bool

// Set the slider images path
slider.images = [
    "images/img-1.jpeg",
    "images/img-3.jpeg",
    "images/img-5.jpeg"
];

slider.Show(); // Show the slider
```
#
### Preview
![Image example](https://i.imgur.com/8d3uUmG.jpg)
