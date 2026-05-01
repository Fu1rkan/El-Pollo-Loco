/**
 * Holds the current first level instance
 * @type {Level}
 */
let level1;

/**
 * Creates the first level with enemies, collectibles, background and endscreen objects
 */
function startLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
        ],
        [
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
            new BabyChicken(),
        ],
        [
            new Endboss()
        ],
        [
            new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, -720, 0),
            new Clouds('img/5_background/layers/4_clouds/1.png', 720, 480, 0, 0),
            new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, 720, 0),
            new Clouds('img/5_background/layers/4_clouds/1.png', 720, 480, 1440, 0),
            new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, 2160, 0),
            new Clouds('img/5_background/layers/4_clouds/1.png', 720, 480, 2880, 0),
            new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, 2160, 0),
            new Clouds('img/5_background/layers/4_clouds/1.png', 720, 480, 3600, 0),
            new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, 4320, 0),
            new Clouds('img/5_background/layers/4_clouds/1.png', 720, 480, 5040, 0),
            new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, 5760, 0),
            new Clouds('img/5_background/layers/4_clouds/1.png', 720, 480, 6480, 0),
            new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, 7200, 0),
        ],
        [
            new Background('img/5_background/layers/air.png', 720, 480, -720, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 720, 480, -720, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 720, 480, -720, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 720, 480, -720, 0),
            new Background('img/5_background/layers/air.png', 720, 480, 0, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 720, 480, 0, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 720, 480, 0, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 720, 480, 0, 0),
            new Background('img/5_background/layers/air.png', 720, 480, 720, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 720, 480, 720, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 720, 480, 720, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 720, 480, 720, 0),
            new Background('img/5_background/layers/air.png', 720, 480, 1440, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 720, 480, 1440, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 720, 480, 1440, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 720, 480, 1440, 0),
            new Background('img/5_background/layers/air.png', 720, 480, 2160, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 720, 480, 2160, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 720, 480, 2160, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 720, 480, 2160, 0),
            new Background('img/5_background/layers/air.png', 720, 480, 2880, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 720, 480, 2880, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 720, 480, 2880, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 720, 480, 2880, 0),
            new Background('img/5_background/layers/air.png', 720, 480, 3600, 0),
            new Background('img/5_background/layers/3_third_layer/2.png', 720, 480, 3600, 0),
            new Background('img/5_background/layers/2_second_layer/2.png', 720, 480, 3600, 0),
            new Background('img/5_background/layers/1_first_layer/2.png', 720, 480, 3600, 0),
            new Background('img/5_background/layers/air.png', 720, 480, 4320, 0),
            new Background('img/5_background/layers/3_third_layer/1.png', 720, 480, 4320, 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 720, 480, 4320, 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 720, 480, 4320, 0)
        ],
        [
            new Coin('img/8_coin/coin_1.png', 150, 150, 400, 280),
            new Coin('img/8_coin/coin_1.png', 150, 150, 500, 280),
            new Coin('img/8_coin/coin_1.png', 150, 150, 600, 280),
            new Coin('img/8_coin/coin_1.png', 150, 150, 900, 80),
            new Coin('img/8_coin/coin_1.png', 150, 150, 1000, 80),
            new Coin('img/8_coin/coin_1.png', 150, 150, 1100, 80),
            new Coin('img/8_coin/coin_1.png', 150, 150, 1600, 280),
            new Coin('img/8_coin/coin_1.png', 150, 150, 1700, 180),
            new Coin('img/8_coin/coin_1.png', 150, 150, 1800, 80),
            new Coin('img/8_coin/coin_1.png', 150, 150, 1900, 180),
            new Coin('img/8_coin/coin_1.png', 150, 150, 2000, 280),
            new Coin('img/8_coin/coin_1.png', 150, 150, 2600, 280),
            new Coin('img/8_coin/coin_1.png', 150, 150, 2700, 180),
            new Coin('img/8_coin/coin_1.png', 150, 150, 2800, 280),
            new Coin('img/8_coin/coin_1.png', 150, 150, 3200, 280),
            new Coin('img/8_coin/coin_1.png', 150, 150, 3200, 180),
            new Coin('img/8_coin/coin_1.png', 150, 150, 3200, 80),
            new Coin('img/8_coin/coin_1.png', 150, 150, 3400, 180),
            new Coin('img/8_coin/coin_1.png', 150, 150, 3500, 180),
            new Coin('img/8_coin/coin_1.png', 150, 150, 3600, 280),
        ],
        [
            new Salsa('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 100, 100, 350, 330),
            new Salsa('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 100, 100, 1000, 330),
            new Salsa('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 100, 100, 1800, 330),
            new Salsa('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 100, 100, 2200, 330),
            new Salsa('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 100, 100, 2700, 330),
            new Salsa('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 100, 100, 3000, 330),
            new Salsa('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 100, 100, 3500, 330),
        ],
        [
            new Win('img/You_won_you_lost/You_Win_A.png', 400, 200, 160, 140)
        ],
        [
            new Lose('img/You_won_you_lost/You_lost.png', 400, 200, 160, 140)
        ]
    )
};
