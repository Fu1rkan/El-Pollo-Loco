/**
 * Holds the canvas element used to render the game
 * @type {HTMLCanvasElement} (default: undefined)
 */
let canvas;

/**
 * Holds the keyboard input handler
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Holds the current game world
 * @type {World} (default: undefined)
 */
let world;

/**
 * Timer to activate sleeping mode for the character
 * @type {number} (default: undefined)
 */
let timer;

/**
 * Indicates whether the game is running
 * @type {boolean} (default: false) - true = running, false = paused or homescreen
 */
let isRunning = false;

/**
 * Indicates whether the game is running or on the homescreen
 * @type {boolean} (default: false) - true = running, false = homescreen
 */
let gameStarted = false;

/**
 * Collects all audios
 * @type {HTMLAudioElement[]} (default: [])
 */
let allAudios = [];

/**
 * Indicates whether all audios are muted
 * @type {boolean} (default: false) - true = muted, false = not muted
 */
let isMuted = false;

/**
 * Holds the state of the mute switch button.
 * @type {boolean} - true = muted, false = not muted
 */
let muteSwitch = false;

/** 
 * Holds the canvas section element
 * @type {HTMLElement} (default: undefined)
 */
let CanvasSection;

/** 
 * Holds the button section element
 * @type {HTMLElement} (default: undefined)
 */
let buttonSection;

/** 
 * Holds the rotate phone screen element
 * @type {HTMLElement} (default: undefined)
 */
let rotatePhoneScreen;

/** 
 * Holds the responsive buttons container
 * @type {HTMLElement} (default: undefined)
 */
let respButtons;

/** 
 * Holds the responsive restart button
 * @type {HTMLElement} (default: undefined)
 */
let respRestartButton;

/** 
 * Holds the responsive pause button
 * @type {HTMLElement} (default: undefined)
 */
let respPauseButton;

/** 
 * Holds the header element
 * @type {HTMLElement} (default: undefined)
 */
let header;

/**
 * Holds the canvas element
 * @type {HTMLCanvasElement} (default: undefined)
 */
let canvasId;

/**
 * Holds the pause menu element
 * @type {HTMLElement} (default: undefined)
 */
let pauseMenu;

/**
 * Holds the close settings button
 * @type {HTMLElement} (default: undefined)
 */
let closeSettingsbutton;

/**
 * Holds the pause buttons container
 * @type {HTMLElement} (default: undefined)
 */
let pauseButtons;

/**
 * Holds the settings button container
 * @type {HTMLElement} (default: undefined)
 */
let buttonSettings;

/**
 * Holds the pause button
 * @type {HTMLElement} (default: undefined)
 */
let pauseButton;

/**
 * Holds the start button
 * @type {HTMLElement} (default: undefined)
 */
let startButton;

/**
 * Holds the restart button
 * @type {HTMLElement} (default: undefined)
 */
let restartbutton;

/**
 * Holds the mute button
 * @type {HTMLElement} (default: undefined)
 */
let muteButton;

/**
 * Holds the unmute button
 * @type {HTMLElement} (default: undefined)
 */
let unmuteButton;
