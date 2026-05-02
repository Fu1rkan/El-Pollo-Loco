/** Initializes the game setup */
function init() {
    getElementsbyId();
    bindResponsiveActionButtons();
    bindImmediateFooterLinks();
    updateUI();
    bindUiResizeEvents();
    bindCanvasEvents();
    preventGameContextMenus();
    preventMobilePageScroll();
    preventTextSelectionInteractions();
    getDataFromLocalStorage();
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

/**
 * Handles hover state on canvas overlay buttons
 * @param {PointerEvent} event - Pointer event on the canvas
 */
function handleCanvasPointerMove(event) {
    if (!world) return;
    world.updateEndscreenActionButtonHover(event);
};

/** Resets canvas overlay hover states */
function handleCanvasPointerLeave() {
    if (!world) return;
    world.setEndscreenActionButtonHover(false);
};

/**
 * Handles clicks on canvas overlay buttons
 * @param {PointerEvent} event - Pointer event on the canvas
 */
function handleCanvasPointerUp(event) {
    if (!world || !world.isEndscreenActionButtonHit(event)) return;
    event.preventDefault();
    if (world.gameLost) {
        restartGame();
        return;
    };
    homeMenu();
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
    requestMobileFullscreen();
    isRunning = true;
    gameStarted = true;
    setGameButtonsStarted();
    closePauseMenu();
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
    if (!gameStarted) {
        openPauseMenu();
        return;
    };
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
    requestMobileFullscreen();
    isRunning = true;
    closePauseMenu();
    resumeAudios();
};

/** Requests mobile fullscreen when the browser supports it */
function requestMobileFullscreen() {
    if (!shouldUseMobileFullscreen() || isFullscreenActive()) return;
    try {
        let root = document.documentElement;
        if (root.requestFullscreen) {
            let request = root.requestFullscreen({ navigationUI: 'hide' });
            if (request && request.catch) request.catch(() => { });
        } else if (root.webkitRequestFullscreen) {
            root.webkitRequestFullscreen();
        } else if (root.msRequestFullscreen) {
            root.msRequestFullscreen();
        };
    } catch {
        return;
    };
};

/**
 * Checks whether mobile fullscreen should be requested
 * @returns {boolean} - true = fullscreen should be requested
 */
function shouldUseMobileFullscreen() {
    return isTouchDevice() || isSmallScreen();
};

/**
 * Checks whether the page already runs in fullscreen
 * @returns {boolean} - true = fullscreen is active
 */
function isFullscreenActive() {
    return document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
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
