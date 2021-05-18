function keyChange(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, fractal){
    DrawFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, fractal); // creates the fractal

    // gets the reset values
    const resetXMin = xmin;
    const resetXMax = xmax;
    const resetYMin = ymin;
    const resetYMax = ymax;

    //when the user presses a key
    document.onkeypress = function(evt)
    {
        var charCode = evt.keyCode
        var charStr = String.fromCharCode(charCode);
        var p = 0.1; // 10 percent zoom
        var d = 0.0;

        // zoom in
        if(charStr === 'z') // press 'z'
        {
            d = (xmax - xmin) * p;
            xmin = xmin + d;
            xmax = xmax - d;
            d = (ymax - ymin) * p;
            ymin = ymin + d;
            ymax = ymax - d;
        }

        // zoom out
        if(charStr === 'x') // press 'x'
        {
            d = (xmax - xmin) * p;
            xmin = xmin - d;
            xmax = xmax + d;
            d = (ymax - ymin) * p;
            ymin = ymin - d;
            ymax = ymax + d;
        }

        // move left
        if(charStr === 'a') // press 'a'
        {
            d = (xmax - xmin) * p;
            xmin = xmin - d;
            xmax = xmax - d;
        }

        // move right
        if(charStr === 'd') // press 'd'
        {
            d = (xmax - xmin) * p;
            xmin = xmin + d;
            xmax = xmax + d;
        }

        // move up
        if(charStr === 'w') // press 'w'
        {
            d = (ymax - ymin) * p;
            ymin = ymin - d;
            ymax = ymax - d;
        }

        // move down
        if(charStr === 's') // press 's'
        {
            d = (ymax - ymin) * p;
            ymin = ymin + d;
            ymax = ymax + d;
        }

        // reset
        if(charStr === 'r') // press 'r'
        {
            xmin = resetXMin; xmax = resetXMax;
            ymin = resetYMin; ymax = resetYMax;
        }
        DrawFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, fractal); // creates the fractal again after adjustment
    };
}

function DrawFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, fractal){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var width = context.canvas.width; // gets width
    var height = context.canvas.height; // gets height

    var imgd = context.createImageData(width, height); // gets the height and width for pixels
    var pix = imgd.data; // puts the height and width in an RGB array (0.255)

    var maxIterations = 256;
    var x = 0.0; var y = 0.0; // these change for every pixel

    var zx = 0.0; var zy = 0.0; // these start at 0

    for (var j = 0; j < height; j++)
    {
        y = ymin + (ymax - ymin) * j / height; // converts pixel coordinate into y value for complex number
        for(var k = 0; k < width; k++)
        {
            x = xmin + (xmax - xmin) * k / width; // converts pixel coordinate into x value for complex number
            let i = 0;
            // if user selected Mandelbrot
            if (fractal === 'm'){
                i = Mandelbrot(zx, zy, x, y, maxIterations);
            }

            // if user selected Julia
            else if (fractal === 'j'){
                i = Julia(zx, zy, x, y, cX, cY, maxIterations);
            }

            // if user selected Dr. Browns
            else if (fractal === 'b'){
                 i = Brown(zx, zy, x, y, cX, cY, maxIterations);
            }

            // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
            var pixel = (width * j + k) * 4; // by using the iterations we can change the colors
            pix[pixel] = i % mr0 * mr1;     // red
            pix[pixel + 1] = i % mg0 * mg1; // green
            pix[pixel + 2] = i % mb0 * mb1; // blue
            pix[pixel + 3] = 255;           // alpha
        }
    }
    context.putImageData(imgd, 0, 0); // puts the pixel data into a context
}

function Mandelbrot(zx, zy, x, y, maxIterations) {
    let zx2 = 0;
    let zy2 = 0;
    let tmp = 0;
    zx = x;
    zy = y;
    for (var i = 0; i < maxIterations; i++) {
        // f(z) = z^2 + c where c is 0
        zx2 = zx * zx;
        zy2 = zy * zy; // square the x and y values

        if (zx2 + zy2 > 4.0) break; // sees if the absolute value of z grows bigger than 4, if so then break
        tmp = zx2 - zy2 + x; // get the x value of the ordered pair
        zy = 2.0 * zx * zy + y; // get the y value of the ordered pair
        zx = tmp;
    }
    return i;
}

function Julia(zx, zy, x, y, cX, cY, maxIterations) {
    let zx2 = 0;
    let zy2 = 0;
    let tmp = 0;
    zx = x;
    zy = y;
    for (var i = 0; i < maxIterations; i++) {
        // f(z) = z^2 + c where c is predefined; actual algorithm
        zx2 = zx * zx;
        zy2 = zy * zy; // squares the x and y values

        if (zx2 + zy2 > 4.0) break; // sees if the absolute value of z grows bigger than 4, if so then break
        tmp = zx2 - zy2 + cX; // gets the x value of the ordered pair
        zy = 2.0 * zx * zy + cY; // gets the y value of the ordered pair
        zx = tmp;
    }
    return i;
}

function Brown(zx, zy, x, y, cX, cY, maxIterations) {
    let zx2 = 0;
    let zy2 = 0;
    let tmp = 0;

    let xFirst = 0; let xSecond = 0; let xThird = 0; // separate x values to better understand
    let yFirst = 0; let ySecond = 0; let yThird = 0; // separate y values to better understand
    zx = x;
    zy = y;

    for (var i = 0; i < maxIterations; i++) {
        // f(z) = ((-g * z^2 + z -1) / (g * z))
        // real part of z
        xFirst = -zx;
        xSecond = (cX / ((cX * cX) + (cY * cY)));
        xThird = ((cX * zx - cY * zy) / ((cX * zx - cY * zy) * (cX * zx - cY * zy) - (cX * zy + cY * zx) * (-cX * zy - -cY * zx)))

        // imaginary part of z
        yFirst = -zy;
        ySecond = (-cY / ((cX * cX) + (cY * cY)));
        yThird = ((-cX * zy - cY * zx) / ((cX * zx - cY * zy) * (cX * zx - cY * zy) - (cX * zy + cY * zx) * (-cX * zy - -cY * zx)))

        zx2 = zx * zx;
        zy2 = zy * zy; // squares the x and y values

        if (zx2 + zy2 > 2.0) break; // sees if the absolute value of z grows bigger than 2, if so then break

        // z cant be 0, otherwise it is undefined
        if (zx === 0 && zy === 0) {
            zx = zx;
            zy = zy;
        }
        else {
            tmp = xFirst + xSecond + xThird; // gets the x value of the ordered pair
            zy = yFirst + ySecond + yThird; // gets the y value of the ordered pair
            zx = tmp;
        }
    }
    return i;
}