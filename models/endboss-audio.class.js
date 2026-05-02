/** Initializes all endboss audios */
Endboss.prototype.getAudios = function () {
    this.createAudios();
    this.AUDIOS = this.getAudioArray();
    this.muteAudios();
    this.addAudiosToGlobalArray();
};

/** Creates all audio objects used by the endboss */
Endboss.prototype.createAudios = function () {
    this.endbossSound = createManagedAudio('audio/boss.mp3');
    this.endbossAlertSound = createManagedAudio('audio/boss_alert.mp3');
    this.endbossHurtSound = createManagedAudio('audio/boss_hurt.mp3');
    this.endbossDeathSound = createManagedAudio('audio/boss_death.mp3');
    this.endbossAttackSound = createManagedAudio('audio/boss_attack.mp3');
};

/**
 * Gets all endboss audios in their playback order
 * @returns {HTMLAudioElement[]} - Endboss audio elements
 */
Endboss.prototype.getAudioArray = function () {
    return [
        this.endbossSound,
        this.endbossAlertSound,
        this.endbossHurtSound,
        this.endbossDeathSound,
        this.endbossAttackSound
    ];
};

/** Applies the current mute status to all endboss audios */
Endboss.prototype.muteAudios = function () {
    this.AUDIOS.forEach((audio) => {
        audio.muted = isMuted;
    });
};

/** Adds all endboss audios to the global audio collection */
Endboss.prototype.addAudiosToGlobalArray = function () {
    this.AUDIOS.forEach((audio) => {
        allAudios.push(audio);
    });
};

/**
 * Plays an endboss audio by index
 * @param {number} i - Audio index
 */
Endboss.prototype.playEndbossAudio = function (i) {
    if (i == 4) {
        world.character.createInterval(this.playAlertSound, 500);
    };
    if (i >= 0) {
        playAudio(this.AUDIOS[i]);
    };
};

/**
 * Plays the alert sound during attack state
 * @param {number} intervalId - Alert sound interval id
 */
Endboss.prototype.playAlertSound = function (intervalId) {
    if (world.level.endboss[0].checkAttacking()) {
        clearInterval(intervalId);
        return;
    };
    playAudio(world.level.endboss[0].AUDIOS[4]);
};

/**
 * Plays the passive boss sound based on distance to the character
 * @param {number} intervalId - Boss sound interval id
 */
Endboss.prototype.playBossSound = function (intervalId) {
    let distance = Math.abs(world.character.x - world.level.endboss[0].x);
    let maxDistance = 720;
    let audio = world.level.endboss[0].AUDIOS[0];
    if (world.level.endboss[0].bossSoundShouldStop()) {
        world.level.endboss[0].stopBossSound(intervalId, audio);
        return;
    };
    world.level.endboss[0].playPassiveBossSound(distance, maxDistance, audio);
};

/**
 * Plays the passive boss sound when the character is close enough
 * @param {number} distance - Distance between character and endboss
 * @param {number} maxDistance - Maximum distance for sound playback
 * @param {HTMLAudioElement} audio - Passive boss sound audio
 */
Endboss.prototype.playPassiveBossSound = function (distance, maxDistance, audio) {
    if (distance > maxDistance) return;
    setAudioVolume(audio, (1 - (distance / maxDistance)) * DEFAULT_AUDIO_VOLUME);
    playAudio(audio);
};

/**
 * Checks whether the passive boss sound should stop
 * @returns {boolean} - true = passive boss sound should stop, false = keep playing
 */
Endboss.prototype.bossSoundShouldStop = function () {
    return this.endbossAlert || this.endbossIsAngry;
};

/**
 * Stops the passive boss sound and clears its interval
 * @param {number} intervalId - Boss sound interval id
 * @param {HTMLAudioElement} audio - Boss sound audio
 */
Endboss.prototype.stopBossSound = function (intervalId, audio) {
    clearInterval(intervalId);
    stopAudio(audio);
};
