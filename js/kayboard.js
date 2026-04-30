
function bindButton(id, keyName) {
    const btn = document.getElementById(id);

    // drücken
    btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        keyboard[keyName] = true;

        if (isAnyKeyPressed()) {
            resetSleepingTimer();
        };
    });

    // loslassen
    btn.addEventListener('pointerup', (e) => {
        e.preventDefault();
        keyboard[keyName] = false;
    });

    // falls finger abrutscht / abgebrochen wird
    btn.addEventListener('pointercancel', () => {
        keyboard[keyName] = false;
    });

    btn.addEventListener('pointerleave', () => {
        keyboard[keyName] = false;
    });
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp' || event.key === ' ') {
        keyboard.UP = true;
    } else if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    } else if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        keyboard.DOWN = true;
    } else if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    } else if (event.key === 'e' || event.key === 'E') {
        keyboard.E = true;
    } else if (event.key === 'Escape') {
        pauseGame();
    };

    if (isAnyKeyPressed() == true) {
        resetSleepingTimer();
    };
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp' || event.key === ' ') {
        keyboard.UP = false;
    } else if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    } else if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        keyboard.DOWN = false;
    } else if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    } else if (event.key === 'e' || event.key === 'E') {
        keyboard.E = false;
    };
});

setTimeout(() => {
    bindButton('left-button', 'LEFT');
    bindButton('right-button', 'RIGHT');
    bindButton('up-button', 'UP');
    bindButton('salsa-button', 'E');
}, 50);