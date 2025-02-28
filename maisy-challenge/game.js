
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000055',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    //scene: [mainScene, main2Scene, storyScene, story2Scene, level1]
    scene: [mainScene, storyScene, instructions1, instructions2, rulesPage, level1, level2, level3, gameoverScene, failScene2, failScene3, listScene1, listScene2, listScene3, winScene, creditScene, trapScene2, trapScene3, catScene3]


};

let game = new Phaser.Game(config);



