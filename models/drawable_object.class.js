/**
 * Represents an object that can be drawn on the canvas
 */
class DrawableObject {
    /**
     * Current image of the object
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cached images by image path
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Current image index used for animations
     * @type {number}
     */
    currentImage = 0;

    /**
     * Horizontal position
     * @type {number}
     */
    x;

    /**
     * Vertical position
     * @type {number}
     */
    y;

    /**
     * Object height
     * @type {number}
     */
    height;

    /**
     * Object width
     * @type {number}
     */
    width;

    /**
     * Current percentage value used by statusbars
     * @type {number}
     */
    percentage;

    /**
     * Collects active interval ids
     * @type {number[]}
     */
    static intervalArr = [];

    /**
     * Collects active timeout ids
     * @type {number[]}
     */
    static timeoutArr = [];

    /**
     * Loads a single image
     * @param {string} path - Image path
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    };

    /**
     * Draws the object on the canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    /**
     * Loads multiple images into the image cache
     * @param {string[]} arr - Image paths to load
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    /**
     * Draws a debug frame around selected objects
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Salsa || this instanceof BabyChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 10, this.y + 10, this.width - 20, this.height - 20);
            ctx.stroke();
        };
    };

    /**
     * Creates an interval that only runs while the game is active
     * @param {Function} func - Function to run
     * @param {number} time - Interval time in milliseconds
     * @returns {number} - Created interval id
     */
    createInterval(func, time) {
        let id = setInterval(() => {
            if (isRunning) {
                func(id);
            }
        }, time);

        this.constructor.intervalArr.push(id);
        return id;
    };
    
    /**
     * Creates a timeout that only runs while the game is active
     * @param {Function} func - Function to run
     * @param {number} time - Timeout time in milliseconds
     * @returns {number} - Created timeout id
     */
    createTimeout(func, time) {
        let id = setTimeout(() => {
            if (isRunning) {
                func(id);
            }
        }, time);
        
        this.constructor.timeoutArr.push(id);
        return id;
    };

    /**
     * Sets the statusbar image based on a percentage value
     * @param {number} percentage - Current percentage value
     * @param {string[]} statusItem - Statusbar image paths
     */
    setPercentage(percentage, statusItem) {
        this.percentage = percentage;
        let path = statusItem[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    };

    /**
     * Sets the coin statusbar image based on collected coins
     * @param {number} percentage - Current coin value
     * @param {string[]} statusItem - Coin statusbar image paths
     */
    setPercentageOfCoins(percentage, statusItem) {
        this.percentage = percentage;
        let path = statusItem[this.checkCollectedCoins()]
        this.img = this.imageCache[path];
    };

    /**
     * Sets the bottle statusbar image based on collected bottles
     * @param {number} percentage - Current bottle value
     * @param {string[]} statusItem - Bottle statusbar image paths
     */
    setPercentageOfBottles(percentage, statusItem) {
        this.percentage = percentage;
        let path = statusItem[this.checkCollectedBottles()]
        this.img = this.imageCache[path];
    };

    /**
     * Resolves the image index for a percentage based statusbar
     * @returns {number} - Image index between 0 and 5
     */
    resolveImageIndex() {
        return Math.min(5, Math.floor(this.percentage / 20));
    };

    /**
     * Resolves the coin statusbar image index
     * @returns {number} - Image index between 0 and 5
     */
    checkCollectedCoins() {
        return Math.min(5, Math.floor(world.collectedCoins / 4));
    };

    /**
     * Resolves the bottle statusbar image index
     * @returns {number} - Image index between 0 and 5
     */
    checkCollectedBottles() {
        return Math.min(5, world.collectedBottles);
    };
};
