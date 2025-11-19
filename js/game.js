let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        keyboard.UP = true;
        keyboard.KEY = true;
    } else if (event.key === 'a') {
        keyboard.LEFT = true;
        keyboard.KEY = true;
    } else if (event.key === 's') {
        keyboard.DOWN = true;
        keyboard.KEY = true;
    } else if (event.key === 'd') {
        keyboard.RIGHT = true;
        keyboard.KEY = true;
    } else if (event.key === ' ') {
        keyboard.SPACE = true;
        keyboard.KEY = true;
    } else if (event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
        keyboard.KEY = true;
    } else if (event.key === 'ArrowDown') {
        keyboard.DOWN = true;
        keyboard.KEY = true;
    } else if (event.key === 'ArrowRight') {
        keyboard.RIGHT = true;
        keyboard.KEY = true;
    } else if (event.key === 'ArrowUp') {
        keyboard.UP = true;
        keyboard.KEY = true;
    } else if (event.key === 'e') {
        keyboard.E = true;
        keyboard.KEY = true;
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
    setTimeout(() => {
        keyboard.KEY = false
    }, 15000)
});