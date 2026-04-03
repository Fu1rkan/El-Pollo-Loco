let canvas;
let keyboard = new Keyboard();
let world;
let timer;
let isRunning = true;

function init() {
    updateUI();

    window.addEventListener('resize', updateUI);
    window.addEventListener('orientationchange', updateUI);
}

function updateUI() {
    if (isInLandsCapeMode() && isTouchDevice() || isSmallScreen() && isInLandsCapeMode()) {
        document.getElementById('section-canvas').classList.remove('d_none');
        document.getElementById('section-buttons').classList.remove('d_none');
        document.getElementById('rotate-phone-screen').classList.add('d_none');
        document.getElementById('resp-buttons').classList.remove('d_none');
        document.getElementById('resp-restart-button').classList.remove('d_none');
        document.getElementById('resp-pause-button').classList.remove('d_none');
        document.getElementById('header').style.justifyContent = '';
        document.getElementById('header').style.justifyContent = 'space-between';
    } else if (isTouchDevice() || isSmallScreen()) {
        document.getElementById('section-canvas').classList.add('d_none');
        document.getElementById('section-buttons').classList.add('d_none');
        document.getElementById('rotate-phone-screen').classList.remove('d_none');
        document.getElementById('resp-buttons').classList.add('d_none');
        document.getElementById('resp-restart-button').classList.add('d_none');
        document.getElementById('resp-pause-button').classList.add('d_none');
        document.getElementById('header').style.justifyContent = '';
        document.getElementById('header').style.justifyContent = 'center';
    } else {
        document.getElementById('section-canvas').classList.remove('d_none');
        document.getElementById('section-buttons').classList.remove('d_none');
        document.getElementById('rotate-phone-screen').classList.add('d_none');
        document.getElementById('header').style.justifyContent = '';
        document.getElementById('header').style.justifyContent = 'center';
    }
}

function renderGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    startTimer();
    console.log('My Character is', world.character);
};


function isTouchDevice() {
    return window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
};

function isSmallScreen() {
    return window.innerWidth < 820;
}

function isInLandsCapeMode() {
    return window.matchMedia("(orientation: landscape)").matches;
}

function bindButton(id, keyName) {
    const btn = document.getElementById(id);

    // drücken
    btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        keyboard[keyName] = true;

        if (checkKeyPressed()) {
            resetSleepingTimer();
        }
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
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp' || event.key === ' ') {
        keyboard.UP = true;
    } else if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    } else if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        keyboard.DOWN = true;
    } else if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    } else if (event.key === 'e') {
        keyboard.E = true;
    };

    if (checkKeyPressed() == true) {
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
    } else if (event.key === 'e') {
        keyboard.E = false;
    };
});

function startTimer() {
    timer = setTimeout(() => {
        keyboard.KEY = false
    }, 15000);
};

function checkKeyPressed() {
    return keyboard.UP || keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE || keyboard.E;
};

function startGame() {
    isRunning = true;
    document.getElementById('canvas').classList.remove('background-img');
    document.getElementById('start-button').setAttribute("onclick", "");
    document.getElementById('start-button').classList.add('deactive_button');
    document.getElementById('pause-button').setAttribute("onclick", "pauseGame()");
    document.getElementById('pause-button').classList.remove('deactive_button');
    document.getElementById('restart-button').setAttribute("onclick", "restartGame()");
    document.getElementById('restart-button').classList.remove('deactive_button');
    document.getElementById('resp-start-button').setAttribute("onclick", "");
    document.getElementById('resp-start-button').classList.add('deactive_button');
    document.getElementById('resp-pause-button').setAttribute("onclick", "pauseGame()");
    document.getElementById('resp-pause-button').classList.remove('deactive_button');
    document.getElementById('resp-restart-button').setAttribute("onclick", "restartGame()");
    document.getElementById('resp-restart-button').classList.remove('deactive_button');
    renderGame();
};

function restartGame() {
    resumeGame();
    DrawableObject.intervalArr.forEach(i => {
        clearInterval(i);
    });
    DrawableObject.intervalArr = [];
    clearTimeout(timer);
    keyboard.KEY = true;
    document.getElementById('pause-menu').classList.add('d_none');
    document.getElementById('pause-buttons').classList.add('d_none');
    cancelAnimationFrame(world.requestAnimation);
    renderGame();
};

function pauseGame() {
    isRunning = false;
    document.getElementById('pause-menu').classList.remove('d_none');
    document.getElementById('pause-buttons').classList.remove('d_none');
    document.getElementById('pause-button').classList.add('deactive_button');
};

function resumeGame() {
    isRunning = true;
    document.getElementById('pause-menu').classList.add('d_none');
    document.getElementById('pause-buttons').classList.add('d_none');
    document.getElementById('pause-button').classList.remove('deactive_button');
};

function homeMenu() {
    DrawableObject.intervalArr.forEach(i => {
        clearInterval(i);
    });
    document.getElementById('pause-menu').classList.add('d_none');
    document.getElementById('pause-buttons').classList.add('d_none');
    DrawableObject.intervalArr = [];
    clearTimeout(timer);
    keyboard.KEY = true;
    cancelAnimationFrame(world.requestAnimation);
    world.ctx.clearRect(0, 0, 720, 480)
    document.getElementById('canvas').classList.add('background-img');
    document.getElementById('start-button').setAttribute("onclick", "startGame()");
    document.getElementById('start-button').classList.remove('deactive_button');
    document.getElementById('pause-button').setAttribute("onclick", "");
    document.getElementById('pause-button').classList.add('deactive_button');
    document.getElementById('restart-button').setAttribute("onclick", "");
    document.getElementById('restart-button').classList.add('deactive_button');
    document.getElementById('resp-start-button').setAttribute("onclick", "startGame()");
    document.getElementById('resp-start-button').classList.remove('deactive_button');
    document.getElementById('resp-pause-button').setAttribute("onclick", "");
    document.getElementById('resp-pause-button').classList.add('deactive_button');
    document.getElementById('resp-restart-button').setAttribute("onclick", "");
    document.getElementById('resp-restart-button').classList.add('deactive_button');
};

function resetSleepingTimer() {
    clearTimeout(timer);
    keyboard.KEY = true;
    timer = setTimeout(() => {
        keyboard.KEY = false
    }, 15000);
};

setTimeout(() => {
    bindButton('left-button', 'LEFT');
    bindButton('right-button', 'RIGHT');
    bindButton('up-button', 'UP');
    bindButton('salsa-button', 'E');
}, 50);