let canvas;
let keyboard = new Keyboard();
let world;

timer = setTimeout(() => {
    keyboard.KEY = false
}, 15000);

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        keyboard.UP = true;
    } else if (event.key === 'a') {
        keyboard.LEFT = true;
    } else if (event.key === 's') {
        keyboard.DOWN = true;
    } else if (event.key === 'd') {
        keyboard.RIGHT = true;
    } else if (event.key === ' ') {
        keyboard.SPACE = true;
    } else if (event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    } else if (event.key === 'ArrowDown') {
        keyboard.DOWN = true;
    } else if (event.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    } else if (event.key === 'ArrowUp') {
        keyboard.UP = true;
    } else if (event.key === 'e') {
        keyboard.E = true;
    }

    if (checkKeyPressed() == true) {
        clearTimeout(timer);
        keyboard.KEY = true;
        timer = setTimeout(() => {
            keyboard.KEY = false
        }, 15000);
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') {
        keyboard.UP = false;
    } else if (event.key === 'a') {
        keyboard.LEFT = false;
    } else if (event.key === 's') {
        keyboard.DOWN = false;
    } else if (event.key === 'd') {
        keyboard.RIGHT = false;
    } else if (event.key === ' ') {
        keyboard.SPACE = false;
    } else if (event.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    } else if (event.key === 'ArrowDown') {
        keyboard.DOWN = false;
    } else if (event.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    } else if (event.key === 'ArrowUp') {
        keyboard.UP = false;
    } else if (event.key === 'e') {
        keyboard.E = false;
    }
});

function checkKeyPressed() {
    return keyboard.UP || keyboard.RIGHT || keyboard.LEFT || keyboard.SPACE || keyboard.E;
}

function restartGame() {
    DrawableObject.intervalArr.forEach(i => {
        clearInterval(i);
    });
    level1.enemies = [];
    level1.clouds = [];
    level1.backgroundObjects = [];

    init();
}