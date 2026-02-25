class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x;
    y;
    height;
    width;
    static intervalArr = [];
    static timeoutArr = [];

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    };

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Salsa || this instanceof BabyChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 10, this.y + 10, this.width - 20, this.height - 20);
            ctx.stroke();
        };
    };

    createInterval(func, time) {
        let id = setInterval(() => {
            if (isRunning) {
                func(id);
            }
        }, time);

        this.constructor.intervalArr.push(id);
        return id;
    }

    //übernimmt die Prozente vom Status
    setPercentage(percentage, statusItem) {
        this.percentage = percentage;
        let path = statusItem[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    };

    setPercentageOfCoins(percentage, statusItem) {
        this.percentage = percentage;
        let path = statusItem[this.checkCollectedCoins()]
        this.img = this.imageCache[path];
    };

    setPercentageOfBottles(percentage, statusItem) {
        this.percentage = percentage;
        let path = statusItem[this.checkCollectedBottles()]
        this.img = this.imageCache[path];
    };

    //checkt die Prozente vom Status
    resolveImageIndex() {
        return Math.min(5, Math.floor(this.percentage / 20));
    };

    checkCollectedCoins() {
        return Math.min(5, Math.floor(world.collectedCoins / 4));
    };

    checkCollectedBottles() {
        return Math.min(5, world.collectedBottles);
    };
};