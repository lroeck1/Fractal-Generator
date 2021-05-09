
function keyChange(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, fractal){
    DrawFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, fractal);
    const resetXMin = xmin;
    const resetXMax = xmax;
    const resetYMin = ymin;
    const resetYMax = ymax;
    //when the user presses a key
    document.onkeypress = function(evt)
    {

        var charCode = evt.keyCode
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
            xmin = resetXMin; xmax = resetXMax;
            ymin = resetYMin; ymax = resetYMax;
        }
        DrawFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, fractal);
    };
}

function DrawFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY, fractal){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var width = context.canvas.width;
    var height = context.canvas.height;
    var imgd = context.createImageData(width, height);
    var pix = imgd.data;

    var maxIterations = 256;
    var x = 0.0; var y = 0.0;
    var zx = 0.0; var zy = 0.0;

    console.log(cX);
    console.log(cY);

    for (var j = 0; j < height; j++)
    {
        y = ymin + (ymax - ymin) * j / height;
        for(var k = 0; k < width; k++)
        {
            x = xmin + (xmax - xmin) * k / width;
            let i = 0;
            if (fractal === 'm'){
                i = Mandelbrot(zx, zy, x, y, maxIterations);
            }
            else if (fractal === 'j'){
                i = Julia(zx, zy, x, y, cX, cY, maxIterations);
            }
            else if (fractal === 'b'){
                 i = Brown(zx, zy, x, y, cX, cY, maxIterations);
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

function Mandelbrot(zx, zy, x, y, maxIterations) {
    let zx2 = 0;
    let zy2 = 0;
    let tmp = 0;
    zx = x;
    zy = y;
    for (var i = 0; i < maxIterations; i++) {
        // f(z) = z^2 + c where c is 0; this is the actual algorithm
        zx2 = zx * zx;
        zy2 = zy * zy; // square the x and y values
        if (zx2 + zy2 > 4.0) break; // see if the equation grows bigger than 4, if so then break
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
        zy2 = zy * zy;
        if (zx2 + zy2 > 4.0) break;
        tmp = zx2 - zy2 + cX;
        zy = 2.0 * zx * zy + cY;
        zx = tmp;
    }
    return i;
}

function Brown(zx, zy, x, y, cX, cY, maxIterations) {
    let zx2 = 0;
    let zy2 = 0;
    let tmp = 0;
    let xFirst = 0; let xSecond = 0; let xThird = 0;
    let yFirst = 0; let ySecond = 0; let yThird = 0;
    zx = x;
    zy = y;
    for (var i = 0; i < maxIterations; i++) {
        xFirst = -zx;
        xSecond = (cX / ((cX * cX) + (cY * cY)));
        xThird = ((cX * zx - cY * zy) / ((cX * zx - cY * zy) * (cX * zx - cY * zy) - (cX * zy + cY * zx) * (-cX * zy - -cY * zx)))

        yFirst = -zy;
        ySecond = (-cY / ((cX * cX) + (cY * cY)));
        yThird = ((-cX * zy - cY * zx) / ((cX * zx - cY * zy) * (cX * zx - cY * zy) - (cX * zy + cY * zx) * (-cX * zy - -cY * zx)))

        zx2 = zx * zx;
        zy2 = zy * zy;
        if (zx2 + zy2 > 2.0) break;
        if (zx === 0 && zy === 0) {
            zx = zx;
            zy = zy;
        } else {
            tmp = xFirst + xSecond + xThird;
            zy = yFirst + ySecond + yThird;
            zx = tmp;
        }
    }
    return i;
}