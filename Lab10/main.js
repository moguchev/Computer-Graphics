const canvas = document.getElementById('lab_10');
var ctx = canvas.getContext('2d');
ctx.fillStyle="#f0f0f0";
ctx.fillRect(0,0,canvas.width,canvas.height);

var z_buf = [];
for (var x=0; x<canvas.width; x++) {
    z_buf[x] = [];
    for (var y=0; y<canvas.height; y++) {
        z_buf[x][y] = 0;
    }
}

var D = 100;
buf(D);
var triangle1 = [
        [1.0*canvas.width,0.5*canvas.height,0.0*D],
        [0.6*canvas.width,0.2*canvas.height,1.0*D],
        [0.1*canvas.width,0.8*canvas.height,0.6*D] ];
var triangle2 = [
        [0.4*canvas.width,0.5*canvas.height,0.4*D],
        [0.8*canvas.width,0.2*canvas.height,0.0*D],
        [0.5*canvas.width,1.0*canvas.height,1.0*D], ];
var XY = [
        [0.0*canvas.width,1.0*canvas.height,0.0*D],
        [1.0*canvas.width,0.0*canvas.height,0.0*D],
        [0.0*canvas.width,0.0*canvas.height,0.0*D] ];
var XZ = [
        [0.0*canvas.width,0.0*canvas.height,1.0*D],
        [1.0*canvas.width,0.0*canvas.height,0.0*D],
        [0.0*canvas.width,0.0*canvas.height,0.0*D] ];
var YZ = [
        [0.0*canvas.width,0.0*canvas.height,0.0*D],
        [1.0*canvas.width,0.0*canvas.height,1.0*D],
        [1.0*canvas.width,1.0*canvas.height,1.0*D] ];	


draw_polynom(triangle1, "#01df96");
draw_polynom(triangle2, "#c41236");

var triangle = [];

for(var i=0; i<3; i++) {
    var x = Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0;
    var y = Math.floor(Math.random() * (canvas.height - 0 + 1)) + 0;
    var z = Math.floor(Math.random() * (D - 0 + 1)) + 0;
    triangle[i] = [x,y,z];
}
