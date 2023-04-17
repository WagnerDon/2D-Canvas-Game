let cloud1 = 0;
let cloud2 = canvas.width;

let land1 = 0;
let land12 = canvas.width;
let land13 = 0 - canvas.width;

let land2 = 0;
let land22 = canvas.width;
let land23 = 0 - canvas.width;

function bG() {
    cloud1 -= 0.2;
    cloud2 -= 0.2;
    if (cloud1 === 0 - canvas.width) {
        cloud1 = 0;
        cloud2 = canvas.width;
    }
    if (land13 === 0 || land12 === 0) {
        land1 = 0;
        land12 = canvas.width;
        land13 = 0 - canvas.width;
    } else if (land23 === 0 || land22 === 0) {
        land2 = 0;
        land22 = canvas.width;
        land23 = 0 - canvas.width;
    }
    c.drawImage(background.sky, 0, 0, canvas.width, canvas.height);
    c.drawImage(background.clouds, cloud1, 0, canvas.width, canvas.height);
    c.drawImage(background.clouds, cloud2, 0, canvas.width, canvas.height);
    c.drawImage(background.mountain, 0, 0, canvas.width, canvas.height);
    c.drawImage(background.land2, land2, 0, canvas.width, canvas.height);
    c.drawImage(background.land2, land22, 0, canvas.width, canvas.height);
    c.drawImage(background.land2, land23, 0, canvas.width, canvas.height);
    c.drawImage(background.land1, land1, 0, canvas.width, canvas.height);
    c.drawImage(background.land1, land12, 0, canvas.width, canvas.height);
    c.drawImage(background.land1, land13, 0, canvas.width, canvas.height);
}