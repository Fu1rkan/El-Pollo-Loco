/**
 * Represents a generic statusbar
 */
class Statusbar extends DrawableObject {

    /**
     * Bottle statusbar image paths
     * @type {string[]}
     */
    STATUSBAR_BOTTLE_IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Character health statusbar image paths
     * @type {string[]}
     */
    STATUS_HEALTH_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    /**
     * Coin statusbar image paths
     * @type {string[]}
     */
    STATUSBAR_COIN_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * Endboss health statusbar image paths
     * @type {string[]}
     */
    STATUS_HEALTH_ENDBOSS_IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Statusbar width
     * @type {number}
     */
    width = 150;

    /**
     * Statusbar height
     * @type {number}
     */
    height = 40;

    /**
     * Current statusbar percentage
     * @type {number}
     */
    percentage = 100;

    /**
     * Loads and positions a statusbar
     * @param {string[]} status - Statusbar image paths
     * @param {number} value - Initial percentage value
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    loadStatusBar(status, value, x, y) {
        this.loadImages(status);
        this.setPercentage(value, status);
        this.y = y;
        this.x = x;
    };
};

/**
 * Represents the character health statusbar
 */
class StatusbarHealth extends Statusbar {
    /**
     * Creates the character health statusbar
     */
    constructor() {
        super();
        this.loadStatusBar(this.STATUS_HEALTH_IMAGES, 100, 20, 5);
    };
};

/**
 * Represents the bottle statusbar
 */
class StatusBarBottle extends Statusbar {
    /**
     * Creates the bottle statusbar
     */
    constructor() {
        super();
        this.loadStatusBar(this.STATUSBAR_BOTTLE_IMAGES, 0, 20, 35);
    };
};

/**
 * Represents the coin statusbar
 */
class StatusBarCoin extends Statusbar {
    /**
     * Creates the coin statusbar
     */
    constructor() {
        super();
        this.loadStatusBar(this.STATUSBAR_COIN_IMAGES, 0, 20, 65);
    };
};

/**
 * Represents the endboss health statusbar
 */
class StatusbarHealthEndboss extends Statusbar {
    /**
     * Creates the endboss health statusbar
     */
    constructor() {
        super();
        this.loadStatusBar(this.STATUS_HEALTH_ENDBOSS_IMAGES, 100, 550, 5);
    };
};
