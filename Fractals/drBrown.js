function keyChangeBrown(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY) {
    DrawBrownFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY);
    document.onkeypress = function (evt) {
        var charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode);
        var p = 0.1; // 10 percent
        var d = 0.0;
        // zoom in
        if (charStr === 'z') {
            d = (xmax - xmin) * p;
            xmin = xmin + d;
            xmax = xmax - d;
            d = (ymax - ymin) * p;
            ymin = ymin + d;
            ymax = ymax - d;
        }
        // zoom out
        if (charStr === 'x') {
            d = (xmax - xmin) * p;
            xmin = xmin - d;
            xmax = xmax + d;
            d = (ymax - ymin) * p;
            ymin = ymin - d;
            ymax = ymax + d;
        }
        // move left
        if (charStr === 'a') {
            d = (xmax - xmin) * p;
            xmin = xmin - d;
            xmax = xmax - d;
        }
        // move right
        if (charStr === 'd') {
            d = (xmax - xmin) * p;
            xmin = xmin + d;
            xmax = xmax + d;
        }
        // move up
        if (charStr === 'w') {
            d = (ymax - ymin) * p;
            ymin = ymin - d;
            ymax = ymax - d;
        }
        // move down
        if (charStr === 's') {
            d = (ymax - ymin) * p;
            ymin = ymin + d;
            ymax = ymax + d;
        }
        // reset
        if (charStr === 'r') {
            xmin = -2.0;
            xmax = 2.0;
            ymin = -1.5;
            ymax = 1.5;
        }
        DrawBrownFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY);
    };
}

function DrawBrownFractal(xmin, xmax, ymin, ymax, mr0, mr1, mg0, mg1, mb0, mb1, cX, cY)
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
    var xFirst; var xSecond; var xThird;
    var yFirst; var ySecond; var yThird;
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
                xFirst = -zx;
                xSecond = (cX/((cX*cX) + (cY*cY)));
                xThird = ((cX*zx - cY*zy)/((cX*zx - cY*zy)*(cX*zx - cY*zy) - (cX*zy + cY*zx) * (-cX*zy - -cY*zx)))

                yFirst = -zy;
                ySecond = (-cY/((cX*cX) + (cY*cY)));
                yThird = ((-cX*zy - cY*zx)/((cX*zx - cY*zy)*(cX*zx - cY*zy) - (cX*zy + cY*zx) * (-cX*zy - -cY*zx)))

                zx2 = zx * zx; zy2 = zy * zy;
                if(zx2 + zy2 > 2.0) break;
                if(zx === 0 && zy === 0){
                    zx = zx;
                    zy = zy;
                }
                else {
                    zx0 = xFirst + xSecond + xThird;
                    zy = yFirst + ySecond + yThird;
                    zx = zx0;
                }
            }
            var pixel = (width * j + k) * 4;
            pix[pixel] = i % mr0 * mr1;     // red
            pix[pixel + 1] = i % mg0 * mg1; // green
            pix[pixel + 2] = i % mb0 * mb1; // blue
            pix[pixel + 3] = 255;           // alpha
        }
    }
    context.putImageData(imgd, 0, 0);
}