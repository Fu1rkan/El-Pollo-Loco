/** Initializes all world related audios */
World.prototype.getAudios = function () {
    this.createAudios();
    this.AUDIOS = this.getAudioArray();
    this.muteAudios();
    this.addAudiosToGlobalArray();
};

/** Creates all audio objects used by the world */
World.prototype.createAudios = function () {
    this.allCoinsCollected = new Audio('audio/coin_all_collected.mp3');
    this.coinCollected = new Audio('audio/coin_collected.mp3');
    this.salsaCollected = new Audio('audio/bottle_collected.mp3');
    this.gameWonSound = new Audio('audio/game_win.mp3');
    this.gameLostSound = new Audio('audio/game_over.mp3');
    this.windAudio = new Audio('audio/wind.mp3');
    this.backgroundMusic = new Audio('audio/desert_storm_northside.mp3');
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
    world.AUDIOS[6].play();
};
