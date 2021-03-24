class listScene2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'listScene2' });
    }

    preload() {
        this.load.image('list_2','assets/list2.png');

    }

    create () {

        this.add.image(0, 0, 'list_2').setOrigin(0, 0);

        this.timedEvent = this.time.addEvent({ delay: 10000, callback: this.delay10Seconds, callbackScope: this, loop: false });


    }

    delay10Seconds(){

        console.log("after 10 secs");
        this.scene.stop("listScene2");
        this.scene.start("level2");
        }  

}
