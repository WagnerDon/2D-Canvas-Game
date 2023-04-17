const knight = {
    moves: {
        attack: [image('knight', 'a1.png'),
        image('knight', 'a2.png'),
        image('knight', 'a3.png')],
        dead: image('knight', 'dead.png'),
        defend: image('knight', 'defend.png'),
        hurt: image('knight', 'hurt.png'),
        idle: image('knight', 'idle.png'),
        jump: image('knight', 'jump.png'),
        protect: image('knight', 'protect.png'),
        move: image('knight', 'run.png'),
        motionAttack: image('knight', 'run+attack.png'),
    },
    info: {
        stats: {
            agility: 8,
            health: 10,
            damage: 5
        },
        hitbox: 3,
        mirror: 1
    }
}
const skeleton_warrior = {
    moves: {
        attack: [image('skeleton_warrior', 'a1.png'),
        image('skeleton_warrior', 'a2.png'),
        image('skeleton_warrior', 'a3.png')],
        dead: image('skeleton_warrior', 'dead.png'),
        hurt: image('skeleton_warrior', 'hurt.png'),
        idle: image('skeleton_warrior', 'idle.png'),
        protect: image('skeleton_warrior', 'protect.png'),
        move: image('skeleton_warrior', 'run.png'),
        motionAttack: image('skeleton_warrior', 'run+attack.png'),
    },
    info: {
        stats: {
            agility: 7,
            health: 50,
            damage: 3
        },
        hitbox: 1.625,
        mirror: 1.875
    }
}
const skeleton_spearman = {
    moves: {
        attack: [image('skeleton_spearman', 'a1.png'),
        image('skeleton_spearman', 'a2.png')],
        dead: image('skeleton_spearman', 'dead.png'),
        hurt: image('skeleton_spearman', 'hurt.png'),
        idle: image('skeleton_spearman', 'idle.png'),
        protect: image('skeleton_spearman', 'protect.png'),
        move: image('skeleton_spearman', 'run.png'),
        motionAttack: image('skeleton_spearman', 'run+attack.png'),
    },
    info: {
        stats: {
            agility: 4,
            health: 12,
            damage: 2
        },
        hitbox: 1.625,
        mirror: 1.875
    }
}
const background = {
    mountain: image('background/static', 'mountain.png'),
    sky: image('background/static', 'sky.png'),
    land1: image('background/dynamic', 'land1.png'),
    land2: image('background/dynamic', 'land2.png'),
    clouds: image('background/dynamic', 'clouds.png'),
    wall: image('background/static', 'wall.png'),
}