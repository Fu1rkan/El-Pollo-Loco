/**
 * Represents a moving cloud object
 */
class Clouds extends MovableObject {

    /**
     * Creates a cloud object
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
        this.x = x
        this.y = y;
        this.animate();
        this.speed = 0.1;
    };


    /**
     * Starts the cloud movement animation
     */
    animate() {
        this.createInterval(() => this.moveLeft(), 1000 / 60)
    };
};
