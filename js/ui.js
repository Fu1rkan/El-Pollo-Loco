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
    updateViewportSizeVariable();
    if (isLandscape() && (isTouchDevice() || isSmallScreen())) {
        activateMobileMode();
    } else if (isTouchDevice() || isSmallScreen()) {
        activateRotateScreen();
    } else {
        activateDesktopMode();
    };
    updateCanvasSize();
};

/** Stores the current visual viewport size for mobile browser chrome changes */
function updateViewportSizeVariable() {
    document.documentElement.style.setProperty('--app-width', `${getViewportWidth()}px`);
    document.documentElement.style.setProperty('--app-height', `${getViewportHeight()}px`);
};

/** Activates mobile landscape mode */
function activateMobileMode() {
    setMobileControlsMode(true);
    CanvasSection.classList.remove('d_none');
    buttonSection.classList.remove('d_none');
    respButtons.classList.remove('d_none');
    respPauseButton.classList.remove('d_none');
    rotatePhoneScreen.classList.add('d_none');
    setHeaderAlignment('space-between');
    updateResponsiveActionButtons();
};

/** Shows rotate screen for mobile portrait mode */
function activateRotateScreen() {
    setMobileControlsMode(false);
    CanvasSection.classList.add('d_none');
    buttonSection.classList.add('d_none');
    respButtons.classList.add('d_none');
    respStartButton.classList.add('d_none');
    respRestartButton.classList.add('d_none');
    respPauseButton.classList.add('d_none');
    rotatePhoneScreen.classList.remove('d_none');
    setHeaderAlignment('center');
};

/** Activates desktop mode */
function activateDesktopMode() {
    setMobileControlsMode(false);
    CanvasSection.classList.remove('d_none');
    buttonSection.classList.remove('d_none');
    respPauseButton.classList.remove('d_none');
    rotatePhoneScreen.classList.add('d_none');
    setHeaderAlignment('center');
    updateResponsiveActionButtons();
};

/**
 * Toggles touch control layout
 * @param {boolean} isActive - true = show touch controls, false = hide touch controls
 */
function setMobileControlsMode(isActive) {
    document.body.classList.toggle('mobile-controls', isActive);
};

/** Shows the correct responsive start/restart button for the current game state */
function updateResponsiveActionButtons() {
    if (gameStarted) {
        respStartButton.classList.add('d_none');
        respRestartButton.classList.remove('d_none');
        return;
    };
    respStartButton.classList.remove('d_none');
    respRestartButton.classList.add('d_none');
};

/**
 * Sets the header alignment
 * @param {string} alignment - CSS justify-content value
 */
function setHeaderAlignment(alignment) {
    header.style.justifyContent = '';
    header.style.justifyContent = alignment;
};

/** Updates the rendered canvas size while keeping the original 3:2 game ratio */
function updateCanvasSize() {
    if (!CanvasSection) return;
    let size = getResponsiveCanvasSize();
    CanvasSection.style.width = `${size.width}px`;
    CanvasSection.style.height = `${size.height}px`;
};

/**
 * Calculates the responsive canvas size for normal and compact screens
 * @returns {{width: number, height: number}} - Rendered canvas size in pixels
 */
function getResponsiveCanvasSize() {
    if (isCompactCanvasMode()) {
        return getCompactCanvasSize();
    };
    let width = getResponsiveCanvasWidth();
    return {
        width: width,
        height: width / getCanvasAspectRatio()
    };
};

/**
 * Calculates a full-height canvas size for compact landscape screens
 * @returns {{width: number, height: number}} - Rendered canvas size in pixels
 */
function getCompactCanvasSize() {
    let aspectRatio = getCanvasAspectRatio();
    let width = Math.min(getViewportWidth(), getViewportHeight() * aspectRatio);
    return {
        width: width,
        height: width / aspectRatio
    };
};

/**
 * Calculates the largest canvas width that fits the current viewport
 * @returns {number} - Responsive canvas width in pixels
 */
function getResponsiveCanvasWidth() {
    let maxWidth = 1000;
    let horizontalPadding = document.body.classList.contains('mobile-controls') ? 16 : 48;
    let widthByViewport = Math.max(0, getViewportWidth() - horizontalPadding);
    let widthByHeight = getAvailableCanvasHeight() * getCanvasAspectRatio();
    return Math.max(280, Math.min(maxWidth, widthByViewport, widthByHeight));
};

/**
 * Gets the available viewport height for the canvas after visible controls
 * @returns {number} - Available height in pixels
 */
function getAvailableCanvasHeight() {
    let isMobileMode = document.body.classList.contains('mobile-controls');
    let controls = isMobileMode ? respButtons : buttonSection;
    let verticalPadding = isMobileMode ? 168 : 148;
    return Math.max(
        180,
        getViewportHeight() - getElementHeight(header) - getElementHeight(controls) - verticalPadding
    );
};

/**
 * Gets the current visual viewport height
 * @returns {number} - Viewport height in pixels
 */
function getViewportHeight() {
    return window.visualViewport ? window.visualViewport.height : window.innerHeight;
};

/**
 * Gets the current visual viewport width
 * @returns {number} - Viewport width in pixels
 */
function getViewportWidth() {
    return window.visualViewport ? window.visualViewport.width : window.innerWidth;
};

/**
 * Gets an element height only when it is rendered
 * @param {HTMLElement} element - Element to measure
 * @returns {number} - Rendered height in pixels
 */
function getElementHeight(element) {
    if (!element) return 0;
    return element.offsetHeight;
};

/**
 * Gets the original game canvas aspect ratio
 * @returns {number} - Width divided by height
 */
function getCanvasAspectRatio() {
    return canvasId.width / canvasId.height;
};

/**
 * Checks whether the compact full-height canvas layout should be used
 * @returns {boolean} - true = compact canvas mode, false = normal layout
 */
function isCompactCanvasMode() {
    return getViewportHeight() <= 600;
};

/**
 * Checks whether statusbars need extra top offset because header buttons overlap the canvas
 * @returns {boolean} - true = statusbars should be moved down
 */
function shouldLowerStatusbars() {
    return isCompactCanvasMode() && headerButtonsOverlapCanvas();
};

/**
 * Checks whether any visible header button overlaps the canvas area
 * @returns {boolean} - true = header button overlaps canvas
 */
function headerButtonsOverlapCanvas() {
    if (!CanvasSection || !header) return false;
    let canvasRect = CanvasSection.getBoundingClientRect();
    return Array.from(header.querySelectorAll('button')).some((button) => {
        return elementOverlapsCanvas(button, canvasRect);
    });
};

/**
 * Checks whether an element overlaps the canvas rectangle
 * @param {HTMLElement} element - Element to check
 * @param {DOMRect} canvasRect - Canvas section rectangle
 * @returns {boolean} - true = element overlaps canvas
 */
function elementOverlapsCanvas(element, canvasRect) {
    if (!elementIsVisible(element)) return false;
    let rect = element.getBoundingClientRect();
    return rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > canvasRect.top &&
        rect.top < canvasRect.bottom &&
        rect.right > canvasRect.left &&
        rect.left < canvasRect.right;
};

/**
 * Checks whether an element is currently visible in the layout
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - true = element is visible
 */
function elementIsVisible(element) {
    let style = window.getComputedStyle(element);
    return !element.classList.contains('d_none') &&
        style.display !== 'none' &&
        style.visibility !== 'hidden';
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
    return getViewportWidth() < 820;
};

/**
 * Checks if the device is in landscape mode
 * @returns {boolean} - true = landscape, false = portrait
 */
function isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
};
