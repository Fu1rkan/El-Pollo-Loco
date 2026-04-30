/**
 * Initializes the game setup
 */
function init() {
    getElementsbyId();
    updateUI();
    window.addEventListener('resize', updateUI);
    window.addEventListener('orientationchange', updateUI);
    getDataFromLocalStorage();
};

/**
 * Saves data to localStorage
 * @param {string} id - Key used for localStorage
 * @param {*} element - Value to save
 */
function setDataToLocalStorage(id, element) {
    localStorage.setItem(id, JSON.stringify(element));
};

/**
 * Loads audio mute status from localStorage
 */
function getDataFromLocalStorage() {
    let value = localStorage.getItem('audios');
    isMuted = JSON.parse(value);
    muteSwitch = JSON.parse(value);
    if (isMuted) {
        muteButton.classList.add('d_none');
        unmuteButton.classList.remove('d_none');
    };
};

/**
 * Gets all needed HTML elements
 */
function getElementsbyId() {
    getContainerIds();
    getButtonIds();
};

/**
 * Gets all needed container elements
 */
function getContainerIds() {
    rotatePhoneScreen = document.getElementById('rotate-phone-screen');
    CanvasSection = document.getElementById('section-canvas');
    header = document.getElementById('header');
    canvasId = document.getElementById('canvas');
    pauseMenu = document.getElementById('pause-menu')
    closeSettingsbutton = document.getElementById('close-settings-button');
    buttonSection = document.getElementById('section-buttons');
    respButtons = document.getElementById('resp-buttons');
    pauseButtons = document.getElementById('pause-buttons');
};

/**
 * Gets all needed button elements
 */
function getButtonIds() {
    buttonSettings = document.getElementById('button-settings');
    respStartButton = document.getElementById('resp-start-button');
    respRestartButton = document.getElementById('resp-restart-button');
    respPauseButton = document.getElementById('resp-pause-button');
    pauseButton = document.getElementById('pause-button');
    startButton = document.getElementById('start-button');
    restartbutton = document.getElementById('restart-button');
    muteButton = document.getElementById('mute-button');
    unmuteButton = document.getElementById('unmute-button');
};

/**
 * Creates a new world and starts the sleeping timer
 */
function renderGame() {
    let canvas;
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    startTimer();
};

/**
 * Updates the UI depending on device, screen size and orientation
 */
function updateUI() {
    if (isLandscape() && (isTouchDevice() || isSmallScreen())) {
        activateMobileMode();
    } else if (isTouchDevice() || isSmallScreen()) {
        activateRotateScreen();
    } else {
        activateDesktMode();
    };
};

/**
 * Clears all active intervals and timeouts
 */
function clearTimeoutsAndIntervals() {
    DrawableObject.intervalArr.forEach(i => {
        clearInterval(i);
    });
    DrawableObject.timeoutArr.forEach(i => {
        clearTimeout(i);
    });
    DrawableObject.intervalArr = [];
    DrawableObject.timeoutArr = [];
};

/**
 * Pauses all audios unless manual mute is active
 */
function pauseAudios() {
    if (!muteSwitch) {
        isMuted = true;
        allAudios.forEach((audio) => {
            audio.pause();
        });
    };
};

/**
 * Resumes all paused audios unless manual mute is active
 */
function resumeAudios() {
    if (!muteSwitch) {
        isMuted = false;
        allAudios.forEach((audio) => {
            if (audio.currentTime > 0 && !audio.ended) {
                audio.play();
            };
        });
    };
};

/**
 * Clears all collected audios for a new game world
 */
function clearAudios() {
    if (!muteSwitch) {
        isMuted = false;
    };
    allAudios.forEach((element) => {
        element.pause();
    })
    allAudios = [];
};

/**
 * Applies the current mute status to all audios
 */
function setMuteStatusToAudios() {
    allAudios.forEach((audio) => {
        audio.muted = isMuted;
    });
};

/**
 * Starts the sleeping timer for the character
 */
function startTimer() {
    timer = world.character.createTimeout(
        () => setAwayFromKeyboard(false),
        15000
    );
};

/**
 * Resets the sleeping timer after player input
 */
function resetSleepingTimer() {
    clearTimeout(timer);
    setAwayFromKeyboard(true);
    startTimer();
};

/**
 * Sets the player activity state
 * @param {boolean} boolean - true = active, false = sleeping
 */
function setAwayFromKeyboard(isActive) {
    keyboard.ACTIVE = isActive;
};

/**
 * Opens the pause menu
 */
