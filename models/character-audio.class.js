/** Initializes all character audios */
Character.prototype.getAudios = function () {
    this.createAudios();
    this.AUDIOS = this.getAudioArray();
    this.muteAudios();
    this.addAudiosToGlobalArray();
};

/** Creates all audio objects used by the character */
Character.prototype.createAudios = function () {
    this.character_hurt = new Audio('audio/character_hurt.mp3');
    this.character_death = new Audio('audio/character_death.mp3');
    this.character_jump = new Audio('audio/character_jump.mp3');
    this.character_sleep = new Audio('audio/character_sleeping.mp3');
    this.character_whistle = new Audio('audio/character_whistle.mp3');
    this.character_walk = new Audio('audio/character_footsteps.mp3');
};

/**
 * Gets all character audios in their playback order
 * @returns {HTMLAudioElement[]} - Character audio elements
 */
Character.prototype.getAudioArray = function () {
    return [
        this.character_hurt,
        this.character_death,
        this.character_jump,
        this.character_sleep,
        this.character_whistle,
        this.character_walk
    ];
};

/** Applies the current mute status to all character audios */
Character.prototype.muteAudios = function () {
    this.AUDIOS.forEach((audio) => {
        audio.muted = isMuted;
    });
};

/** Adds all character audios to the global audio collection */
Character.prototype.addAudiosToGlobalArray = function () {
    this.AUDIOS.forEach((audio) => {
        allAudios.push(audio);
    });
};

/** Starts the delayed whistle sound */
Character.prototype.whistleSound = function () {
    let id = this.createTimeout(world.character.playWhistleSound, 8000)
    world.character.timers.push(id);
};

/** Plays the whistle sound */
Character.prototype.playWhistleSound = function () {
    world.character.AUDIOS[4].play();
};

/** Starts the sleep sound loop */
Character.prototype.sleepSound = function () {
    world.character.AUDIOS[3].play();
    let audioId = this.createInterval(world.character.playSleepSound, 1000)
    world.character.audioIntervals.push(audioId);
};

/** Plays the sleep sound */
Character.prototype.playSleepSound = function () {
    world.character.AUDIOS[3].play()
};

/** Starts the walking sound loop */
Character.prototype.walkSound = function () {
    world.character.AUDIOS[5].play();
    let audioId = this.createInterval(world.character.playWalkSound, 600)
    world.character.audioIntervals.push(audioId);
};

/** Plays one walking step sound */
Character.prototype.playWalkSound = function () {
    let sound = world.character.AUDIOS[5].cloneNode(true);
    sound.muted = isMuted;
    sound.play();
};
