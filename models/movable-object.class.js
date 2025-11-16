class MovableObject {
    x = 0;
    y = 0;
    img;
    height = 100;
    width = 100;

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