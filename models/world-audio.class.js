/** Initializes all world related audios */
World.prototype.getAudios = function () {
    this.createAudios();
    this.AUDIOS = this.getAudioArray();
    this.muteAudios();
    this.addAudiosToGlobalArray();
};

/** Creates all audio objects used by the world */
World.prototype.createAudios = function () {
    this.allCoinsCollected = createManagedAudio('audio/coin_all_collected.mp3');
    this.coinCollected = createManagedAudio('audio/coin_collected.mp3');
    this.salsaCollected = createManagedAudio('audio/bottle_collected.mp3');
    this.gameWonSound = createManagedAudio('audio/game_win.mp3');
    this.gameLostSound = createManagedAudio('audio/game_over.mp3');
    this.windAudio = createManagedAudio('audio/wind.mp3');
    this.backgroundMusic = createManagedAudio('audio/desert_storm_northside.mp3');
    this.setBackgroundAudioVolumes();
};

/** Sets lower default volumes for looping background sounds */
World.prototype.setBackgroundAudioVolumes = function () {
    setAudioVolume(this.windAudio, WIND_AUDIO_VOLUME);
    setAudioVolume(this.backgroundMusic, BACKGROUND_MUSIC_VOLUME);
};

/**
 * Gets all world related audios in their playback order
 * @returns {HTMLAudioElement[]} - World audio elements
 */
World.prototype.getAudioArray = function () {
    return [
        this.allCoinsCollected,
        this.coinCollected,
        this.salsaCollected,
        this.gameWonSound,
        this.gameLostSound,
        this.windAudio,
        this.backgroundMusic
    ];
};

/** Applies the current mute status to all world audios */
World.prototype.muteAudios = function () {
    this.AUDIOS.forEach((audio) => {
        audio.muted = isMuted;
    });
};

/** Adds all world audios to the global audio collection */
World.prototype.addAudiosToGlobalArray = function () {
    this.AUDIOS.forEach((audio) => {
        allAudios.push(audio);
    });
};

/** Plays the background music */
World.prototype.playBackgorundMusic = function () {
    playAudio(world.AUDIOS[6]);
};
