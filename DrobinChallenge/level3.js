var space = 0;

var Object1;
var Object2;
var Object3;
var Object4;
var Object5;
var numObject1 = 3;
var numObject2 = 1;
var numObject3 = 1;
var numObject4 = 1;
var numObject5 = 1;

var speed1 = 5;
var speed2 = 10;
var text;
var score = 0;
var caught1 = false;
var caught2 = false;
var caught3 = false;
var caught4 = false;
var caught5 = false;

var x;
var y;
var s;

var player;

class level3 extends Phaser.Scene {
  constructor() {
    super({ key: "level3" });
  }
  preload() {
    this.load.image('background3','assets/bg_level3.jpg');

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
    this.load.image("object4", "assets/meat.png");
    this.load.image("object5", "assets/dairy.png");

     //mp3
     this.load.audio('bgmusic','assets/bensound-memories.mp3');

  }

  create() {
    this.background = this.add.image(400, 300, 'background3');
    text = this.add.text(50, 40, "0", { font: "30px " });
    this.add.text(650,40, 'Level 3', { font: '30px ', fill: '#ffffff' }).setScrollFactor(0);

     // music
     this.bgmusicSnd = this.sound.add('bgmusic');

     window.music1 = this.bgmusicSnd;

     window.music1.play();

     window.music1.setVolume(0.2).loop = true;

    // x = Phaser.Math.FloatBetween(0, 800);
    // y = Phaser.Math.FloatBetween(-200, 0);
    // s = Phaser.Math.FloatBetween(speed1, speed2);

    // failed object1 test
    // Object1 = this.physics.add.group();
    // Object1.create(
    //   Phaser.Math.FloatBetween(0, 800),
    //   Phaser.Math.FloatBetween(-200, 0),
    //   "object1"
    // )
    //   .setSize(50, 80)
    //   .setVelocityY(Phaser.Math.FloatBetween(speed1, speed2));
    // Object1.create(
    //   Phaser.Math.FloatBetween(0, 800),
    //   Phaser.Math.FloatBetween(-200, 0),
    //   "object1"
    // )
    //   .setSize(50, 80)
    //   .setVelocityY(Phaser.Math.FloatBetween(speed1, speed2));
    // Object1.create(
    //   Phaser.Math.FloatBetween(0, 800),
    //   Phaser.Math.FloatBetween(-200, 0),
    //   "object1"
    // )
    //   .setSize(50, 80)
    //   .setVelocityY(Phaser.Math.FloatBetween(speed1, speed2));
    //   console.log(Object1.getChildren([0]))

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

    // new Object4 group
    this.object4();
    this.timedEvent = this.time.addEvent({
      delay: Phaser.Math.FloatBetween(5000,10000), 
      callback: this.object4,
      callbackScope: this,
      loop: true
    });

      // new Object5 group
      this.object5();
      this.timedEvent = this.time.addEvent({
        delay: Phaser.Math.FloatBetween(5000,10000), 
        callback: this.object5,
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
    this.physics.add.overlap(player, Object4, this.destroy4, null, this);
    this.physics.add.overlap(player, Object5, this.destroy5, null, this);

    // Check for the score
    if (score == 30) {
      score = 0;
      console.log("Collected 30, jump to winScene");
       window.music1.stop();
      this.scene.stop("level3");
      this.scene.start("winScene");
    }

    // Default is 1 live
    if (score < 0) {
      // this.explodeSnd.play();
      // this.cameras.main.shake(1000);
      // this.heart1.setVisible(false);
      window.music1.stop();
      this.isDead = true;
    }

    // No more lives, shake screen and restart the game
    if (this.isDead) {
      console.log("Player is dead!!!");
      // delay 1 sec
      this.time.delayedCall(
        1000,
        function () {
          // Reset counter before a restart
          this.isDead = false;
          score = 0;
          this.scene.start("failScene2");
        },[],
        this
      );
    }
  
  }


  object1() {
    x = Phaser.Math.FloatBetween(0, 800);
    y = Phaser.Math.FloatBetween(-80, 0);
    s = Phaser.Math.FloatBetween(speed1, speed2);
    Object1 = this.physics.add
      .image(x, y, "object1")
      .setSize(50, 80)
      .setVelocityY(250);
  }

  object2() {
    x = Phaser.Math.FloatBetween(0, 800);
    y = Phaser.Math.FloatBetween(-80, 0);
    s = Phaser.Math.FloatBetween(speed1, speed2);
    Object2 = this.physics.add
      .image(x, y, "object2")
      .setSize(80, 80)
      .setVelocityY(250);
  }

  object3() {
    x = Phaser.Math.FloatBetween(0, 800);
    y = Phaser.Math.FloatBetween(-80, 0);
    s = Phaser.Math.FloatBetween(speed1, speed2);
    Object3 = this.physics.add
      .image(x, y, "object3")
      .setSize(60, 80)
      .setVelocityY(250);
  }

  object4() {
    x = Phaser.Math.FloatBetween(0, 800);
    y = Phaser.Math.FloatBetween(-80, 0);
    s = Phaser.Math.FloatBetween(speed1, speed2);
    Object4 = this.physics.add
      .image(x, y, "object4")
      .setSize(60, 80)
      .setVelocityY(250);
  }

  object5() {
    x = Phaser.Math.FloatBetween(0, 800);
    y = Phaser.Math.FloatBetween(-80, 0);
    s = Phaser.Math.FloatBetween(speed1, speed2);
    Object5 = this.physics.add
      .image(x, y, "object5")
      .setSize(60, 80)
      .setVelocityY(250);
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

  destroy4() {
    Object4.setActive(false);
    Object4.setVisible(false);
    if (caught4 == false) {
      caught4 = true;
      score = score -= 1;
      this.cameras.main.shake(200);
      console.log(score);
    }
    this.time.delayedCall(
      1000,
      function () {
        caught4 = false;
      },
      [],
      this
    );
  }

  destroy5() {
    Object5.setActive(false);
    Object5.setVisible(false);
    if (caught5 == false) {
      caught5 = true;
      score = score -= 1;
      this.cameras.main.shake(200);
      console.log(score);
    }
    this.time.delayedCall(
      1000,
      function () {
        caught5 = false;
      },
      [],
      this
    );
  }

  // runGame() {
  //   fill(0);
  //   clear();
  //   image(img1, 0, 0, 800, 600);
  //   textSize(60);
  //   fill("white");
  //   textFont("Lato");
  //   stroke(255);
  //   text(score, 50, 80);
  //   Player.position.x = mouseX;

  //   Obj1();
  //   Obj2();
  //   Obj3();

  //   if (score > 20) {
  //     text("Good  Job!!!", 250, height / 2);
  //     noLoop();
  //   } else if (score < 0) {
  //     text("You  Fail!!!", 200, height / 2);
  //     noLoop();
  //   }

  //   noStroke();
  //   textSize(60);
  //   fill("white");
  //   textFont("Lato");
  //   text("Level 1", 570, 80);

  //   function Obj1() {
  //     for (let j = 0; j < numObject1; j++) {
  //       Object1[j].velocity.y = speed1;

  //       if (Player.overlap(Object1[j])) {
  //         // Move the object
  //         Object1[j].position.x = -100;
  //         Object1[j].position.y = -100;

  //         score++;
  //       }
  //       // Reset the objects
  //       if (Object1[j].position.y > height) {
  //         Object1[j].position.x = random(0, width);
  //         Object1[j].position.y = random(-200, 0);
  //       }
  //     }
  //   }

  //   function Obj2() {
  //     for (let j = 0; j < numObject2; j++) {
  //       Object2[j].velocity.y = speed2;

  //       if (Player.overlap(Object2[j])) {
  //         // Move the object
  //         Object2[j].position.x = -100;
  //         Object2[j].position.y = -100;

  //         score++;
  //       }
  //       // Reset the objects
  //       if (Object2[j].position.y > height) {
  //         Object2[j].position.x = random(0, width);
  //         Object2[j].position.y = random(-200, 0);
  //       }
  //     }
  //   }

  //   function Obj3() {
  //     for (let j = 0; j < numObject3; j++) {
  //       Object3[j].velocity.y = speed1;

  //       if (Player.overlap(Object3[j])) {
  //         // Move the object
  //         Object3[j].position.x = -100;
  //         Object3[j].position.y = -100;

  //         score++;
  //       }
  //       // Reset the objects
  //       if (Object3[j].position.y > height) {
  //         Object3[j].position.x = random(0, width);
  //         Object3[j].position.y = random(-200, 0);
  //       }
  //     }
  //   }
  // }
}