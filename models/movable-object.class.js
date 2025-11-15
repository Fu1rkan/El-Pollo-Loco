class MovableObject {
    x = 0;
    y = 0;
    img;
    height = 50;
    width = 50;

    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(){
        console.log('Moving right');
    }

    moveLeft(){

    }
}