class Character extends Entity {
    constructor(character, team, location) {
        super();
        this.collect = 0;
        this.kills = 0;
        this.team = team;
        this.character = character;
        this.measure = { width: 128, height: 128 };
        this.location = location;
        this.img = this.character.moves.idle;
        this.health = this.character.info.stats.health;
        this.spriteInfo = {
            sx: 0,
            sy: 4,
            sw: 128,
            y: 2,
            width: 128,
            height: 2
        };
        this.hitbox = {
            x: this.location.x + this.measure.width / this.character.hitbox,
            y: this.location.y,
            width: this.measure.width / this.character.hitbox,
            height: this.measure.height
        };
        this.botatt = 0;
    }
}