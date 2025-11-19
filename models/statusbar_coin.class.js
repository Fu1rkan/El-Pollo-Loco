class StatusBarCoin extends DrawableObject {
    STATUSBAR_COIN_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    width = 150;
    height = 40;
    percentage = 100;
    x = 20;
    y = 65;

    constructor() {
        super();
        this.loadCoinStatusBar();
    }


    loadCoinStatusBar() {
        this.loadImages(this.STATUSBAR_COIN_IMAGES);
        this.setPercentage(100, this.STATUSBAR_COIN_IMAGES);
    }
}