class StatusbarHealth extends DrawableObject{

    STATUS_HEALTH_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    width = 150;
    height = 40;
    percentage = 100;
    x = 20;
    y = 5;

    constructor() {
        super();
        this.loadHealthStatusBar();
    }

    loadHealthStatusBar(){
        this.loadImages(this.STATUS_HEALTH_IMAGES);
        this.setPercentage(100, this.STATUS_HEALTH_IMAGES);
    }
}