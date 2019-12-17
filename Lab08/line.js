function Line(ctx, x0, y0, x1, y1) {
    //Изменения координат
    var deltaX = Math.abs(x1 - x0);
    var deltaY = Math.abs(y1 - y0);
    //Направление приращения
    var signX = x0 < x1 ? 1 : -1;
    var signY = y0 < y1 ? 1 : -1;

    var error = deltaX - deltaY;
    var s = 1;

    ctx.fillRect(x1 * s, y1 * s, 1 * s, 1 * s);
    while (x0 != x1 || y0 != y1) {
        ctx.fillRect(x0 * s, y0 * s, 1 * s, 1 * s);
        var error2 = error * 2;

        if (error2 > -deltaY) {
            error -= deltaY;
            x0 += signX;
        }
        if (error2 < deltaX) {
            error += deltaX;
            y0 += signY;
        }
    }
}