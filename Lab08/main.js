const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var state = 0;
var parray = new Array();
var n = 0;
var w = canvas.width, h = canvas.height;
var maxy = 0, miny = canvas.height;

canvas.addEventListener('click', function (e) {
    if (state == 0) {
        parray[2 * n] = e.offsetX;
        parray[2 * n + 1] = e.offsetY;
        if (n != 0) {
            Line(ctx, parray[2 * n], parray[2 * n + 1],
                parray[2 * n - 2], parray[2 * n - 1]);
        }
        n++;
    } else if (state == 1) {
        turn(document.getElementById("angle").value, document.getElementById("axis").value);
    }
});

canvas.oncontextmenu = function () {
    if (n > 1) {
        Line(ctx, parray[2 * n - 2], parray[2 * n - 1], parray[0], parray[1]);
        borderFill(ctx, parray);
        state = 1;
    }
    return false;
}