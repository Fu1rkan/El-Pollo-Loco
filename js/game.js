/** Initializes the game setup */
function init() {
    getElementsbyId();
    updateUI();
    bindUiResizeEvents();
    getDataFromLocalStorage();
};

/** Binds responsive UI update events */
function bindUiResizeEvents() {
    window.addEventListener('resize', updateUI);
    window.addEventListener('orientationchange', updateUI);
};

/**
 * Saves data to localStorage
 * @param {string} id - Key used for localStorage
 * @param {*} element - Value to save
 */
function setDataToLocalStorage(id, element) {
    localStorage.setItem(id, JSON.stringify(element));
};

/** Loads audio mute status from localStorage */
function getDataFromLocalStorage() {
    let value = JSON.parse(localStorage.getItem('audios'));
    isMuted = Boolean(value);
    muteSwitch = Boolean(value);
    updateMuteButtons();
};

/** Creates a new world and starts the sleeping timer */
function renderGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    startTimer();
};

/** Resets the game to homescreen state and brings back there */
function homeMenu() {
    resetGameState();
    resetHomeButtons();
    resetCanvas();
};

/** Resets the game state for the homescreen */
function resetGameState() {
    isRunning = false;
    gameStarted = false;
    keyboard.ACTIVE = true;
    clearTimeoutsAndIntervals();
    clearAudios();
    closePauseMenu();
};

/** Stops drawing and clears the canvas */
function resetCanvas() {
    if (!world) return;
    cancelAnimationFrame(world.requestAnimation);
    world.ctx.clearRect(0, 0, 720, 480);
};

/** Starts the game */
function startGame() {
    isRunning = true;
    gameStarted = true;
    setGameButtonsStarted();
    renderGame();
};

/** Restarts the game */
function restartGame() {
    resumeGame();
    clearTimeoutsAndIntervals();
    clearAudios();
    setAwayFromKeyboard(true);
    cancelAnimationFrame(world.requestAnimation);
    renderGame();
};

/** Toggles the pause state of the game */
function pauseGame() {
    if (!gameStarted) return;
    if (!isRunning) {
        resumeGame();
        return;
    };
    isRunning = false;
    openPauseMenu();
    pauseAudios();
};

/** Resumes the game */
function resumeGame() {
    isRunning = true;
    closePauseMenu();
    resumeAudios();
};

/** Clears all active intervals and timeouts */
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

/** Pauses all audios unless manual mute is active */
function pauseAudios() {
    if (!muteSwitch) {
        isMuted = true;
        allAudios.forEach((audio) => {
            audio.pause();
        });
    };
};

/** Resumes all paused audios unless manual mute is active */
function resumeAudios() {
    if (!muteSwitch) {
        isMuted = false;
        allAudios.forEach((audio) => {
            resumeAudio(audio);
        });
    };
};

/**
 * Resumes a paused audio element when it is still active
 * @param {HTMLAudioElement} audio - Audio element to resume
 */
function resumeAudio(audio) {
    if (audio.currentTime > 0 && !audio.ended) {
        audio.play();
    };
};

/** Clears all collected audios for a new game world */
function clearAudios() {
    if (!muteSwitch) {
        isMuted = false;
    };
    allAudios.forEach((element) => {
        element.pause();
    });
    allAudios = [];
};

/** Applies the current mute status to all audios */
function setMuteStatusToAudios() {
    allAudios.forEach((audio) => {
        audio.muted = isMuted;
    });
};

/** Starts the sleeping timer for the character */
function startTimer() {
    timer = world.character.createTimeout(
        () => setAwayFromKeyboard(false),
        15000
    );
};

/** Resets the sleeping timer after player input */
function resetSleepingTimer() {
    clearTimeout(timer);
    setAwayFromKeyboard(true);
    startTimer();
};

/**
 * Sets the player activity state
 * @param {boolean} isActive - true = active, false = sleeping
 */
function setAwayFromKeyboard(isActive) {
    keyboard.ACTIVE = isActive;
};
