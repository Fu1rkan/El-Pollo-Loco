const level1 = new Level(
    [
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        new Chicken(80, 80),
        // new Endboss()
    ],
    [
        new Clouds('img/5_background/layers/4_clouds/1.png', 720, 480, 0, 0),
        new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, 720, 0),
        new Clouds('img/5_background/layers/4_clouds/1.png', 720, 480, 1440, 0),
        new Clouds('img/5_background/layers/4_clouds/2.png', 720, 480, 2160, 0)
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
    ]
)