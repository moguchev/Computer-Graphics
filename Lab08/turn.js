function turn(angle, axis) {
    var center = {
        'x': parray[0],
        'y': parray[1]
    };
    angle = (angle * 3.14) / 180; //to radian
    ctx.clearRect(0, 0, 500, 500);
    for (var n = 0; n < parray.length / 2; n++) {
        var X = parray[2 * n] - center.x;
        var Y = parray[2 * n + 1] - center.y;

        switch (axis) {
            case 'x': 
                parray[2 * n] = X + center.x;
                parray[2 * n + 1] = parseInt(Y * Math.cos(angle) + Math.sin(angle)) + center.y;
                break;
            case 'y':
                parray[2 * n] = parseInt(X * Math.cos(angle) + Math.sin(angle)) + center.x;
                parray[2 * n + 1] = Y + center.y;
                break;
            case 'z':
                parray[2 * n] = parseInt(X * Math.cos(angle) - Y * Math.sin(angle)) + center.x;
                parray[2 * n + 1] = parseInt(-X * Math.sin(angle) + Y * Math.cos(angle)) + center.y;
                break;
            default :
                alert("Only x, y, z");
        }
    }
    borderFill(ctx, parray);
}