function home() {
    document.body.innerHTML += `
    <div id="1" class="dflex-sb-ac c gap50 font">
    <h1>Sinbad From The West</h1>
    <header>
    <Button onclick="startGame(); document.querySelector('.c').remove(); playAud('${click}')">Start Game</Button>
    <Button onclick="document.getElementById(2).style.display='flex'; document.getElementById(1).style.display='none'; playAud('${click}')">Controls</Button>
    </header>
    </div>
    `;
}



function keybinds() {
    document.body.innerHTML += `
    <header class="font" id="2" style="display:none">
    <div class="dflex-sb-ac"><h3>Controls</h3><button onclick="document.getElementById(1).style.display='flex'; document.getElementById(2).style.display='none'; playAud('${click}')">☜ Back</button></div>
        <p>Press the <span>Arrow Keys</span> to navigate your character.</p>
        <p>Press the <span>Space bar</span> to use your attack and <span>Shift ⇧</span> to use your block.</p>
        </header>
        `;
}



function options() {
    document.body.innerHTML += `
        <nav id="options" class="d-none">
        <button id="op1" onclick="startStop('sound'); playAud('${click}')">♩ Mute</button>
        <button id="op2" onclick="startStop('game'); playAud('${click}')">⛣ Pause</button>
        <button id="op3" onclick="startStop('screen'); playAud('${click}')">⛶ Fullscreen</button>
        <button id="restart" class="restart d-none" onclick="location.reload()">Restart</button>
        </nav>
        `;
}


function touch(value) {
    document.getElementById(value).addEventListener('touchstart', (e) => {
        e.preventDefault();
        player1[value] = true;
    });
    document.getElementById(value).addEventListener('touchend', (e) => {
        e.preventDefault();
        player1[value] = false;
        player1.control.velocity.x = 0;
    });
}
function mobile() {
    document.body.innerHTML += `
    <div class="mobile">
    <div class="cont" id="left" style="transform: rotate(180deg)">➙</div><div class="cont" id="up" style="transform: rotate(-90deg)">➙</div><div class="cont" id="right">➙</div><div class="cont" id="attack">Attack</div><div class="cont" id="block">Block</div>
    </div>
    `;
}
home();
keybinds();
options();
mobile();
touch('left');
touch('up');
touch('right');
touch('attack');
touch('block');






// * Create canvas
const canvas = document.createElement('canvas');
const ratio = document.createElement('div');
document.body.append(ratio);
ratio.append(canvas);
ratio.style.aspectRatio = '1420/580';
ratio.style.display = 'none';
if (window.innerWidth < window.innerHeight) {
    alert('Rotate Device!');
}
canvas.width = 1420;
canvas.height = 580;
canvas.style.maxHeight = '100%';
canvas.style.maxWidth = '100%';



// * Set context to 2d, disable imageSmoothing and alpha
const c = canvas.getContext('2d', { alpha: false });
c.imageSmoothingEnabled = false;



// * Create cps display
const p = document.createElement('p');
document.body.append(p);
p.classList.add('p');



// * Function to start or to continue the game
let raf;
function start() {
    raf = requestAnimationFrame(game);
}



// * Function to pause the game
function stop() {
    cancelAnimationFrame(raf);
}



// * The game
function game() {
    world();
    start();
}



// * Function to get computations per second
let cps = 60;
function info() {
    wind.play();
    theme.play();
    setTimeout(() => {
        cps = Math.round(raf / 5);
        write(cps + ' cps');
        if (cps < 55) {
            stop();
            setInterval(() => {
                players.forEach(player => controls(player));
                entities.forEach(entity => entity.calc());
                c.clearRect(0, 0, canvas.width, canvas.height);
                bG();
                platforms.forEach(platform => platform.drawPlatform());
                entities.forEach(entity => entity.draw());
                coins.forEach(coin => coin.draw());
                gameMaster();
            }, 30)
        }
    }, 5000);
    setTimeout(() => frame = Math.round(cps / 30), 5100);
}



// * Function to write down cps
function write(text) {
    p.innerHTML = text;
}



// * Function to return a random number
function randomNumber(max) {
    return Math.floor(Math.random() * max);
}



// * Function to return an img with a path
function image(name, path) {
    let image = new Image();
    image.src = `imgs/${name}/${path}`;
    return image;
}



// * Function to cycle through all characters
let switchCharacterNumber = 1;
function switchCharacter() {
    player1.control.character = characters[switchCharacterNumber];
    switchCharacterNumber++;
    if (switchCharacterNumber > characters.length - 1) {
        switchCharacterNumber = 0;
    }
}



// * Start game
function startGame() {
    ratio.style.display = 'flex';
    document.getElementById('options').classList.remove('d-none');
    info();
    start();
    spawn();
}



// * End game
function endGame(boolean) {
    stop();
    theme.pause();
    wind.pause();
    if (boolean === true) {
        c.font = '100px Georgia'
        c.fillStyle = 'yellow';
        c.fillText('Victory!', canvas.width / 2 - 200, canvas.height / 2 + 50);
        c.font = "100px Georgia";
        c.strokeStyle = 'black';
        c.strokeText("Victory!", canvas.width / 2 - 200, canvas.height / 2 + 50);
        endTheme.play();
    } else {
        endTheme.play();
        c.font = '100px Georgia'
        c.fillStyle = 'red';
        c.fillText('Defeat!', canvas.width / 2 - 150, canvas.height / 2 + 50);
        c.font = "100px Georgia";
        c.strokeStyle = 'black';
        c.strokeText("Defeat!", canvas.width / 2 - 150, canvas.height / 2 + 50);
    }
    document.getElementById('op1').classList.add('d-none');
    document.getElementById('op2').classList.add('d-none');
    document.getElementById('op3').classList.add('d-none');
    setTimeout(() => document.getElementById('restart').classList.remove('d-none'), 5000);
}


let running = true;
let runnin = true;
let runni = true;
function startStop(val) {
    if (val === 'game') {
        if (running === true) {
            stop();
            canvas.classList.toggle('colorBorder');
            p.classList.toggle('color');
            running = false;
            wind.pause();
        } else {
            running = true;
            start();
            canvas.classList.toggle('colorBorder');
            p.classList.toggle('color');
            wind.play();
        };
    }
    if (val === 'sound' && runnin === true) {
        theme.pause();
        runnin = false;
    } else if (val === 'sound') {
        theme.play();
        runnin = true;
    }
    if (val === 'screen' && runni === true) {
        document.body.requestFullscreen();
        runni = false;
    } else if (val === 'screen') {
        document.exitFullscreen();
        runni = true;
    }
}