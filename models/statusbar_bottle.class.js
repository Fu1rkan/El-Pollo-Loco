class StatusBarBottle extends DrawableObject {
    STATUSBAR_BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    width = 150;
    height = 40;
    percentage = 100;
    x = 20;
    y = 35;

    constructor() {
        super();
        this.loadBottleStatusBar();
    }

    loadBottleStatusBar(){
        this.loadImages(this.STATUSBAR_BOTTLE_IMAGES);
        this.setPercentage(100, this.STATUSBAR_BOTTLE_IMAGES);
    }
}