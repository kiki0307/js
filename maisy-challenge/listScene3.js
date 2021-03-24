class listScene3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'listScene3' });
    }

    preload() {
        this.load.image('list_3','assets/list3.png');

    }

    create () {

        this.add.image(0, 0, 'list_3').setOrigin(0, 0);

        this.timedEvent = this.time.addEvent({ delay: 10000, callback: this.delay10Seconds, callbackScope: this, loop: false });

    }

    delay10Seconds(){

        console.log("after 10 secs");
        this.scene.stop("listScene3");
        this.scene.start("level3");
        }  

}
