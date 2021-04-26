document.onkeypress = function(evt)
{
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    var p = 0.1; // 10 percent
    var d = 0.0;
    // zoom in
    if(charStr === 'z')
    {
        d = (xmax - xmin) * p;
        xmin = xmin + d;
        xmax = xmax - d;
        d = (ymax - ymin) * p;
        ymin = ymin + d;
        ymax = ymax - d;
    }
    // zoom out
    if(charStr === 'x')
    {
        d = (xmax - xmin) * p;
        xmin = xmin - d;
        xmax = xmax + d;
        d = (ymax - ymin) * p;
        ymin = ymin - d;
        ymax = ymax + d;
    }
    // move left
    if(charStr === 'a')
    {
        d = (xmax - xmin) * p;
        xmin = xmin - d;
        xmax = xmax - d;
    }
    // move right
    if(charStr === 'd')
    {
        d = (xmax - xmin) * p;
        xmin = xmin + d;
        xmax = xmax + d;
    }
    // move up
    if(charStr === 'w')
    {
        d = (ymax - ymin) * p;
        ymin = ymin - d;
        ymax = ymax - d;
    }
    // move down
    if(charStr === 's')
    {
        d = (ymax - ymin) * p;
        ymin = ymin + d;
        ymax = ymax + d;
    }
    // reset
    if(charStr === 'r')
    {
        xmin = -2.0; xmax = 1.0;
        ymin = -1.5; ymax = 1.5;
    }

    DrawMandelbrotFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1);
};

function DrawMandelbrotFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1)
{
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var width = context.canvas.width;
    var height = context.canvas.height;
    var imgd = context.createImageData(width, height);
    var pix = imgd.data;

    var maxIterations = 256;
    var x = 0.0; var y = 0.0;
    var zx = 0.0; var zx0 = 0.0; var zy = 0.0;
    var zx2 = 0.0; var zy2 = 0.0;

    for (var j = 0; j < height; j++)
    {
        y = ymin + (ymax - ymin) * j / height;
        for(var k = 0; k < width; k++)
        {
            x = xmin + (xmax - xmin) * k / width;

            zx = x; zy = y;
            for(var i = 0; i < maxIterations; i++)
            {
                // f(z) = z^2 + c where c is 0
                zx2 = zx * zx; zy2 = zy * zy; // square the x and y values
                if(zx2 + zy2 > 4.0) break; // see if the equation grows bigger than 4, if so then break
                zx0 = zx2 - zy2 + x; // get the x value of the ordered pair
                zy = 2.0 * zx * zy + y; // get the y value of the ordered pair
                zx = zx0;
            }
            var pixel = (width * j + k) * 4; // by using the iterations we can change the colors
            pix[pixel] = i % mr0 * mr1;     // red
            pix[pixel + 1] = i % mg0 * mg1; // green
            pix[pixel + 2] = i % mb0 * mb1; // blue
            pix[pixel + 3] = 255;           // alpha
        }
    }

    context.putImageData(imgd, 0, 0);
}

// main
var xmin = -2.0; var xmax = 1.0;
var ymin = -1.5; var ymax = 1.5;

// these are for coloring the image
var mr0 = 0; var mg0 = 0; var mb0 = 0;
while(mr0 === mg0 || mr0 === mb0 || mg0 === mb0)
{
    mr0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3));
    mg0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3));
    mb0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3));
}
var mr1 = 256 / mr0; var mg1 = 256 / mg0; var mb1 = 256 / mb0;

DrawMandelbrotFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1);