let canvas;
let ctx;
var mr0 = 0;
var mg0 = 0;
var mb0 = 0;
var xmin = 0;
var xmax = 0;
var ymin = 0;
var ymax = 0;
var mr1 = 0;
var mg1 = 0;
var mb1 = 0;

// creates the canvas
window.onload = init;

// sets default c value to a cool fractal
let cX = -.7; let cY = .27015;

// makes the canvas black and empty
function init() {
    canvas = document.getElementById('canvas');
    canvas.style.background = "black";
    ctx = canvas.getContext('2d');
}

// using random numbers, color the image
function colorImage(){
    while (mr0 === mg0 || mr0 === mb0 || mg0 === mb0) {
        mr0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3)); // random red value
        mg0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3)); // random green value
        mb0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3)); // random blue value
    }
    // puts the value into a 256 rgb value
    mr1 = 256 / mr0;
    mg1 = 256 / mg0;
    mb1 = 256 / mb0;
}

function selectFractal() {
    // sets the rgb values
    colorImage();

    // sees what the user put for their fractal choice
    var fractal = document.getElementById("ddlselect").value;
    if (fractal === "Mandelbrot") {
        // default max and mins to center the fractal
        xmin = -2.0;
        xmax = 1.0;
        ymin = -1.5;
        ymax = 1.5;

        // this creates the image and waits for a key change
        keyChange(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, 'm');
    }
    else if (fractal === "Julia") {
        // default max and mins to center the fractal
        xmin = -2.0;
        xmax = 2.0;
        ymin = -1.5;
        ymax = 1.5;

        // this creates the image and waits for a key change
        keyChange(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, 'j');
    }
    else if (fractal === "DrBrown") {
        // default max and mins to center the fractal
        xmin = -2.0;
        xmax = 2.0;
        ymin = -1.5;
        ymax = 1.5;

        // this creates the image and waits for a key change
        keyChange(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, 'b');
    }
}

function displayData(){
    document.getElementById("xoutput").innerHTML = 'X: ' + document.getElementById("c_x-value").value; // displays x value
    document.getElementById("youtput").innerHTML = 'Y: ' + document.getElementById("c_y-value").value; // displays y value
}

// Opens the canvas in fullscreen.
function openFullscreen() {
    var elem = document.getElementById("canvas");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
    else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen) { // Chrome
        elem.msRequestFullscreen();
    }
}