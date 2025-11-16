class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Clouds(),
        new Clouds(),
    ];
    background = new Background();
    mountain = new Mountains();
    mountainSecondLayer = new MountainsSecondLayer();
    mountainThirdLayer = new MountainsThirdLayer();
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.background.img, this.background.x, this.background.y, this.background.width, this.background.height);

        this.ctx.drawImage(this.mountainThirdLayer.img, this.mountainThirdLayer.x, this.mountainThirdLayer.y, this.mountainThirdLayer.width, this.mountainThirdLayer.height);

        this.ctx.drawImage(this.mountainSecondLayer.img, this.mountainSecondLayer.x, this.mountainSecondLayer.y, this.mountainSecondLayer.width, this.mountainSecondLayer.height);
        
        this.ctx.drawImage(this.mountain.img, this.mountain.x, this.mountain.y, this.mountain.width, this.mountain.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });

        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height)
        })

        let self = this;
        requestAnimationFrame(function (){
            self.draw();
        });
    }
}