class failScene3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'failScene3' });
    }

    preload() {
        this.load.image('gameover_3','assets/gameOver3.png');

        this.load.audio('failmusic3', 'assets/fail.mp3');

    }

    create () {

        this.add.image(0, 0, 'gameover_3').setOrigin(0, 0);

        this.failmusic_Snd = this.sound.add('failmusic3');
        this.failmusic_Snd.play();
        
        // this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is failScene3");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        // var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        // console.log("Spacebar pressed, reply game");
        this.scene.stop("failScene3");
        this.scene.start("level3");
        }, this );

        // aDown.on('down', function(){
        //     // console.log("A pressed (main menu)");
        //     this.scene.stop("failScene2");
        //     this.scene.start("mainScene");
        //     }, this );

    }

}
