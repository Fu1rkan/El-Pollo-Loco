class Chicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEATH = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    AUDIOS = {
        ENEMY: [],
        DEATH: []
    };

    constructor() {
        super();
        this.loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEATH);
        this.getAudios()
        this.x = 760 + Math.random() * 4000;
        this.y = 347;
        this.width = 80;
        this.height = 80;
        this.energy = 100;
        this.speed = 0.4 + Math.random() * 0.25;

        setTimeout(() => {
            this.animate();
        }, 1);
    };

    otherDirection = false;
    moveInterval;
    animationInterval;

    getAudios() {
        this.chicken_sound = new Audio('audio/normal_chicken.mp3');
        this.chicken_sound_2 = new Audio('audio/normal_chicken_2.mp3');
        this.chicken_sound_3 = new Audio('audio/normal_chicken_3.mp3');
        this.chicken_sound_4 = new Audio('audio/normal_chicken_4.mp3');
        this.chicken_sound_death = new Audio('audio/normal_chicken_death.mp3');

        this.AUDIOS.ENEMY = [
            this.chicken_sound,
            this.chicken_sound_2,
            this.chicken_sound_3,
            this.chicken_sound_4,
        ];

        this.AUDIOS.DEATH = [
            this.chicken_sound_death,
        ];

        this.AUDIOS.ENEMY.forEach((audio) => {
            audio.muted = isMuted;
        });

        this.AUDIOS.DEATH[0].muted = isMuted;

        this.AUDIOS.ENEMY.forEach((audio) => {
            allAudios.push(audio);
        });

        allAudios.push(this.AUDIOS.DEATH[0]);
    };

    animate() {
        this.moveInterval = this.createInterval(() => this.moveLeft(), 1000 / 60);
        this.animationInterval = this.createInterval(() => this.checkInteraction(), 700 - (this.speed * 1000));

        setTimeout(() => {
            let intervalId = world.character.createInterval(() => this.playChickenSound(this, intervalId), 4000)
        }, Math.random() * 3000)
    };

    playChickenSound(chicken, intervalId) {
        if (chicken.energy == 0) {
            clearInterval(intervalId);
            return;
        }
        let distance = Math.abs(world.character.x - chicken.x);
        let maxDistance = 720;
        let audio = chicken.AUDIOS.ENEMY[this.getRandomNumber()];
        if (distance >= maxDistance) {
            return;
        }
        let volume = 1 - (distance / maxDistance);
        let sound = audio.cloneNode();
        sound.volume = volume;
        sound.muted = isMuted;
        sound.play();
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 4);
    }

    checkInteraction(id) {
        if (this.energy > 0) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playLimitedAnimation(this.IMAGES_DEATH);
            clearInterval(this.moveInterval);
            clearInterval(this.animationInterval);
            setTimeout(() => {
                let index = world.level.enemies.indexOf(this);
                world.level.enemies.splice(index, 1)
            }, 1000);
        };
    };
};

class BabyChicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEATH = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    AUDIOS = {
        ENEMY: [],
        DEATH: []
    };

    constructor() {
        super();
        this.loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEATH);
        this.getAudios()
        this.x = 760 + Math.random() * 4000;
        this.y = 367;
        this.width = 60;
        this.height = 60;
        this.energy = 100;
        this.speed = 0.2 + Math.random() * 0.25;
        setTimeout(() => {
            this.animate();
        }, 1);
    };

    otherDirection = false;
    moveInterval;
    animationInterval;

    getAudios() {
        this.baby_chicken_sound = new Audio('audio/baby_chicken.mp3');
        this.baby_chicken_sound_2 = new Audio('audio/baby_chicken_2.mp3');
        this.baby_chicken_sound_death = new Audio('audio/baby_chicken_death.mp3');

        this.AUDIOS.ENEMY = [
            this.baby_chicken_sound,
            this.baby_chicken_sound_2
        ];

        this.AUDIOS.DEATH = [
            this.baby_chicken_sound_death
        ];

        this.AUDIOS.ENEMY.forEach((audio) => {
            audio.muted = isMuted;
        });

        this.AUDIOS.DEATH[0].muted = isMuted;

        this.AUDIOS.ENEMY.forEach((audio) => {
            allAudios.push(audio);
        });

        allAudios.push(this.AUDIOS.DEATH[0]);
    };

    animate() {
        this.moveInterval = this.createInterval(() => this.moveLeft(), 1000 / 60);
        this.animationInterval = this.createInterval(() => this.checkInteraction(), 500 - (this.speed * 1000));

        setTimeout(() => {
            let intervalId = world.character.createInterval(() => this.playChickenSound(this, intervalId), 4000)
        }, Math.random() * 2000)
    };


    playChickenSound(chicken, intervalId) {
        if (chicken.energy == 0) {
            clearInterval(intervalId);
            return;
        }
        let distance = Math.abs(world.character.x - chicken.x);
        let maxDistance = 720;
        let audio = chicken.AUDIOS.ENEMY[this.getRandomNumber()];
        if (distance >= maxDistance) {
            return;
        }
        let volume = 1 - (distance / maxDistance);
        let sound = audio.cloneNode();
        sound.volume = volume;
        sound.muted = isMuted;
        sound.play();
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 2);
    }

    checkInteraction() {
        if (this.energy > 0) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playLimitedAnimation(this.IMAGES_DEATH);
            clearInterval(this.moveInterval);
            clearInterval(this.animationInterval);
            let index = world.level.babyChicken.indexOf(this);
            setTimeout(() => {
                world.level.babyChicken.splice(index, 1)
            }, 1000);
        };
    };
};