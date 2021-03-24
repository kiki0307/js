class instructions1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instructions1' });
    }


    preload() {
        this.load.image('story2','assets/gameplay.png');

    }

    create () {

        this.add.image(0, 0, 'story2').setOrigin(0, 0);

        // this.add.text(0, 580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is instructionsPage1");

        var spaceDown = this.input.keyboard.addKey('SPACE');
        
        spaceDown.on('down', function(){
        // console.log("Spacebar pressed, goto level1");
        this.scene.stop("instructions1");
        this.scene.start("instructions2");
        }, this );

    }

}
