/** Gets all needed button elements */
function getButtonIds() {
    buttonSettings = document.getElementById('button-settings');
    pauseButton = document.getElementById('pause-button');
    startButton = document.getElementById('start-button');
    restartbutton = document.getElementById('restart-button');
    homeButton = document.getElementById('home-button');
    settingsButton = document.getElementById('settings-button');
    muteButton = document.getElementById('mute-button');
    unmuteButton = document.getElementById('unmute-button');
};

/** Binds all menu action buttons to immediate pointer input */
function bindActionButtons() {
    bindActionButton(startButton, startGame);
    bindActionButton(restartbutton, restartGame);
    bindActionButton(homeButton, homeMenu);
    bindActionButton(settingsButton, openSettings);
    bindActionButton(muteButton, mute);
    bindActionButton(unmuteButton, unmute);
    bindActionButton(pauseButton, pauseGame);
    bindActionButton(closeSettingsbutton, closeSettings);
};

/**
 * Binds a menu action button
 * @param {HTMLButtonElement} button - Button to bind
 * @param {Function} action - Action to run
 */
function bindActionButton(button, action) {
    if (!button) return;
    button.addEventListener('pointerdown', (event) => handleActionButton(event, button, action));
    button.addEventListener('click', preventButtonClickFallback);
};

/**
 * Handles immediate button input
 * @param {PointerEvent} event - Pointer event
 * @param {HTMLButtonElement} button - Pressed button
 * @param {Function} action - Action to run
 */
function handleActionButton(event, button, action) {
    if (!actionButtonIsActive(button)) return;
    event.preventDefault();
    event.stopPropagation();
    action();
};

/**
 * Checks whether an action button can currently be used
 * @param {HTMLButtonElement} button - Button to check
 * @returns {boolean} - true = button can run its action
 */
function actionButtonIsActive(button) {
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
    if (canvasId) canvasId.classList.add('background-img');
    closePauseMenu();
    setActionButtonState('home');
};

/** Sets all action buttons to running game state */
function setGameButtonsStarted() {
    if (canvasId) canvasId.classList.remove('background-img');
    setActionButtonState('running');
};

/** Sets all action buttons to finished game state */
function setGameButtonsFinished() {
    setActionButtonState('ended');
};

/** Opens the settings menu */
function openSettings() {
    if (gameStarted && isRunning && !gameIsFinished()) {
        isRunning = false;
        pauseAudios();
    };
    pauseMenu.classList.remove('d_none');
    buttonSettings.classList.remove('d_none');
    closeSettingsbutton.classList.remove('d_none');
    setActionButtonState('settings');
};

/** Closes the settings menu */
function closeSettings() {
    hideSettingsMenu();
    if (gameStarted && !gameIsFinished()) {
        resumeGame();
        return;
    };
    closePauseMenu();
    setActionButtonState(gameStarted ? 'ended' : 'home');
};

/** Opens the pause overlay without canvas buttons */
function openPauseMenu() {
    hideSettingsMenu();
    pauseMenu.classList.remove('d_none');
    setActionButtonState('paused');
};

/** Closes the pause and settings overlays */
function closePauseMenu() {
    if (pauseMenu) pauseMenu.classList.add('d_none');
    hideSettingsMenu();
};

/** Hides only the settings table and close button */
function hideSettingsMenu() {
    if (buttonSettings) buttonSettings.classList.add('d_none');
    if (closeSettingsbutton) closeSettingsbutton.classList.add('d_none');
};

/**
 * Sets the visible action buttons for a game state
 * @param {string} state - home, running, paused, settings or ended
 */
function setActionButtonState(state) {
    setActionButtonStateAttribute(state);
    hidePrimaryActionButtons();
    getButtonsForActionState(state).forEach(showButton);
    updatePauseButtonImage(state == 'paused' || state == 'settings');
    updateEndedPauseButton(state);
    updateMuteButtons();
};

/**
 * Disables the pause button for game-end states
 * @param {string} state - Current action state
 */
function updateEndedPauseButton(state) {
    if (!pauseButton || !pauseShouldBeDisabled(state)) return;
    pauseButton.disabled = true;
    pauseButton.classList.add('deactive_button');
};

/**
 * Checks whether pause must be disabled for the current state
 * @param {string} state - Current action state
 * @returns {boolean} - true = pause should be disabled
 */
function pauseShouldBeDisabled(state) {
    return state == 'ended' || (state == 'settings' && gameIsFinished());
};

/**
 * Stores the current action state for responsive CSS layouts
 * @param {string} state - Current action state
 */
function setActionButtonStateAttribute(state) {
    if (buttonSection) buttonSection.dataset.actionState = state;
    document.body.dataset.actionState = state;
};

/** Hides all primary action buttons except mute/unmute */
function hidePrimaryActionButtons() {
    [
        startButton,
        restartbutton,
        homeButton,
        settingsButton,
        pauseButton
    ].forEach(hideButton);
};

/**
 * Gets the buttons that should be visible for a state
 * @param {string} state - Current action state
 * @returns {HTMLElement[]} Buttons to show
 */
function getButtonsForActionState(state) {
    if (state == 'home') return [startButton, settingsButton];
    if (state == 'ended') return [homeButton, restartbutton, pauseButton, settingsButton];
    if (state == 'settings') return getSettingsActionButtons();
    return [restartbutton, homeButton, settingsButton, pauseButton];
};

/**
 * Gets the visible buttons while settings are open
 * @returns {HTMLElement[]} Buttons to show
 */
function getSettingsActionButtons() {
    if (!gameStarted) return [startButton, settingsButton];
    if (gameIsFinished()) return [homeButton, restartbutton, pauseButton, settingsButton];
    return [restartbutton, homeButton, settingsButton, pauseButton];
};

/**
 * Checks whether the current world has already ended
 * @returns {boolean} - true = game ended
 */
function gameIsFinished() {
    return Boolean(world && world.gameEnded);
};

/**
 * Shows one button and makes it interactive
 * @param {HTMLElement} button - Button to show
 */
function showButton(button) {
    if (!button) return;
    button.disabled = false;
    button.classList.remove('d_none');
    button.classList.remove('deactive_button');
};

/**
 * Hides one button
 * @param {HTMLElement} button - Button to hide
 */
function hideButton(button) {
    if (!button) return;
    button.classList.add('d_none');
    button.classList.remove('deactive_button');
};

/**
 * Updates the bottom pause/play button image
 * @param {boolean} showPlay - true = play icon, false = pause icon
 */
function updatePauseButtonImage(showPlay) {
    if (!pauseButton) return;
    let image = pauseButton.querySelector('img');
    if (!image) return;
    image.src = showPlay ? './img/buttons/play_button.png' : './img/buttons/pause_button.png';
    image.alt = showPlay ? 'play' : 'pause';
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
    if (!muteButton || !unmuteButton) return;
    if (muteSwitch) {
        muteButton.classList.add('d_none');
        unmuteButton.classList.remove('d_none');
        return;
    };
    muteButton.classList.remove('d_none');
    unmuteButton.classList.add('d_none');
};
