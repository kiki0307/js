let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      },
      debug: false
    }
  },
  scene: [
    introScene,
    introlevelsScene,
    level1,
    level2,
    level3,
    failScene,
    failScene2,
    level1Scene,
    level2Scene,
    level3Scene,
    winScene,
  
  ]
};

let game = new Phaser.Game(config);