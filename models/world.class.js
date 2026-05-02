/** Represents the game world and manages drawing, collisions, audio and game state */
class World {
    /** @type {Character} Main playable character */
    character = new Character();

    /** @type {HTMLCanvasElement} Canvas element used to render the game */
    canvas;

    /** @type {CanvasRenderingContext2D} 2D rendering context of the canvas */
    ctx;

    /** @type {Keyboard} Keyboard input handler */
    keyboard;

    /** @type {number} Horizontal camera offset */
    cameraX = 0;

    /** @type {number} Current animation frame request id */
    requestAnimation;

    /** @type {StatusbarHealth} Health statusbar of the character */
    statusbarHealth = new StatusbarHealth();

    /** @type {StatusBarCoin} Coin statusbar */
    statusbarCoin = new StatusBarCoin();

    /** @type {StatusBarBottle} Bottle statusbar */
    statusbarBottle = new StatusBarBottle();

    /** @type {StatusbarHealthEndboss} Health statusbar of the endboss */
    statusbarHealthEndboss = new StatusbarHealthEndboss();

    /** @type {DrawableObject} Action button shown on win and lose screens */
    endscreenActionButton = new DrawableObject();

    /** @type {number} Current scale of the endscreen action button */
    endscreenActionButtonScale = 1;

    /** @type {number} Scale at the start of the current endscreen button transition */
    endscreenActionButtonStartScale = 1;

    /** @type {number} Target scale of the current endscreen button transition */
    endscreenActionButtonTargetScale = 1;

    /** @type {number} Timestamp when the current endscreen button transition started */
    endscreenActionButtonTransitionStart = Date.now();

    /** @type {number} Endscreen button transition duration in milliseconds */
    endscreenActionButtonTransitionDuration = 250;

    /** @type {Level} Current game level */
    level;

    /** @type {ThrowableObject[]} Active throwable bottles */
    throwableObject = [];

    /** @type {boolean} Indicates whether the endboss can currently take damage */
    bossCanTakeDmg = true;

    /** @type {boolean} Indicates whether the game is lost */
    gameLost = false;

    /** @type {boolean} Indicates whether the game is won */
    gameWon = false;

    /** @type {boolean} Indicates whether the game has already ended */
    gameEnded = false;

    /** @type {number} Amount of collected coins */
    collectedCoins = 0;

    /** @type {number} Amount of collected bottles */
    collectedBottles = 0;

    /** @type {boolean} Indicates whether the character jumped on an enemy */
    jumpedOnEnemy = false;

    /** @type {boolean} Indicates whether throwing bottles is on cooldown */
    throwCooldown = false;

    /** @type {HTMLAudioElement[]} Collects all world related audios */
    AUDIOS = [];

    /**
     * Creates the world, initializes the level and starts drawing and game checks
     * @param {HTMLCanvasElement} canvas - Canvas element used for rendering
     * @param {Keyboard} keyboard - Keyboard input handler
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        startLevel();
        this.level = level1;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.endscreenActionButton.loadImages([
            'img/buttons/home_button.png',
            'img/buttons/restart_button.png'
        ]);
        this.draw();
        this.setWorld();
        this.getAudios()
        this.run();
    };
};
