/**
 * Resets the game to homescreen state and bring back there
 */
function homeMenu() {
    isRunning = false;
    gameStarted = false;
    keyboard.ACTIVE = true;
    canvasId.classList.add('background-img');
    clearTimeoutsAndIntervals();
    clearAudios();
    activateButtons('finish');
    deactivateButtons('finish');
    activateRespButtons('finish');
    deactivateRespButtons('finish');
    closePauseMenu();
    cancelAnimationFrame(world.requestAnimation);
    world.ctx.clearRect(0, 0, 720, 480);
};

/**
 * Starts the game
 */
function startGame() {
    isRunning = true;
    gameStarted = true;
    canvasId.classList.remove('background-img');
    activateButtons('start');
    deactivateButtons('start');
    activateRespButtons('start');
    deactivateRespButtons('start');
    renderGame();
};

/**
 * Restarts the game
 */
function restartGame() {
    resumeGame();
    clearTimeoutsAndIntervals();
    clearAudios();
    setAwayFromKeyboard(true);
    cancelAnimationFrame(world.requestAnimation);
    renderGame();
};

/**
 * Toggles the pause state of the game
 * If game is not started -> does nothing | If paused -> resumes | If running -> pauses
 */
function pauseGame() {
    if (!isRunning) {
        if (!gameStarted) {
            return;
        };
        resumeGame();
        return;
    };
    isRunning = false;
    openPauseMenu();
    pauseAudios();
};

/**
 * Opens the settings menu
 */
function openSettings() {
    pauseButtons.classList.add('d_none');
    buttonSettings.classList.remove('d_none');
    closeSettingsbutton.classList.remove('d_none');
};

/**
 * Closes the settings menu
 */
function closeSettings() {
    buttonSettings.classList.add('d_none');
    pauseButtons.classList.remove('d_none');
    closeSettingsbutton.classList.add('d_none');
};

/**
 * Resumes the game
 */
function resumeGame() {
    isRunning = true;
    closePauseMenu();
    resumeAudios();
};

/**
 * Mutes all audios
 */
function mute() {
    isMuted = true;
    muteSwitch = true;
    muteButton.classList.add('d_none');
    unmuteButton.classList.remove('d_none');
    setMuteStatusToAudios();
    setDataToLocalStorage('audios', isMuted);
};

/**
 * Unmutes all audios
 */
function unmute() {
    isMuted = false;
    muteSwitch = false;
    muteButton.classList.remove('d_none');
    unmuteButton.classList.add('d_none');
    setMuteStatusToAudios();
    setDataToLocalStorage('audios', isMuted);
};
