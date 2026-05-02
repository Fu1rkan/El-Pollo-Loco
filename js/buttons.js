/** Gets all needed button elements */
function getButtonIds() {
    buttonSettings = document.getElementById('button-settings');
    respStartButton = document.getElementById('resp-start-button');
    respRestartButton = document.getElementById('resp-restart-button');
    respPauseButton = document.getElementById('resp-pause-button');
    pauseButton = document.getElementById('pause-button');
    resumeButton = document.getElementById('resume-button');
    startButton = document.getElementById('start-button');
    restartbutton = document.getElementById('restart-button');
    muteButton = document.getElementById('mute-button');
    unmuteButton = document.getElementById('unmute-button');
};

/** Binds responsive header action buttons to immediate pointer input */
function bindResponsiveActionButtons() {
    bindResponsiveActionButton(respStartButton, startGame);
    bindResponsiveActionButton(respRestartButton, restartGame);
    bindResponsiveActionButton(respPauseButton, pauseGame);
};

/**
 * Binds a responsive header button action
 * @param {HTMLButtonElement} button - Button to bind
 * @param {Function} action - Action to run on pointer input
 */
function bindResponsiveActionButton(button, action) {
    button.addEventListener('pointerdown', (event) => handleResponsiveActionButton(event, button, action));
    button.addEventListener('click', preventButtonClickFallback);
};

/**
 * Handles immediate responsive header button input
 * @param {PointerEvent} event - Pointer event
 * @param {HTMLButtonElement} button - Pressed button
 * @param {Function} action - Action to run
 */
function handleResponsiveActionButton(event, button, action) {
    if (!responsiveActionButtonIsActive(button)) return;
    event.preventDefault();
    event.stopPropagation();
    action();
};

/**
 * Checks whether a responsive action button can currently be used
 * @param {HTMLButtonElement} button - Button to check
 * @returns {boolean} - true = button can run its action
 */
function responsiveActionButtonIsActive(button) {
    return !button.disabled &&
        !button.classList.contains('d_none') &&
        !button.classList.contains('deactive_button');
};

/**
 * Prevents delayed synthetic clicks after pointer input
 * @param {MouseEvent} event - Click event
 */
function preventButtonClickFallback(event) {
    event.preventDefault();
    event.stopPropagation();
};

/** Resets all action buttons for the homescreen */
function resetHomeButtons() {
    canvasId.classList.add('background-img');
    activateButtons('finish');
    deactivateButtons('finish');
    activateRespButtons('finish');
    deactivateRespButtons('finish');
};

/** Sets all action buttons to running game state */
function setGameButtonsStarted() {
    canvasId.classList.remove('background-img');
    activateButtons('start');
    deactivateButtons('start');
    activateRespButtons('start');
    deactivateRespButtons('start');
};

/** Opens the settings menu */
function openSettings() {
    pauseButtons.classList.add('d_none');
    buttonSettings.classList.remove('d_none');
    closeSettingsbutton.classList.remove('d_none');
};

/** Closes the settings menu */
function closeSettings() {
    buttonSettings.classList.add('d_none');
    pauseButtons.classList.remove('d_none');
    closeSettingsbutton.classList.add('d_none');
};

/** Opens the pause menu */
function openPauseMenu() {
    updatePauseMenuActionButton();
    pauseMenu.classList.remove('d_none');
    pauseButtons.classList.remove('d_none');
    pauseButton.classList.add('deactive_button');
};

/** Closes the pause menu and settings menu */
function closePauseMenu() {
    pauseMenu.classList.add('d_none');
    pauseButtons.classList.add('d_none');
    closeSettingsbutton.classList.add('d_none');
    buttonSettings.classList.add('d_none');
    if (gameStarted) {
        pauseButton.classList.remove('deactive_button');
    } else {
        pauseButton.classList.remove('deactive_button');
        respPauseButton.classList.remove('deactive_button');
    };
};

/** Updates the main pause menu button for home or running game state */
function updatePauseMenuActionButton() {
    let img = resumeButton.querySelector('img');
    if (gameStarted) {
        setPauseMenuAction('resumeGame()', './img/buttons/play_button.png', 'resume', img);
        return;
    };
    setPauseMenuAction('startGameWithoutFullscreen()', './img/buttons/start_button.png', 'start', img);
};

/**
 * Sets the pause menu action button target and image
 * @param {string} action - onclick action to assign
 * @param {string} imgSrc - Image source for the button
 * @param {string} altText - Image alt text
 * @param {HTMLImageElement} img - Button image element
 */
function setPauseMenuAction(action, imgSrc, altText, img) {
    resumeButton.setAttribute("onclick", action);
    img.src = imgSrc;
    img.alt = altText;
};

/** Mutes all audios */
function mute() {
    setAudioMuteState(true);
    updateMuteButtons();
    setMuteStatusToAudios();
    setDataToLocalStorage('audios', isMuted);
};

/** Unmutes all audios */
function unmute() {
    setAudioMuteState(false);
    updateMuteButtons();
    setMuteStatusToAudios();
    setDataToLocalStorage('audios', isMuted);
};

/**
 * Sets the global audio mute state
 * @param {boolean} muted - true = muted, false = unmuted
 */
function setAudioMuteState(muted) {
    isMuted = muted;
    muteSwitch = muted;
};

/** Updates the visible mute button state */
function updateMuteButtons() {
    if (isMuted) {
        muteButton.classList.add('d_none');
        unmuteButton.classList.remove('d_none');
        return;
    };
    muteButton.classList.remove('d_none');
    unmuteButton.classList.add('d_none');
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
        startButton.disabled = false;
        startButton.setAttribute("onclick", "startGame()");
        startButton.classList.remove('deactive_button');
        pauseButton.setAttribute("onclick", "pauseGame()");
        pauseButton.classList.remove('deactive_button');
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
        activateRespStartedButtons();
    } else if (action == 'finish') {
        activateRespFinishedButtons();
    };
};

/** Activates responsive buttons for running game state */
function activateRespStartedButtons() {
    respStartButton.classList.add('d_none');
    respPauseButton.classList.remove('deactive_button');
    respRestartButton.classList.remove('d_none');
    respRestartButton.classList.remove('deactive_button');
};

/** Activates responsive buttons for homescreen or finished state */
function activateRespFinishedButtons() {
    respStartButton.disabled = false;
    respStartButton.classList.remove('d_none');
    respStartButton.classList.remove('deactive_button');
    respPauseButton.classList.remove('deactive_button');
    respRestartButton.classList.add('d_none');
};

/**
 * Deactivates responsive buttons based on game action
 * @param {string} action - start = game started, finish = game finished
 */
function deactivateRespButtons(action) {
    if (action == 'start') {
        respStartButton.classList.add('deactive_button');
    } else if (action == 'finish') {
        respRestartButton.classList.add('deactive_button');
        respRestartButton.classList.add('d_none');
    };
};
