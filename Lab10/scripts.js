function buf(value) {
    for (var x=0; x<canvas.width; x++) {
        for (var y=0; y<canvas.height; y++) {
            z_buf[x][y] = value;
        }
    }
}

function get_Z(x,y,plane) {
    return (-plane[3]-plane[0]*x-plane[1]*y)/plane[2];
}

function get_plane(triangle) {
    var plane = [];
    var x1 = triangle[0][0];
    var y1 = triangle[0][1];
    var z1 = triangle[0][2];
    var x2 = triangle[1][0];
    var y2 = triangle[1][1];
    var z2 = triangle[1][2];
    var x3 = triangle[2][0];
    var y3 = triangle[2][1];
    var z3 = triangle[2][2];
    plane[0] = y1*(z2 - z3) + y2*(z3 - z1) + y3*(z1 - z2); 
    plane[1] = z1*(x2 - x3) + z2*(x3 - x1) + z3*(x1 - x2); 
    plane[2] = x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2); 
    plane[3] = x1*(y3*z2 - y2*z3) + y1*(x2*z3 - x3*z2) + z1*(x3*y2 - x2*y3);
    return plane;
}

function draw_polynom(polynome, color) {
    var triangle = [polynome[0], polynome[1], polynome[2]];
    var plane = get_plane(triangle);
    var y_max = polynome[0][1];
    var y_min = y_max;
    for (var i=0; i<polynome.length; i++) {
        if (polynome[i][1] > y_max) 
            y_max = polynome[i][1];
        else if (polynome[i][1] < y_min) 
            y_min = polynome[i][1];
    }
    ctx.fillStyle=color;
    for (var y=y_max; y>=y_min; y--)
        polynom_lyne(y, polynome, plane);
}

function polynom_lyne(Y, polynome, plane) {
    var chp = [];
    var num_of_chp = 0;
    for (var i=1; i<polynome.length; i++) {
        if (    Y<=polynome[i][1] && Y>polynome[i-1][1] 
                || Y>polynome[i][1] && Y<=polynome[i-1][1] ) {
            var xk = polynome[i][0];
            var yi = polynome[i][1];
            var xi = polynome[i-1][0];
            var yk = polynome[i-1][1];
            chp[num_of_chp] = Math.round(xi+((yk-Y)*(xk-xi))/(yk-yi));
            num_of_chp++;
        }
    }
    if (    Y<=polynome[0][1] && Y>polynome[polynome.length-1][1] 
            || Y>polynome[0][1] && Y<=polynome[polynome.length-1][1] ) {
        var xk = polynome[0][0];
        var yi = polynome[0][1];
        var xi = polynome[polynome.length-1][0];
        var yk = polynome[polynome.length-1][1];
        chp[num_of_chp] = Math.round(xi+((yk-Y)*(xk-xi))/(yk-yi));
        num_of_chp++;
    }
    for (var i=0; i<num_of_chp-1; i++)
        for (var j=num_of_chp-1; j>=0; j--)
            if ( chp[j]>chp[j+1] ) {
                var m = chp[j+1];
                chp[j+1] = chp[j];
                chp[j] = m;
            }
    
    for (var i=0; i<num_of_chp/2; i++) {
        for (var X=chp[2*i]+1; X<chp[2*i+1]; X++) {
            var Z = get_Z(X,Y,plane);
            
            if ( X == 5 && Y == 1) {
                var str = "point:  X="+X+"  Y="+Y+"  Z="+Z+" zbuf[X][Y]="+zbuf[X][Y];
                alert(str);
            }
            
            if (Z < z_buf[X][Y]) {
                z_buf[X][Y] = Z;
                ctx.fillRect(X,Y,1,1);
            }
        }
    }
}