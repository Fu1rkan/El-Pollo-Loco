/**
 * Represents a collectible salsa bottle
 */
class Salsa extends MovableObject {

    /**
     * Creates a salsa bottle object
     * @param {string} url - Image path
     * @param {number} w - Object width
     * @param {number} h - Object height
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    constructor(url, w, h, x, y) {
        super();
        this.loadImg(url);
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
    };
};
