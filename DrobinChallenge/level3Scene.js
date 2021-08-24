class level3Scene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level3Scene' });
    }

    preload() {
        this.load.image('level3_page','assets/level3.jpg');

        // this.load.audio('failmusic2', 'assets/fail.mp3');

    }

    create () {

        this.add.image(0, 0, 'level3_page').setOrigin(0, 0);

        // this.failmusic_Snd = this.sound.add('failmusic2');
        // this.failmusic_Snd.play();
        
        // this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is Level3 Scene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        // var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        // console.log("Spacebar pressed, reply game");
        this.scene.stop("level3Scene");
        this.scene.start("level3");
        }, this );

        // aDown.on('down', function(){
        //     // console.log("A pressed (main menu)");
        //     this.scene.stop("failScene2");
        //     this.scene.start("mainScene");
        //     }, this );

    }

}
