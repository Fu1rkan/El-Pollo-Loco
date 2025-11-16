class MovableObject {
    x;
    y;
    img;
    height;
    width;

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