function openPauseMenu() {
    pauseMenu.classList.remove('d_none');
    pauseButtons.classList.remove('d_none');
    pauseButton.classList.add('deactive_button');
};

/**
 * Closes the pause menu and settings menu
 */
function closePauseMenu() {
    pauseMenu.classList.add('d_none');
    pauseButtons.classList.add('d_none');
    closeSettingsbutton.classList.add('d_none');
    buttonSettings.classList.add('d_none');
    if (gameStarted) {
        pauseButton.classList.remove('deactive_button');
    };
};

/**
 * Activates mobile landscape mode
 */
function activateMobileMode() {
    CanvasSection.classList.remove('d_none');
    buttonSection.classList.remove('d_none');
    respButtons.classList.remove('d_none');
    respRestartButton.classList.remove('d_none');
    respPauseButton.classList.remove('d_none');
    rotatePhoneScreen.classList.add('d_none');
    header.style.justifyContent = '';
    header.style.justifyContent = 'space-between';
};

/**
 * Shows rotate screen for mobile portrait mode
 */
function activateRotateScreen() {
    CanvasSection.classList.add('d_none');
    buttonSection.classList.add('d_none');
    respButtons.classList.add('d_none');
    respRestartButton.classList.add('d_none');
    respPauseButton.classList.add('d_none');
    rotatePhoneScreen.classList.remove('d_none');
    header.style.justifyContent = '';
    header.style.justifyContent = 'center';
};

/**
 * Activates desktop mode
 */
function activateDesktMode() {
    CanvasSection.classList.remove('d_none');
    buttonSection.classList.remove('d_none');
    rotatePhoneScreen.classList.add('d_none');
    header.style.justifyContent = '';
    header.style.justifyContent = 'center';
};

/**
 * Activates desktop buttons based on game action
 * @param {string} action - start = game started, finish = game finished
 */
function activateButtons(action) {
    if (action == 'start') {
        pauseButton.setAttribute("onclick", "pauseGame()");
        pauseButton.classList.remove('deactive_button');
        restartbutton.setAttribute("onclick", "restartGame()");
        restartbutton.classList.remove('deactive_button');
    } else if (action == 'finish') {
        startButton.setAttribute("onclick", "startGame()");
        startButton.classList.remove('deactive_button');
    };
};

/**
 * Deactivates desktop buttons based on game action
 * @param {string} action - start = game started, finish = game finished
 */
function deactivateButtons(action) {
    if (action == 'start') {
        startButton.setAttribute("onclick", "");
        startButton.classList.add('deactive_button');
    } else if (action == 'finish') {
        pauseButton.setAttribute("onclick", "");
        pauseButton.classList.add('deactive_button');
        restartbutton.setAttribute("onclick", "");
        restartbutton.classList.add('deactive_button');
    };
};

/**
 * Activates responsive buttons based on game action
 * @param {string} action - start = game started, finish = game finished
 */
function activateRespButtons(action) {
    if (action == 'start') {
        respPauseButton.setAttribute("onclick", "pauseGame()");
        respPauseButton.classList.remove('deactive_button');
        respRestartButton.setAttribute("onclick", "restartGame()");
        respRestartButton.classList.remove('deactive_button');
    } else if (action == 'finish') {
        respStartButton.setAttribute("onclick", "startGame()");
        respStartButton.classList.remove('deactive_button');
    };
};

/**
 * Deactivates responsive buttons based on game action
 * @param {string} action - start = game started, finish = game finished
 */
function deactivateRespButtons(action) {
    if (action == 'start') {
        respStartButton.setAttribute("onclick", "");
        respStartButton.classList.add('deactive_button');
    } else if (action == 'finish') {
        respPauseButton.setAttribute("onclick", "");
        respPauseButton.classList.add('deactive_button');
        respRestartButton.setAttribute("onclick", "");
        respRestartButton.classList.add('deactive_button');
    };
};

/**
 * Checks if the device supports touch input
 * @returns {boolean} - true = touch device, false = no touch device
 */
function isTouchDevice() {
    return window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
};

/**
 * Checks if the screen is small
 * @returns {boolean} - true = small screen, false = large screen
 */
function isSmallScreen() {
    return window.innerWidth < 820;
};

/**
 * Checks if the device is in landscape mode
 * @returns {boolean} - true = landscape, false = portrait
 */
function isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
};

/**
 * Checks if any movement or action key is pressed
 * @returns {boolean} - true = key pressed, false = no key pressed
 */
function isAnyKeyPressed() {
    return keyboard.UP || keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE || keyboard.E;
};