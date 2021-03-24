class listScene1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'listScene1' });
    }

    preload() {
        this.load.image('list_1','assets/list1.png');

    }
     

    create () {

        this.add.image(0, 0, 'list_1').setOrigin(0, 0);

        this.timedEvent = this.time.addEvent({ delay: 10000, callback: this.delay10Seconds, callbackScope: this, loop: false });

    }

    delay10Seconds(){

    console.log("after 10 secs");
    this.scene.stop("listScene1");
    this.scene.start("level1");
    }  

}
