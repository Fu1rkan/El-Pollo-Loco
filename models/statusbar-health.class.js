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
