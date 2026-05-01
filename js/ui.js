/** Gets all needed HTML elements */
function getElementsbyId() {
    getContainerIds();
    getButtonIds();
};

/** Gets all needed container elements */
function getContainerIds() {
    rotatePhoneScreen = document.getElementById('rotate-phone-screen');
    CanvasSection = document.getElementById('section-canvas');
    header = document.getElementById('header');
    canvasId = document.getElementById('canvas');
    pauseMenu = document.getElementById('pause-menu');
    closeSettingsbutton = document.getElementById('close-settings-button');
    buttonSection = document.getElementById('section-buttons');
    respButtons = document.getElementById('resp-buttons');
    pauseButtons = document.getElementById('pause-buttons');
};

/** Updates the UI depending on device, screen size and orientation */
function updateUI() {
    if (isLandscape() && (isTouchDevice() || isSmallScreen())) {
        activateMobileMode();
    } else if (isTouchDevice() || isSmallScreen()) {
        activateRotateScreen();
    } else {
        activateDesktopMode();
    };
};

/** Activates mobile landscape mode */
function activateMobileMode() {
    CanvasSection.classList.remove('d_none');
    buttonSection.classList.remove('d_none');
    respButtons.classList.remove('d_none');
    respRestartButton.classList.remove('d_none');
    respPauseButton.classList.remove('d_none');
    rotatePhoneScreen.classList.add('d_none');
    setHeaderAlignment('space-between');
};

/** Shows rotate screen for mobile portrait mode */
function activateRotateScreen() {
    CanvasSection.classList.add('d_none');
    buttonSection.classList.add('d_none');
    respButtons.classList.add('d_none');
    respRestartButton.classList.add('d_none');
    respPauseButton.classList.add('d_none');
    rotatePhoneScreen.classList.remove('d_none');
    setHeaderAlignment('center');
};

/** Activates desktop mode */
function activateDesktopMode() {
    CanvasSection.classList.remove('d_none');
    buttonSection.classList.remove('d_none');
    rotatePhoneScreen.classList.add('d_none');
    setHeaderAlignment('center');
};

/**
 * Sets the header alignment
 * @param {string} alignment - CSS justify-content value
 */
function setHeaderAlignment(alignment) {
    header.style.justifyContent = '';
    header.style.justifyContent = alignment;
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
