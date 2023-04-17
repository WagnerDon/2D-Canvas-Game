const swordSwing = ['audio/swordSwing.mp3', 'audio/swordSwing2.mp3'];
const hitMetal = 'audio/hitMetal.mp3';
const jump = 'audio/jump.mp3';
const punch = ['audio/punch1.mp3', 'audio/punch2.mp3', 'audio/punch3.mp3'];
const hurt = 'audio/hurt.mp3';
const theme = new Audio('audio/theme.mp3');
const foot = new Audio('audio/foot.mp3');
const coin = 'audio/coin.mp3';
const boing = 'audio/boing.mp3';
const wind = new Audio('audio/wind.mp3');
const skelfoot = new Audio('audio/skelfoot.mp3');
const endTheme = new Audio('audio/endTheme.mp3');
const click = 'audio/click.mp3';

function playAud(audio) {
    let sound = new Audio(audio);
    sound.play();
}