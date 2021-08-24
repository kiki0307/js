var space = 0;

var Object1;
var Object2;
var Object3;
var numObject1 = 3;
var numObject2 = 1;
var numObject3 = 1;

var speed1 = 3;
var speed2 = 5;
var text;
var score = 0;
var caught1 = false;
var caught2 = false;
var caught3 = false;

var x;
var y;
var s;

var player;

class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
  }
  preload() {
    this.load.image('background1','assets/bg_level1.jpg');

    this.load.image(
      "player",
      "https://raw.githubusercontent.com/kiki0307/js/master/drobin%20image/compostBin.png"
    );
    this.load.image(
      "object1",
      "https://raw.githubusercontent.com/kiki0307/js/master/drobin%20image/fruitWaste.png"
    );
    this.load.image(
      "object2",
      "https://raw.githubusercontent.com/kiki0307/js/master/drobin%20image/veggieWaste.png"
    );
    this.load.image(
      "object3",
      "https://raw.githubusercontent.com/kiki0307/js/master/drobin%20image/eggshell.png"
    );

    //mp3
    this.load.audio('bgmusic','assets/bensound-memories.mp3');

  }

  create() {
    this.background = this.add.image(400, 300, 'background1');
    text = this.add.text(50, 40, "0", { font: "30px" });
    this.add.text(650,40, 'Level 1', { font: '30px', fill: '#ffffff' }).setScrollFactor(0);

     // music
     this.bgmusicSnd = this.sound.add('bgmusic');

     window.music1 = this.bgmusicSnd;

     window.music1.play();

     window.music1.setVolume(0.2).loop = true;
   
    // new Object1 group
    this.object1();
    this.timedEvent = this.time.addEvent({
      delay: Phaser.Math.FloatBetween(5000,10000), 
      callback: this.object1,
      callbackScope: this,
      loop: true
    });

    // new Object2 group
    this.object2();
    this.timedEvent = this.time.addEvent({
      delay: Phaser.Math.FloatBetween(5000,10000), 
      callback: this.object2,
      callbackScope: this,
      loop: true
    });

    // new Object3 group
    this.object3();
    this.timedEvent = this.time.addEvent({
      delay: Phaser.Math.FloatBetween(5000,10000), 
      callback: this.object3,
      callbackScope: this,
      loop: true
    });

    player = this.physics.add.image(400, 550, "player").setSize(185, 85);

    // create spaceBar key
    var spaceDown = this.input.keyboard.addKey("SPACE");
    spaceDown.on(
      "down",
      function () {
        space = space + 1;
      },
      this
    );
  }

  update() {
    // follow mouse
    this.input.on("pointermove", function (pointer) {
      player.x = pointer.x;
    });

    text.setText("Score:" + score);

    // call function on overlap
    this.physics.add.overlap(player, Object1, this.destroy, null, this);
    this.physics.add.overlap(player, Object2, this.destroy2, null, this);
    this.physics.add.overlap(player, Object3, this.destroy3, null, this);

    // Check for the score
    if (score == 20) {
      score = 0;
      console.log("Collected 20, jump to level 2 Scene Page");
       window.music1.stop();
      this.scene.stop("level1");
      this.scene.start("level2Scene");
    }
  }

  object1() {
    x = Phaser.Math.FloatBetween(0, 800);
    y = Phaser.Math.FloatBetween(-50, 0);
    s = Phaser.Math.FloatBetween(speed1, speed2);
    Object1 = this.physics.add
      .image(x, y, "object1")
      .setSize(50, 80)
      .setVelocityY(200);
  }

  object2() {
    x = Phaser.Math.FloatBetween(0, 800);
    y = Phaser.Math.FloatBetween(-50, 0);
    s = Phaser.Math.FloatBetween(speed1, speed2);
    Object2 = this.physics.add
      .image(x, y, "object2")
      .setSize(80, 80)
      .setVelocityY(200);
  }

  object3() {
    x = Phaser.Math.FloatBetween(0, 800);
    y = Phaser.Math.FloatBetween(-50, 0);
    s = Phaser.Math.FloatBetween(speed1, speed2);
    Object3 = this.physics.add
      .image(x, y, "object3")
      .setSize(60, 80)
      .setVelocityY(200);
  }

  destroy() {
    Object1.setActive(false);
    Object1.setVisible(false);
    if (caught1 == false) {
      caught1 = true;
      score = score + 1;
      console.log(score);
    }
    this.time.delayedCall(
      1000,
      function () {
        caught1 = false;
      },
      [],
      this
    );
  }
  destroy2() {
    Object2.setActive(false);
    Object2.setVisible(false);
    if (caught2 == false) {
      caught2 = true;
      score = score + 1;
      console.log(score);
    }
    this.time.delayedCall(
      1000,
      function () {
        caught2 = false;
      },
      [],
      this
    );
  }
  destroy3() {
    Object3.setActive(false);
    Object3.setVisible(false);
    if (caught3 == false) {
      caught3 = true;
      score = score + 1;
      console.log(score);
    }
    this.time.delayedCall(
      1000,
      function () {
        caught3 = false;
      },
      [],
      this
    );
  }
}