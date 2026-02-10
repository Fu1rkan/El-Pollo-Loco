class Statusbar extends DrawableObject {

    STATUSBAR_BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    STATUS_HEALTH_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    STATUSBAR_COIN_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    STATUS_HEALTH_ENDBOSS_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    width = 150;
    height = 40;
    percentage = 100;

    loadStatusBar(status, value, x, y) {
        this.loadImages(status);
        this.setPercentage(value, status);
        this.y = y;
        this.x = x;
    };
};

class StatusbarHealth extends Statusbar {
    constructor() {
        super();
        this.loadStatusBar(this.STATUS_HEALTH_IMAGES, 100, 20, 5);
    };
};

class StatusBarBottle extends Statusbar {
    constructor() {
        super();
        this.loadStatusBar(this.STATUSBAR_BOTTLE_IMAGES, 0, 20, 35);
    };
};

class StatusBarCoin extends Statusbar {
    constructor() {
        super();
        this.loadStatusBar(this.STATUSBAR_COIN_IMAGES, 0, 20, 65);
    };
};

class StatusbarHealthEndboss extends Statusbar {
    constructor() {
        super();
        this.loadStatusBar(this.STATUS_HEALTH_ENDBOSS_IMAGES, 100, 550, 5);
    };
};