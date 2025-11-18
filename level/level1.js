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
        new Endboss(300, 300)
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
    ],
    [
        new StatusbarCoin('img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png'),
        new StatusbarCoin('img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png'),
        new StatusbarCoin('img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png'),
        new StatusbarCoin('img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png'),
        new StatusbarCoin('img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png'),
        new StatusbarCoin('img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png')
    ],
    [
        new StatusbarHealth('img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png'),
        new StatusbarHealth('img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png'),
        new StatusbarHealth('img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png'),
        new StatusbarHealth('img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png'),
        new StatusbarHealth('img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png'),
        new StatusbarHealth('img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png')
    ],
    [
        new StatusbarBottle('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png'),
        new StatusbarBottle('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png'),
        new StatusbarBottle('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png'),
        new StatusbarBottle('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png'),
        new StatusbarBottle('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png'),
        new StatusbarBottle('img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png')
    ]
)