class failScene2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'failScene2' });
    }

    preload() {
        this.load.image('gameover_2','assets/gameOver2.png');

    }

    create () {

        this.add.image(0, 0, 'gameover_2').setOrigin(0, 0);
        
        // this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is failScene2");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        // var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        // console.log("Spacebar pressed, reply game");
        this.scene.stop("failScene2");
        this.scene.start("level2");
        }, this );

        // aDown.on('down', function(){
        //     // console.log("A pressed (main menu)");
        //     this.scene.stop("failScene2");
        //     this.scene.start("mainScene");
        //     }, this );

    }

}
