// * Function to update everything
let count = 0;
let frame = 2;
function world() {
    count++;
    if (count > frame - 1) {
        players.forEach(player => controls(player));
        entities.forEach(entity => entity.calc());
        c.clearRect(0, 0, canvas.width, canvas.height);
        bG();
        platforms.forEach(platform => platform.drawPlatform());
        entities.forEach(entity => entity.draw());
        coins.forEach(coin => coin.draw());
        count = 0;
        gameMaster();
    }
}



// * Function for player-input
function controls(player) {
    if (player.right === true || player.left === true) {
        player.control.playerMotionX(player.right, player.left);
    }
    if (player.up === true) {
        player.control.playerJump();
    } else if (player.block === true) {
        player.control.action = 'blocking';
    } else if (player.attack === true) {
        player.control.action = 'attacking';
    }
}


let g = true;
let gc = -500
let plus = 0;
function gameMaster() {
    gc++;
    if (gc > 300 && g !== false) {
        entities.push(new Character(skeleton_spearman, 'red', { x: canvas.width + randomNumber(canvas.width), y: 0 }));
        for (let x = 0; x < 4; x++) {
            coins.push(new Coin({ x: canvas.width + randomNumber(canvas.width), y: canvas.height - 128 * randomNumber(3) }));
        }
        entities.push(new Character(skeleton_spearman, 'red', { x: 0 - 100 - randomNumber(canvas.width), y: 0 }));
        plus++;
        if (plus === 9) {
            entities.push(new Character(skeleton_warrior, 'red', { x: canvas.width + randomNumber(canvas.width), y: 0 }));
            g = false;
        }
        gc = 0;
    }
}