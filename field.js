let entities = new Array();
let players = new Array();
const characters = [knight,
    skeleton_warrior,
    skeleton_spearman];
function spawn() {
    function bot(char, team) {
        let entity = new Character(char, team);
        entities.push(entity);
    }
    player1.control = new Character(knight, '#0FFF50', { x: 100, y: 100 });
    player1.control.player = 'P1';
    player1.control.playerColor = '#FF5733 ';
    players.push(player1);
    entities.push(player1.control);
    for (let x = 0; x < canvas.width / 100 + 2; x++) {
        platforms.push(new Platform(-100 + 100 * x));
    }
}