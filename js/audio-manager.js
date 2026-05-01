/**
 * Collects reusable audio pools by path
 * @type {Object.<string, HTMLAudioElement[]>}
 */
let audioPools = {};

/**
 * Stores last playback time by audio cooldown group
 * @type {Object.<string, number>}
 */
let audioCooldowns = {};

/**
 * Default volume values for game sounds
 * @type {number}
 */
const DEFAULT_AUDIO_VOLUME = 0.65;
const BACKGROUND_MUSIC_VOLUME = 0.35;
const WIN_BACKGROUND_MUSIC_VOLUME = 0.16;
const WIND_AUDIO_VOLUME = 0.35;

/**
 * Creates an audio element with shared defaults
 * @param {string} path - Audio file path
 * @returns {HTMLAudioElement} - Prepared audio element
 */
function createManagedAudio(path) {
    let audio = new Audio(path);
    audio.preload = 'auto';
    audio.muted = isMuted;
    setAudioVolume(audio, DEFAULT_AUDIO_VOLUME);
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
 * Sets an audio volume between 0 and 1
 * @param {HTMLAudioElement} audio - Audio element to update
 * @param {number} volume - Desired audio volume
 */
function setAudioVolume(audio, volume) {
    if (!audio) return;
    audio.volume = getLimitedAudioVolume(volume);
};

/**
 * Limits a volume value to the playable range
 * @param {number} volume - Desired audio volume
 * @returns {number} - Limited audio volume
 */
function getLimitedAudioVolume(volume) {
    return Math.max(0, Math.min(volume, 1));
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
    setAudioVolume(audio, volume * DEFAULT_AUDIO_VOLUME);
    audio.currentTime = 0;
    playAudio(audio);
};

/**
 * Plays an enemy ambient sound with mobile throttling
 * @param {string} path - Audio file path
 * @param {number} volume - Playback volume
 */
function playEnemyAmbientSound(path, volume) {
    if (!isMobileAudioMode()) {
        playPooledAudio(path, volume, 2);
        return;
    };
    playThrottledPooledAudio(path, volume, 1, 'enemyAmbient', 2600);
};

/**
 * Plays pooled audio only when the cooldown group is ready
 * @param {string} path - Audio file path
 * @param {number} volume - Playback volume
 * @param {number} poolSize - Maximum simultaneous sounds
 * @param {string} group - Cooldown group
 * @param {number} cooldown - Cooldown in milliseconds
 */
function playThrottledPooledAudio(path, volume, poolSize, group, cooldown) {
    if (!canUseAudioCooldown(group, cooldown)) return;
    rememberAudioCooldown(group);
    playPooledAudio(path, volume, poolSize);
};

/**
 * Checks whether a cooldown group can play
 * @param {string} group - Cooldown group
 * @param {number} cooldown - Cooldown in milliseconds
 * @returns {boolean} - true = can play, false = still cooling down
 */
function canUseAudioCooldown(group, cooldown) {
    let lastPlayed = audioCooldowns[group] || 0;
    return Date.now() - lastPlayed >= cooldown;
};

/**
 * Stores the current playback time for a cooldown group
 * @param {string} group - Cooldown group
 */
function rememberAudioCooldown(group) {
    audioCooldowns[group] = Date.now();
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
    if (isMobileAudioMode()) {
        return Math.min(poolSize, 2);
    };
    return poolSize;
};

/**
 * Checks whether mobile audio limits should be active
 * @returns {boolean} - true = mobile audio mode, false = desktop audio mode
 */
function isMobileAudioMode() {
    return navigator.maxTouchPoints > 0 || window.innerWidth < 820;
};

/**
 * Gets the maximum distance for enemy ambient sounds
 * @returns {number} - Maximum playback distance
 */
function getEnemySoundDistance() {
    return isMobileAudioMode() ? 520 : 720;
};

/** Clears all reusable audio pools */
function resetAudioPools() {
    audioPools = {};
    audioCooldowns = {};
};
