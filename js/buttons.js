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
    };
};

/** Updates the main pause menu button for home or running game state */
function updatePauseMenuActionButton() {
    let img = resumeButton.querySelector('img');
    if (gameStarted) {
        setPauseMenuAction('resumeGame()', './img/buttons/play_button.png', 'resume', img);
        return;
    };
    setPauseMenuAction('startGame()', './img/buttons/start_button.png', 'start', img);
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
    respPauseButton.setAttribute("onclick", "pauseGame()");
    respPauseButton.classList.remove('deactive_button');
    respRestartButton.classList.remove('d_none');
    respRestartButton.setAttribute("onclick", "restartGame()");
    respRestartButton.classList.remove('deactive_button');
};

/** Activates responsive buttons for homescreen or finished state */
function activateRespFinishedButtons() {
    respStartButton.disabled = false;
    respStartButton.classList.remove('d_none');
    respStartButton.setAttribute("onclick", "startGame()");
    respStartButton.classList.remove('deactive_button');
    respPauseButton.setAttribute("onclick", "pauseGame()");
    respPauseButton.classList.remove('deactive_button');
    respRestartButton.classList.add('d_none');
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
        respRestartButton.setAttribute("onclick", "");
        respRestartButton.classList.add('deactive_button');
        respRestartButton.classList.add('d_none');
    };
};
