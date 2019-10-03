
const canvas = document.querySelector(".origin");
const canvas1 = document.querySelector(".median");

let ctx = canvas.getContext("2d");
let img = new Image;

img.setAttribute( 'crossOrigin', 'Anonymous');
img.onload = function() {
    ctx.drawImage(img, 0, 0);
    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let new_ctx = canvas1.getContext("2d");
    let h = canvas.height;
    let w = canvas.width;
    let new_pix = new_ctx.createImageData(w, h);
    for (let i=1; i<h-1; i++) {
        for (let j=1; j<w-1; j++) {
            if (pixels.data[(i*w+j)*4+3] != 0) {
                new_pix.data[(i*w+j)*4] = (pixels.data[((i-1)*w+(j-1))*4] + pixels.data[((i-1)*w+j)*4] +
        pixels.data[((i-1)*w+(j+1))*4] + pixels.data[(i*w+(j-1))*4] + pixels.data[(i*w+j)*4] +
        pixels.data[(i*w+(j+1))*4] + pixels.data[((i+1)*w+(j-1))*4] + pixels.data[((i+1)*w+j)*4] +
        pixels.data[((i+1)*w+(j+1))*4]) / 9;
                new_pix.data[(i*w+j)*4+1] = (pixels.data[((i-1)*w+(j-1))*4+1] + pixels.data[((i-1)*w+j)*4+1] +
        pixels.data[((i-1)*w+(j+1))*4+1] + pixels.data[(i*w+(j-1))*4+1] + pixels.data[(i*w+j)*4+1] +
        pixels.data[(i*w+(j+1))*4+1] + pixels.data[((i+1)*w+(j-1))*4+1] + pixels.data[((i+1)*w+j)*4+1] +
        pixels.data[((i+1)*w+(j+1))*4+1]) / 9;
                new_pix.data[(i*w+j)*4+2] = (pixels.data[((i-1)*w+(j-1))*4+2] + pixels.data[((i-1)*w+j)*4+2] +
        pixels.data[((i-1)*w+(j+1))*4+2] + pixels.data[(i*w+(j-1))*4+2] + pixels.data[(i*w+j)*4+2] +
        pixels.data[(i*w+(j+1))*4+2] + pixels.data[((i+1)*w+(j-1))*4+2] + pixels.data[((i+1)*w+j)*4+2] +
        pixels.data[((i+1)*w+(j+1))*4+2]) / 9;
                new_pix.data[(i*w+j)*4+3] = (pixels.data[((i-1)*w+(j-1))*4+3] + pixels.data[((i-1)*w+j)*4+3] +
        pixels.data[((i-1)*w+(j+1))*4+3] + pixels.data[(i*w+(j-1))*4+3] + pixels.data[(i*w+j)*4+3] +
        pixels.data[(i*w+(j+1))*4+3] + pixels.data[((i+1)*w+(j-1))*4+3] + pixels.data[((i+1)*w+j)*4+3] +
        pixels.data[((i+1)*w+(j+1))*4+3]) / 9;
            }
        }
    }
    new_ctx.putImageData(new_pix, 0, 0);
};
img.src = "https://www.tutorialspoint.com/images/QAicon.png";