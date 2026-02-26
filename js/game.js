let canvas;
let keyboard = new Keyboard();
let world;
let timer;
let isRunning = true;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    startTimer();
    console.log('My Character is', world.character);
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
}

function checkKeyPressed() {
    return keyboard.UP || keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE || keyboard.E;
}

function startGame() {
    isRunning = true;
    document.getElementById('canvas').classList.remove('background-img');
    document.getElementById('start-button').innerHTML = 'Pause';
    document.getElementById('start-button').setAttribute('onclick', 'pauseGame()')
    document.getElementById('restart-button').disabled = false;
    document.getElementById('home-button').disabled = false;
    init();
}

function restartGame() {
    DrawableObject.intervalArr.forEach(i => {
        clearInterval(i);
    });
    DrawableObject.intervalArr = [];
    clearTimeout(timer);
    keyboard.KEY = true;
    document.getElementById('start-button').disabled = false;
    init();
}

function pauseGame() {
    isRunning = false;
    document.getElementById('start-button').innerHTML = 'resume';
    document.getElementById('start-button').setAttribute('onclick', 'resumeGame()')
}

function resumeGame() {
    isRunning = true;
    document.getElementById('start-button').innerHTML = 'pause';
    document.getElementById('start-button').setAttribute('onclick', 'pauseGame()')
}

function homeMenu() {
    DrawableObject.intervalArr.forEach(i => {
        clearInterval(i);
    });
    DrawableObject.intervalArr = [];
    clearTimeout(timer);
    keyboard.KEY = true;
    cancelAnimationFrame(world.requestAnimation);
    world.ctx.clearRect(0, 0, 720, 480)
    document.getElementById('canvas').classList.add('background-img');
    document.getElementById('start-button').innerHTML = 'Start';
    document.getElementById('start-button').setAttribute('onclick', 'startGame()');
    document.getElementById('restart-button').disabled = true;
    document.getElementById('home-button').disabled = true;
}

function resetSleepingTimer() {
    clearTimeout(timer);
    keyboard.KEY = true;
    timer = setTimeout(() => {
        keyboard.KEY = false
    }, 15000);
}