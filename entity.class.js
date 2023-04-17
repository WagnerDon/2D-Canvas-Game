class Entity {
    constructor(location, measure) {
        this.location = location;
        this.measure = measure;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.face = "forward";
        this.animation = {
            sprite: 1,
            computation: 0,
            progression: 'finished'
        };
    }
    draw() {
        if (this.team !== 'yellow') {
            this.healthBar();
            this.drawSprite();
            this.actionState();
            this.endFrameAndOrigin();
            this.animate();
        } else {
            this.drawCoin();
        }
    }
    calc() {
        this.htb();
        this.ai();
        this.gravity();
        this.collision();
        this.checkDead();
        this.fixPos();
        this.colCoin();
        this.XY();
    }
    drawCoin() {
        c.drawImage(this.img, this.location.x, this.location.y, this.measure.width, this.measure.height);
        c.stroke();
    }
    colCoin() {
        if (this.player) {
            coins.forEach(coi => {
                if (this.hitbox.x + this.hitbox.width / 2 > coi.location.x && this.hitbox.y + this.hitbox.height / 2 > coi.location.y
                    && this.hitbox.x + this.hitbox.width / 2 < coi.location.x + coi.measure.width && this.hitbox.y + this.hitbox.height / 2 < coi.location.y + coi.measure.height) {
                    playAud(coin);
                    const del = coins.indexOf(coi);
                    coins.splice(del, 1);
                    this.collect++;
                }
            });
        }
    }
    translate(val) {
        entities.forEach(entity => {
            if (!entity.player) {
                entity.location.x += val;
            }
        });
        coins.forEach(entity => {
            entity.location.x += val;
        });
    }
    fixPos() {
        if (this.player) {
            if (this.location.x > canvas.width / 2) {
                this.location.x = canvas.width / 2;
                land1 -= 0.3;
                land12 -= 0.3;
                land13 -= 0.3;
                land2 -= 0.1;
                land22 -= 0.1;
                land23 -= 0.1;
                platforms.forEach(platform => platform.location.x -= this.character.info.stats.agility);
                this.translate(-this.character.info.stats.agility);
            } else if (this.location.x < canvas.width / 2 - this.measure.width) {
                this.location.x = canvas.width / 2 - this.measure.width;
                this.translate(this.character.info.stats.agility);
                land1 += 0.3;
                land12 += 0.3;
                land13 += 0.3;
                land2 += 0.1;
                land22 += 0.1;
                land23 += 0.1;
                platforms.forEach(platform => platform.location.x += this.character.info.stats.agility);
            }
        }
    }
    checkDead() {
        if (this.health < 1) {
            if (this.action !== 'dieing') {
                player1.control.kills++;
            }
            this.animation.progression = 'finished';
            this.action = 'dieing';
            this.health = 0;
            if (this.character === skeleton_warrior) {
                setTimeout(() => endGame(true), 2000);
            } else if (this.character === knight) {
                setTimeout(() => endGame(false), 2000);
            }
        }
    }
    attack() {
        if (this.action === 'attacking') {
            playAud(swordSwing[randomNumber(2)]);
            let reach;
            if (this.velocity.x > 0) {
                reach = 75;
            } else {
                reach = 100;
            }
            entities.forEach(entity => {
                if (this.team !== entity.team && entity.health !== 0) {
                    if (this.face === 'forward') {
                        if (entity.hitbox.x > this.hitbox.x + this.hitbox.width &&
                            entity.hitbox.x < this.hitbox.x + this.hitbox.width + reach &&
                            this.hitbox.y < entity.hitbox.y + entity.hitbox.height / 2) {
                            if (entity.action === 'blocking') {
                                playAud(hitMetal);
                                entity.newAnimation('defending');
                            } else if (this.action !== 'hurting') {
                                playAud(punch[randomNumber(3)]);
                                if (entity.player) {
                                    playAud(hurt);
                                }
                                entity.newAnimation('hurting');
                                entity.health -= this.character.info.stats.damage;
                            }
                        }
                    } else {
                        if (entity.hitbox.x < this.hitbox.x &&
                            entity.hitbox.x + entity.hitbox.width > this.hitbox.x - reach &&
                            this.hitbox.y < entity.hitbox.y + entity.hitbox.height / 2) {
                            if (entity.action === 'blocking') {
                                playAud(hitMetal);
                                entity.newAnimation('defending');
                            } else if (this.action !== 'hurting') {
                                playAud(punch[randomNumber(3)]);
                                if (entity.player) {
                                    playAud(hurt);
                                }
                                entity.newAnimation('hurting');
                                entity.health -= this.character.info.stats.damage;
                            }
                        }
                    }
                }
            });
        }
    }
    healthBar() {
        if (this.player) {
            c.drawImage(image('coin', 'facek.png'), 34, 20, 30, 30);
            c.fillStyle = this.team;
            c.fillRect(75, 23, 100 / this.character.info.stats.health * this.health, 25);
            c.strokeStyle = 'white';
            c.beginPath();
            c.roundRect(75, 23, 100, 25);
            c.stroke();
            c.drawImage(image('coin', 'coin.png'), 25, 50, 50, 50);
            c.fillStyle = 'black';
            c.font = '25px Georgia';
            c.fillText(this.collect, 75, 80);
            c.drawImage(image('coin', 'skull.png'), 23, 100, 50, 40);
            c.font = '25px Georgia';
            c.fillText(this.kills, 75, 130);
        } else if (this.character === skeleton_warrior) {
            c.drawImage(image('coin', 'faces.png'), canvas.width - 25 - 100 - 30 - 10, 20, 30, 30);
            c.fillStyle = this.team;
            c.fillRect(canvas.width - 25 - 100, 23, 100 / this.character.info.stats.health * this.health, 25);
            c.strokeStyle = 'white';
            c.beginPath();
            c.roundRect(canvas.width - 25 - 100, 23, 100, 25);
            c.stroke();
        } else {
            c.fillStyle = this.team;
            c.fillRect(this.hitbox.x, this.location.y - 20, this.hitbox.width / this.character.info.stats.health * this.health, 5);
            c.strokeStyle = 'white';
            c.beginPath();
            c.roundRect(this.hitbox.x, this.location.y - 20, this.hitbox.width, 5);
            c.stroke();
        }
    }
    htb() {
        this.hitbox = {
            x: this.location.x + this.measure.width / this.character.info.hitbox,
            y: this.location.y,
            width: this.measure.width / this.character.info.hitbox,
            height: this.measure.height
        };
    }
    gravity() {
        if (this.location.y === canvas.height - this.measure.height - 50) {
            return;
        } else if (this.location.y < canvas.height - this.measure.height - 50) {
            this.velocity.y += (this.measure.width + this.measure.height) / 125;
        } else if (this.location.y > canvas.height - this.measure.height - 50) {
            this.location.y = canvas.height - this.measure.height - 50;
            this.velocity.y = 0;
        }
    }
    newAnimation(action) {
        this.animation.progression = 'finished';
        this.spriteInfo.sx = 0;
        this.action = action;
    }
    collision() {
        entities.forEach(entity => {
            if (this.team !== entity.team) {
                if (this.hitbox.x + this.hitbox.width > entity.hitbox.x && this.hitbox.x + this.hitbox.width <
                    entity.hitbox.x + entity.hitbox.width || this.hitbox.x < entity.hitbox.x &&
                    this.hitbox.x + this.hitbox.width > entity.hitbox.x + entity.hitbox.width) {
                    if (entity.team === 'yellow') {
                        let ent = entities.indexOf(entity);
                        entities.splice(ent, 1);
                        playAud(coin);
                    }
                    else if (this.hitbox.y + this.hitbox.height >
                        entity.hitbox.y + entity.hitbox.height / 2) {
                        if (this.velocity.x > 0) {
                            this.velocity.x = 0;
                        }
                    } else if (this.hitbox.y + this.hitbox.height < entity.hitbox.y + entity.hitbox.height / 2 &&
                        this.hitbox.y + this.hitbox.height > entity.hitbox.y) {
                        if (this.falling === true && entity.health !== 0) {
                            this.velocity.y = -10;
                            entity.newAnimation('hurting');
                            playAud(boing);
                            entity.health -= 1;
                            entity.checkDead();
                        }
                    }
                }
                else if (this.hitbox.x < entity.hitbox.x + entity.hitbox.width &&
                    this.hitbox.x > entity.hitbox.x || entity.hitbox.x < this.hitbox.x &&
                    entity.hitbox.x + entity.hitbox.width > this.hitbox.x + this.hitbox.width) {
                    if (entity.team === 'yellow') {
                        let ent = entities.indexOf(entity);
                        entities.splice(ent, 1);
                        playAud(coin);
                    }
                    else if (this.hitbox.y + this.hitbox.height >
                        entity.hitbox.y + entity.hitbox.height / 2) {
                        if (this.velocity.x < 0) {
                            this.velocity.x = 0;
                        }
                    } else if (entity.hitbox.y > this.hitbox.y + this.hitbox.height / 2 &&
                        entity.hitbox.y < this.hitbox.y + this.hitbox.height) {
                        if (this.falling === true && entity.health !== 0) {
                            this.velocity.y = -10;
                            entity.newAnimation('hurting');
                            playAud(boing);
                            entity.health -= 1;
                            entity.checkDead();
                        }
                    }
                }
            }

        });
    }
    XY() {
        if (this.locked === true) {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
        this.location.x += this.velocity.x
        this.location.y += this.velocity.y;
        if (this.velocity.x > 0) {
            this.face = 'forward';
            if (player1.control !== this) {
                skelfoot.play();
            }
        } else if (this.velocity.x < 0) {
            this.face = 'backward';
            if (player1.control !== this) {
                skelfoot.play();
            }
        }
        if (this.velocity.y > 0) {
            this.falling = true;
        } else if (this.velocity.y < 0) {
            this.falling = false;
        }
    }
    actionState() {
        if (this.velocity.y === 0) {
            if (this.action === null) {
                if (this.velocity.x === 0) {
                    this.switchAnimation('idle');
                } else {
                    this.switchAnimation('move');
                }
            } else if (this.animation.progression === 'finished') {
                if (this.action === 'attacking') {
                    if (this.velocity.x === 0) {
                        this.switchAnimation('attack');
                    } else {
                        this.switchAnimation('motionAttack');
                    }
                } else if (this.action === 'blocking') {
                    this.switchAnimation('protect');
                } else if (this.action === 'defending') {
                    this.switchAnimation('defend');
                } else if (this.action === 'hurting') {
                    this.switchAnimation('hurt');
                } else if (this.action === 'dieing') {
                    this.switchAnimation('dead');
                }
            }
        } else {
            this.switchAnimation('jump');
        }
    }
    fullAnimation = ['attack', 'motionAttack', 'defend', 'block', 'protect', 'hurt', 'dead'];
    locking = ['attack', 'protect', 'dead', 'hurt'];
    switchAnimation(ability) {
        if (this.character.moves[ability]) {
            if (this.character.moves[ability].constructor.name === 'HTMLImageElement') {
                this.img = this.character.moves[ability];
            } else {
                this.img = this.character.moves[ability][randomNumber(this.character.moves[ability].length)];
            }
            if (this.fullAnimation.includes(ability)) {
                this.animation.progression = 'progressing';
            }
            if (this.locking.includes(ability)) {
                this.locked = true;
            }
        }
    }
    endFrameAndOrigin() {
        if (this.img !== this.animation.origin) {
            this.animation.origin = this.img;
            this.animation.computation = 0;
            this.animation.sprite = 1;
            this.spriteInfo.sx = 0;
        } else if (this.endFrame === true) {
            this.spriteInfo.sx = 0;
            this.endFrame = false;
        }
    }
    animate() {
        this.animation.computation++;
        if (this.animation.computation >
            30 / (this.img.width / this.spriteInfo.sw) / 2) {
            this.animation.sprite++;
            this.spriteInfo.sx += this.spriteInfo.sw;
            this.animation.computation = 0;
            if (this.action === 'attacking' && this.animation.sprite === this.img.width / this.spriteInfo.sw) {
                this.attack();
            }
            if (this.animation.sprite > this.img.width / this.spriteInfo.sw) {
                if (this.action === 'dieing') {
                    let dead = entities.indexOf(this);
                    entities.splice(dead, 1);
                }
                this.spriteInfo.sx -= this.spriteInfo.sw;
                this.endFrame = true;
                this.action = null;
                this.locked = false;
                this.animation.sprite = 1;
                this.animation.progression = 'finished';
            }
        }
    }
    drawSprite() {
        if (this.face === 'forward') {
            c.drawImage(
                this.img, this.spriteInfo.sx,
                this.img.height / this.spriteInfo.sy,
                this.img.width / (this.img.width / this.spriteInfo.sw),
                this.img.height,
                this.location.x,
                this.location.y - this.img.height / this.spriteInfo.y,
                this.measure.width + this.spriteInfo.width,
                this.measure.height * this.spriteInfo.height);
        } else {
            c.save();
            c.scale(-1, 1);
            c.drawImage(
                this.img, this.spriteInfo.sx,
                this.img.height / this.spriteInfo.sy,
                this.img.width / (this.img.width / this.spriteInfo.sw) - 1,
                this.img.height,
                -this.location.x - (this.measure.width * this.character.info.mirror),
                this.location.y - (this.img.height / this.spriteInfo.y),
                this.measure.width + this.spriteInfo.width,
                this.measure.height * this.spriteInfo.height);
            c.restore();
        }
    }
    playerJump() {
        if (this.location.y === canvas.height - this.measure.height - 50 && this.action !== 'blocking' && this.action !== 'attacking') {
            playAud(jump);
            this.velocity.y = -this.character.info.stats.agility * 3;
        }
    }
    playerMotionX(Key1, Key2) {
        if (this.velocity.x !== 0 && this.velocity.y === 0) {
            foot.play();
        }
        if (Key1 === true && Key2 === true) {
            return;
        } else {
            if (Key1 === true) {
                this.velocity.x = this.character.info.stats.agility;
            } else {
                this.velocity.x = -this.character.info.stats.agility;
            }
        }
    }
    ai() {
        if (player1.control !== this && player2.control !== this) {
            this.botatt++;
            if (player1.control.hitbox.x + player1.control.hitbox.width + 10 < this.hitbox.x) {
                this.velocity.x = -this.character.info.stats.agility;
            } else if (player1.control.hitbox.x - 10 > this.hitbox.x + this.hitbox.width) {
                this.velocity.x = this.character.info.stats.agility;
            } else {
                this.velocity.x = 0;
                if (this.botatt > 45 && this.action !== 'hurting') {
                    this.action = 'attacking';
                    setTimeout(() => this.attack(), 250);
                    this.botatt = 0;
                }
            }
        }
    }
}