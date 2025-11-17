class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity(){
        setInterval(() => {
            if (this.isAboutGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboutGround(){
        return this.y < 225;
    }

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    };

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log('Moving right');
    };

    moveLeft(speed) {
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 60)
    };
}