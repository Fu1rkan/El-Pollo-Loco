/**
 * Checks if the up key is pressed
 * @param {KeyboardEvent} event - Keyboard event to check
 * @returns {boolean} - true = up key pressed, false = other key pressed
 */
function isKeyboardUp(event) {
    return event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp' || event.key === ' ';
};

/**
 * Checks if the down key is pressed
 * @param {KeyboardEvent} event - Keyboard event to check
 * @returns {boolean} - true = down key pressed, false = other key pressed
 */
function isKeyboardDown(event) {
    return event.key === 's' || event.key === 'S' || event.key === 'ArrowDown';
};

/**
 * Checks if the left key is pressed
 * @param {KeyboardEvent} event - Keyboard event to check
 * @returns {boolean} - true = left key pressed, false = other key pressed
 */
function isKeyboardLeft(event) {
    return event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft';
};

/**
 * Checks if the right key is pressed
 * @param {KeyboardEvent} event - Keyboard event to check
 * @returns {boolean} - true = right key pressed, false = other key pressed
 */
function isKeyboardRight(event) {
    return event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight';
};

/**
 * Checks if the action key is pressed
 * @param {KeyboardEvent} event - Keyboard event to check
 * @returns {boolean} - true = action key pressed, false = other key pressed
 */
function isKeyboardAction(event) {
    return event.key === 'e' || event.key === 'E';
};

/**
 * Checks if the escape key is pressed
 * @param {KeyboardEvent} event - Keyboard event to check
 * @returns {boolean} - true = escape key pressed, false = other key pressed
 */
function isKeyboardEscape(event) {
    return event.key === 'Escape';
};

/**
 * Binds pointer controls to a responsive button
 * @param {string} id - HTML id of the button
 * @param {string} keyName - Keyboard key name to update
 */
function bindButton(id, keyName) {
    const btn = document.getElementById(id);
    handlePointerDown(keyName, btn);
    handlePointerUp(keyName, btn);
    handlePointerCancel(keyName, btn);
    handlePointerLeave(keyName, btn);
};

/**
 * Handles pointer down event for a button
 * @param {string} keyName - Keyboard key name to set active
 * @param {HTMLElement} btn - Button element to bind
 */
function handlePointerDown(keyName, btn) {
    btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        keyboard[keyName] = true;
        if (isAnyKeyPressed()) {
            resetSleepingTimer();
        };
    });
};

/**
 * Handles pointer up event for a button
 * @param {string} keyName - Keyboard key name to set inactive
 * @param {HTMLElement} btn - Button element to bind
 */
function handlePointerUp(keyName, btn) {
    btn.addEventListener('pointerup', (e) => {
        e.preventDefault();
        keyboard[keyName] = false;
    });
};

/**
 * Handles pointer cancel event for a button
 * @param {string} keyName - Keyboard key name to set inactive
 * @param {HTMLElement} btn - Button element to bind
 */
function handlePointerCancel(keyName, btn) {
    btn.addEventListener('pointercancel', () => {
        keyboard[keyName] = false;
    });
};

/**
 * Handles pointer leave event for a button
 * @param {string} keyName - Keyboard key name to set inactive
 * @param {HTMLElement} btn - Button element to bind
 */
function handlePointerLeave(keyName, btn) {
    btn.addEventListener('pointerleave', () => {
        keyboard[keyName] = false;
    });
};

/**
 * Handles keydown events for desktop controls
 * Sets the matching keyboard key to active, pauses the game with Escape and resets the sleeping timer
 */
document.addEventListener('keydown', (event) => {
    const key = getKeyboardKey(event);

    if (key) {
        keyboard[key] = true;
    } else if (isKeyboardEscape(event)) {
        pauseGame();
    };

    if (isAnyKeyPressed()) {
        resetSleepingTimer();
    };
});

/**
 * Handles keyup events for desktop controls
 * Sets the matching keyboard key to inactive
 */
document.addEventListener('keyup', (event) => {
    const key = getKeyboardKey(event);

    if (key) {
        keyboard[key] = false;
    };
});

/**
 * Gets the matching keyboard property for a keyboard event
 * @param {KeyboardEvent} event - Keyboard event to check
 * @returns {string|null} - Keyboard property name or null if no key matches
 */
function getKeyboardKey(event) {
    if (isKeyboardUp(event)) return 'UP';
    if (isKeyboardLeft(event)) return 'LEFT';
    if (isKeyboardDown(event)) return 'DOWN';
    if (isKeyboardRight(event)) return 'RIGHT';
    if (isKeyboardAction(event)) return 'E';
    return null;
};

/**
 * Binds mobile control buttons after a short delay
 * Ensures the button elements are available before pointer events are attached
 */
setTimeout(() => {
    bindButton('left-button', 'LEFT');
    bindButton('right-button', 'RIGHT');
    bindButton('up-button', 'UP');
    bindButton('salsa-button', 'E');
}, 10);