/**
 * Collects reusable audio pools by path
 * @type {Object.<string, HTMLAudioElement[]>}
 */
let audioPools = {};

/**
 * Creates an audio element with shared defaults
 * @param {string} path - Audio file path
 * @returns {HTMLAudioElement} - Prepared audio element
 */
function createManagedAudio(path) {
    let audio = new Audio(path);
    audio.preload = 'auto';
    audio.muted = isMuted;
    return audio;
};

/**
 * Plays an audio element safely
 * @param {HTMLAudioElement} audio - Audio element to play
 */
function playAudio(audio) {
    if (!canPlayAudio(audio)) return;
    audio.muted = isMuted;
    let promise = audio.play();
    catchAudioPromise(promise);
};

/**
 * Checks whether an audio element can play
 * @param {HTMLAudioElement} audio - Audio element to check
 * @returns {boolean} - true = audio can play, false = skip playback
 */
function canPlayAudio(audio) {
    return audio && !isMuted && isRunning;
};

/**
 * Catches browser audio promise rejections
 * @param {Promise<void>|undefined} promise - Audio play promise
 */
function catchAudioPromise(promise) {
    if (promise) {
        promise.catch(() => { });
    };
};

/**
 * Pauses an audio element
 * @param {HTMLAudioElement} audio - Audio element to pause
 */
function pauseAudio(audio) {
    if (audio) audio.pause();
};

/**
 * Stops and rewinds an audio element
 * @param {HTMLAudioElement} audio - Audio element to stop
 */
function stopAudio(audio) {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
};

/**
 * Plays a short effect through a reusable audio pool
 * @param {string} path - Audio file path
 * @param {number} volume - Playback volume
 * @param {number} poolSize - Maximum simultaneous sounds
 */
function playPooledAudio(path, volume = 1, poolSize = 2) {
    if (isMuted || !isRunning) return;
    let audio = getAvailablePoolAudio(path, poolSize);
    if (!audio) return;
    audio.volume = volume;
    audio.currentTime = 0;
    playAudio(audio);
};

/**
 * Stops every active audio element in a pool
 * @param {string} path - Audio file path
 */
function stopPooledAudio(path) {
    getAudioPool(path).forEach((audio) => {
        stopAudio(audio);
    });
};

/**
 * Gets an available audio element from a pool
 * @param {string} path - Audio file path
 * @param {number} poolSize - Maximum pool size
 * @returns {HTMLAudioElement|null} - Available audio element or null
 */
function getAvailablePoolAudio(path, poolSize) {
    let pool = getAudioPool(path);
    let audio = pool.find((item) => item.paused || item.ended);
    if (audio) return audio;
    if (pool.length >= getMobilePoolSize(poolSize)) return null;
    return addAudioToPool(path, pool);
};

/**
 * Gets or creates an audio pool
 * @param {string} path - Audio file path
 * @returns {HTMLAudioElement[]} - Audio pool
 */
function getAudioPool(path) {
    if (!audioPools[path]) {
        audioPools[path] = [];
    };
    return audioPools[path];
};

/**
 * Adds one audio element to a pool and global audio collection
 * @param {string} path - Audio file path
 * @param {HTMLAudioElement[]} pool - Audio pool
 * @returns {HTMLAudioElement} - Created audio element
 */
function addAudioToPool(path, pool) {
    let audio = createManagedAudio(path);
    audio.isPooledSound = true;
    pool.push(audio);
    allAudios.push(audio);
    return audio;
};

/**
 * Reduces pool size on touch devices
 * @param {number} poolSize - Requested pool size
 * @returns {number} - Effective pool size
 */
function getMobilePoolSize(poolSize) {
    if (navigator.maxTouchPoints > 0) {
        return Math.min(poolSize, 2);
    };
    return poolSize;
};

/** Clears all reusable audio pools */
function resetAudioPools() {
    audioPools = {};
};
