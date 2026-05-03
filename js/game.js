/** Initializes the game setup */
function init() {
    getElementsbyId();
    bindActionButtons();
    bindImmediateFooterLinks();
    bindUiResizeEvents();
    bindCanvasEvents();
    preventGameContextMenus();
    preventMobilePageScroll();
    preventTextSelectionInteractions();
    getDataFromLocalStorage();
    resetHomeButtons();
    updateUI();
};

/** Binds responsive UI update events */
function bindUiResizeEvents() {
    window.addEventListener('resize', updateUI);
    window.addEventListener('orientationchange', updateUI);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateUI);
    };
};

/** Binds canvas interaction events */
function bindCanvasEvents() {
    canvasId.addEventListener('pointermove', handleCanvasPointerMove);
    canvasId.addEventListener('pointerleave', handleCanvasPointerLeave);
    canvasId.addEventListener('pointerup', handleCanvasPointerUp);
};

/** Binds footer links to immediate pointer input on mobile */
function bindImmediateFooterLinks() {
    document.querySelectorAll('footer a').forEach((link) => {
        link.addEventListener('pointerdown', handleImmediateFooterLink);
        link.addEventListener('click', preventDefaultBrowserInteraction);
    });
};

/**
 * Opens a footer link immediately on pointer input
 * @param {PointerEvent} event - Pointer event
 */
function handleImmediateFooterLink(event) {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = event.currentTarget.href;
};

/** Prevents browser context menus and image dragging on game controls */
function preventGameContextMenus() {
    document.querySelectorAll('button, button img, canvas').forEach((element) => {
        element.addEventListener('contextmenu', preventDefaultBrowserInteraction);
        element.addEventListener('dragstart', preventDefaultBrowserInteraction);
        element.addEventListener('dblclick', preventDefaultBrowserInteraction);
    });
};

/** Prevents mobile pull-to-refresh and page dragging while playing */
function preventMobilePageScroll() {
    document.addEventListener('touchmove', preventDefaultBrowserInteraction, { passive: false });
};

/** Prevents mobile text search, loupe and selection menus on repeated taps */
function preventTextSelectionInteractions() {
    document.addEventListener('selectstart', preventDefaultBrowserInteraction);
    document.addEventListener('selectionchange', clearTextSelection);
    document.addEventListener('gesturestart', preventDefaultBrowserInteraction);
};

/** Clears accidental text selections created by mobile browsers */
function clearTextSelection() {
    let selection = window.getSelection();
    if (selection) selection.removeAllRanges();
};

/**
 * Prevents default browser interactions that interrupt gameplay controls
 * @param {Event} event - Browser interaction event
 */
function preventDefaultBrowserInteraction(event) {
    event.preventDefault();
};

/** Keeps canvas pointer movement free of menu actions */
function handleCanvasPointerMove(event) {
    return;
};

/** Keeps canvas pointer leave free of menu actions */
function handleCanvasPointerLeave() {
    return;
};

/** Keeps canvas taps free of endscreen action buttons */
function handleCanvasPointerUp(event) {
    return;
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
    startGameWithoutFullscreen();
};

/** Starts the game without requesting fullscreen */
function startGameWithoutFullscreen() {
    isRunning = true;
    gameStarted = true;
    closePauseMenu();
    setGameButtonsStarted();
    renderGame();
};

/** Restarts the game */
function restartGame() {
    isRunning = true;
    gameStarted = true;
    closePauseMenu();
    setGameButtonsStarted();
    clearTimeoutsAndIntervals();
    clearAudios();
    setAwayFromKeyboard(true);
    if (world) cancelAnimationFrame(world.requestAnimation);
    renderGame();
};

/** Toggles the pause state of the game */
function pauseGame() {
    if (isSettingsMenuOpen()) {
        closeSettings();
        return;
    };
    if (!gameStarted || gameIsFinished()) return;
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
    if (!gameStarted || gameIsFinished()) return;
    isRunning = true;
    closePauseMenu();
    setGameButtonsStarted();
    resumeAudios();
};

/**
 * Checks whether the settings menu is currently visible
 * @returns {boolean} - true = settings are open
 */
function isSettingsMenuOpen() {
    return buttonSettings && !buttonSettings.classList.contains('d_none');
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
            pauseAudio(audio);
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
    if (audio.isPooledSound) return;
    if (audio.currentTime > 0 && !audio.ended) {
        playAudio(audio);
    };
};

/** Clears all collected audios for a new game world */
function clearAudios() {
    if (!muteSwitch) {
        isMuted = false;
    };
    allAudios.forEach((element) => {
        stopAudio(element);
    });
    allAudios = [];
    resetAudioPools();
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
    if (!gameStarted || !world || !world.character) return;
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
