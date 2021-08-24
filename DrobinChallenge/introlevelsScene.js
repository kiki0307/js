class introlevelsScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'introlevelsScene' });
    }

    preload() {

        this.load.image(
            "background",
            "https://raw.githubusercontent.com/kiki0307/js/master/drobin%20image/bg_red.jpg"
          );
        this.load.image('levels_page','assets/levels.jpg');

        // this.load.audio('failmusic2', 'assets/fail.mp3');

    }

    create () {
        this.background = this.add.image(400, 300, "background").setScale(0.87);

        this.add.image(400, 300, 'levels_page').setScale(0.87);

        // this.failmusic_Snd = this.sound.add('failmusic2');
        // this.failmusic_Snd.play();
        
        // this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is intro levels Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        // var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        // console.log("Spacebar pressed, reply game");
        this.scene.stop("introlevelsScene");
        this.scene.start("level1Scene");
        }, this );

        // aDown.on('down', function(){
        //     // console.log("A pressed (main menu)");
        //     this.scene.stop("failScene2");
        //     this.scene.start("mainScene");
        //     }, this );

    }

}
