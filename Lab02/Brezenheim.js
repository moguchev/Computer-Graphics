function Line(idata, x0, y0, x1, y1) {
    let flag = 1;
    if (x1 < x0) {
        var s = x0;
        x0 = x1;
        x1 = s;
        s = y0;
        y0 = y1;
        y1 = s;
    }
    if (y0 > y1) {
        s = y0;
        y0 = y1;
        y1 = s;
        flag = -1;
    }
    if (flag == 1) {
        y = y0;
    }
    else {
        y = y1;
    }
        let eps = 0;
        let k=2*(y1-y0);
        let pw=1;
        for (var x=x0; x<=x1; x++) {
                idata.data[(x+y*idata.width)*4+3]=255*
                        Math.pow(Math.abs(0.5- (eps/(2*(x1-x0))) ),pw);
                idata.data[(x+(y+1)*idata.width)*4+3]=255*
                        Math.pow(Math.abs(0.5+ (eps/(2*(x1-x0))) ), pw);
                eps = eps+k;
                if (eps>(x1-x0)) {
                        y += flag;
                        eps = eps - 2*(x1-x0);
                }
        }
    }

    let canvas = document.querySelector(".brezench");
    let ctx = canvas.getContext("2d");

    let flag = 0;
    let idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(idata);
    canvas.addEventListener("click", function(event){
        if (!flag) {
                x0 = event.offsetX;
                y0 = event.offsetY;
                flag = 1;
        } else {
                x1 = event.offsetX;
                y1 = event.offsetY;
                Line(idata, x0, y0, x1, y1);
                ctx.putImageData(idata, 0, 0);
                flag = 0;
        }
    });