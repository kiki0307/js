var space = 0;

class introScene extends Phaser.Scene {
  constructor() {
    super({ key: "introScene" });
  }
  preload() {
    this.load.image(
      "background",
      "https://raw.githubusercontent.com/kiki0307/js/master/drobin%20image/bg_red.jpg"
    );
    this.load.image("intro", "assets/introPage.jpg");
  }

  create() {
    this.background = this.add.image(400, 300, "background").setScale(0.87);
    this.intro = this.add.image(400, 300, "intro").setScale(0.87);
    this.add.text(260, 560, "Press SPACEBAR to start", {
      font: "20px",
      fill: "white"
    });

    // create spaceBar key
    var spaceDown = this.input.keyboard.addKey("SPACE");
    spaceDown.on(
      "down",
      function () {
        space = space + 1;
      },
      this
    );

    var spaceDown = this.input.keyboard.addKey('SPACE');
    var key1 = this.input.keyboard.addKey(49);
    var key2 = this.input.keyboard.addKey(50);
    var key3 = this.input.keyboard.addKey(51);

    key1.on('down', function(){
      this.scene.stop("introScene");
      this.scene.start("level1Scene");
      }, this );

  key2.on('down', function(){
      this.scene.stop("introScene");
      this.scene.start("level2Scene");
      }, this );

  key3.on('down', function(){
      this.scene.stop("introScene");
      this.scene.start("level3Scene");
      }, this );

      spaceDown.on('down', function(){
        // console.log("Spacebar pressed, goto storyline");
        this.scene.stop("introScene");
        this.scene.start("introlevelsScene");
        }, this );

  }

  
}