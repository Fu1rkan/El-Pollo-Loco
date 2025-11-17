class World {
    character = new Character(25, 225, 100, 200);

    enemies = level1.enemies;
    clouds = level1.clouds;
    background = level1.background;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    };

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);
        
        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.cameraX, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(object) {
        object.forEach(o => {
            this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
        });
    }

    addToMap(object) {
        if (object.otherDirection) {
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.x = object.x * -1
        }
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if (object.otherDirection) {
            object.x = object.x * -1
            this.ctx.restore();
        }
        };
    }