let Space = false;
let D = false;
let A = false;
let W = false;
let E = false;
let Q = false;
let Slash = false;
let ShiftRight = false;
let Right = false;
let Left = false;
let Up = false;



let player1 = {
    up: W,
    left: A,
    right: D,
    attack: E,
    block: Q
}

let player2 = {
    up: Up,
    left: Left,
    right: Right,
    attack: Slash,
    block: ShiftRight
}



addEventListener('keydown', (e) => {
    switch (e.code) {
        // ! Player 1 Press
        case 'KeyD':
            player1.right = true;
            break;
        case 'KeyA':
            player1.left = true;
            break;
        case 'KeyW':
            player1.up = true;
            break;
        case 'KeyE':
            player1.attack = true;
            break;
        case 'KeyQ':
            player1.block = true;
            break;

        // ! Player 2 Press
        case 'ArrowLeft':
            player1.left = true;
            break;
        case 'ArrowRight':
            player1.right = true;
            break;
        case 'ArrowUp':
            player1.up = true;
            break;
        case 'Slash':
            player1.attack = true;
            break;
        case 'ShiftRight':
            player1.block = true;
            break;

        // ! Cycle character
        case 'ArrowDown':
            switchCharacter();
            break;

        // ! Start/end raf
        case 'Space':
            player1.attack = true;
            break;
    }
});



addEventListener('keyup', (e) => {
    switch (e.code) {

        // ! Player 1 Up
        case 'KeyD':
            player1.right = false;
            player1.control.velocity.x = 0;
            break;
        case 'KeyA':
            player1.left = false;
            player1.control.velocity.x = 0;
            break;
        case 'KeyW':
            player1.up = false;
            break;
        case 'KeyE':
            player1.attack = false;
            break;
        case 'KeyQ':
            player1.block = false;
            break;

        // ! Player 2 Up
        case 'ArrowLeft':
            player1.left = false;
            player1.control.velocity.x = 0;
            break;
        case 'ArrowRight':
            player1.right = false;
            player1.control.velocity.x = 0;
            break;
        case 'ArrowUp':
            player1.up = false;
            break;
        case 'Slash':
            player1.attack = false;
            break;
        case 'ShiftRight':
            player1.block = false;
            break;
        case 'Space':
            player1.attack = false;
            break;
    }
});