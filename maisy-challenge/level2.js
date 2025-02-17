// static enemies
class level2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'level2' });
        this.liveCount = 3;
        this.fruitCount = 0;

    }

preload() {

     // load images
     var map = this.load.tilemapTiledJSON('map2','assets/tiles2.json');
     this.load.spritesheet('tiles2','assets/Tiles2.png',
     {frameWidth:64,frameHeight:64});


    //  player animation
     this.load.atlas('player', 'assets/Maisy.png', 'assets/Maisy.json');

    //  obstacle animation
     this.load.atlas('trap', 'assets/mousetrap.png', 'assets/mousetrap.json');
 
     this.load.image('heart', 'assets/life.png');

     //mp3
     this.load.audio('explode', 'assets/error_tone.mp3');
     this.load.audio('collect', 'assets/collect_item.mp3');
     this.load.audio('snap', 'assets/mouse_trap.mp3');
     this.load.audio('bgmusic','assets/shopping.mp3');

}

create() {

 // load the map
 var map = this.make.tilemap({key:'map2'});
 var Tiles = map.addTilesetImage('Tiles2','tiles2');

 // music
      
this.explodeSnd = this.sound.add('explode');
this.collectSnd = this.sound.add('collect');
this.snapSnd = this.sound.add('snap');
this.bgmusicSnd = this.sound.add('bgmusic');

window.music1 = this.bgmusicSnd;

window.music1.play();

window.music1.loop = true;
 
 // create the ground layer
 this.groundLayer = map.createDynamicLayer('groundLayer',Tiles,0,0);
 this.shelfLayer = map.createDynamicLayer('shelfLayer',Tiles,0,0);
 this.fruitLayer = map.createDynamicLayer('fruitLayer',Tiles,0,0);
//  this.obstacleLayer = map.createDynamicLayer('obstacleLayer',Tiles,0,0);

 //world boundaries
 this.physics.world.bounds.width = this.groundLayer.width;
 this.physics.world.bounds.height = this.groundLayer.height;

 //object layers
 this.startPoint = map.findObject("objectLayer", obj => obj.name === "startPoint");
 this.endPoint = map.findObject("objectLayer", obj => obj.name === "endPoint");

 //obstacle in tiles
 this.obstacle_1 = map.findObject("objectLayer", obj => obj.name === "obstacle_1");
 this.obstacle_2 = map.findObject("objectLayer", obj => obj.name === "obstacle_2");
 this.obstacle_3 = map.findObject("objectLayer", obj => obj.name === "obstacle_3");
 this.obstacle_4 = map.findObject("objectLayer", obj => obj.name === "obstacle_4");
 this.obstacle_5 = map.findObject("objectLayer", obj => obj.name === "obstacle_5");


 //character sprites
 this.player = this.physics.add.sprite(this.startPoint.x, this.startPoint.y, 'player')
 this.player.setScale(1);
 this.player.setCollideWorldBounds(true);

 window.player = this.player;

 // create the player sprite
 // this.player = this.add.sprite(280, 40, 'player');
 
 // create life
 this.heart1 = this.add.image(50,530, 'heart').setScrollFactor(0);
 this.heart2 = this.add.image(120,530,'heart').setScrollFactor(0);
 this.heart3 = this.add.image(190,530,'heart').setScrollFactor(0);


 // create player animation
 this.anims.create({
 key:'side',
 frames:[
     {key: 'player', frame: 'side_1'},
     {key: 'player', frame: 'side_2'},
     {key: 'player', frame: 'side_3'},
     {key: 'player', frame: 'side_4'},
     {key: 'player', frame: 'side_5'},
     {key: 'player', frame: 'side_6'},
     {key: 'player', frame: 'side_7'},
     {key: 'player', frame: 'side_8'},
    
 ],

 frameRate:10,
 repeat: -1
 });

 this.anims.create({
 key:'front',
 frames:[
     {key: 'player', frame: 'front_1'},
     {key: 'player', frame: 'front_2'},
     {key: 'player', frame: 'front_3'},
     {key: 'player', frame: 'front_4'},
    
 ],

 frameRate:10,
 repeat: -1
 });

 this.anims.create({
 key:'back',
 frames:[
     {key: 'player', frame: 'back_1'},
     {key: 'player', frame: 'back_2'},
     {key: 'player', frame: 'back_3'},
     {key: 'player', frame: 'back_4'},
    
 ],

 frameRate:10,
 repeat: -1
 });



// trap animation
this.anims.create({
key:'trapAnim',
frames:[
{key: 'trap', frame: 'trap_1'},
{key: 'trap', frame: 'trap_2'},
{key: 'trap', frame: 'trap_3'},
{key: 'trap', frame: 'trap_4'},
],
        
frameRate:10,
repeat: -1
});



// create obstacle
this.obstacle_1 = this.physics.add.sprite(this.obstacle_1.x, this.obstacle_1.y, 'trap').play('trapAnim');
this.obstacle_2 = this.physics.add.sprite(this.obstacle_2.x, this.obstacle_2.y, 'trap').play('trapAnim');
this.obstacle_3 = this.physics.add.sprite(this.obstacle_3.x, this.obstacle_3.y, 'trap').play('trapAnim');
this.obstacle_4 = this.physics.add.sprite(this.obstacle_4.x, this.obstacle_4.y, 'trap').play('trapAnim');
this.obstacle_5 = this.physics.add.sprite(this.obstacle_5.x, this.obstacle_5.y, 'trap').play('trapAnim');

this.physics.add.overlap(this.player, this.obstacle_1, this.hitobstacle, null, this )
this.physics.add.overlap(this.player, this.obstacle_2, this.hitobstacle, null, this )
this.physics.add.overlap(this.player, this.obstacle_3, this.hitobstacle, null, this )
this.physics.add.overlap(this.player, this.obstacle_4, this.hitobstacle, null, this )
this.physics.add.overlap(this.player, this.obstacle_5, this.hitobstacle, null, this )


// collide with obstacle layer
//  this.obstacleLayer.setCollisionByProperty({ obstacle: true });

//  this.physics.add.collider(this.obstacleLayer, this.player);

//  //   hit obstacle layer
// this.obstacleLayer.setTileIndexCallback(2, this.hitobstacle, this);


// collide with fruit layer
this.fruitLayer.setCollisionByProperty({ pear: true });
this.fruitLayer.setCollisionByProperty({ banana: true });
this.fruitLayer.setCollisionByProperty({ strawberry: true });
this.fruitLayer.setCollisionByProperty({ grape: true });
this.fruitLayer.setCollisionByProperty({ avocado: true });
this.fruitLayer.setCollisionByProperty({ lemon: true });
this.fruitLayer.setCollisionByProperty({ apple: true });
this.fruitLayer.setCollisionByProperty({ cherry: true });

this.physics.add.collider(this.fruitLayer, this.player);


//   collect vege items
this.fruitLayer.setTileIndexCallback(3, this.collectfruit, this);
this.fruitLayer.setTileIndexCallback(4, this.collectfruit, this);
this.fruitLayer.setTileIndexCallback(10, this.collectfruit, this);
this.fruitLayer.setTileIndexCallback(15, this.collectfruit, this);
this.fruitLayer.setTileIndexCallback(16, this.collectfruit, this);
this.fruitLayer.setTileIndexCallback(5, this.wrongfruit, this);
this.fruitLayer.setTileIndexCallback(8, this.wrongfruit, this);
this.fruitLayer.setTileIndexCallback(9, this.wrongfruit, this);

 // this text will show the score
 this.fruitText = this.add.text(750, 50, this.fruitCount, {
    fontSize: '30px',
    fill: '#221C48'
    });
   
    // fix the text to the camera
    this.fruitText.setScrollFactor(0);
    this.fruitText.visible = true;

this.cursors = this.input.keyboard.createCursorKeys();

// camera view
this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
this.cameras.main.startFollow(this.player);

// create collder
this.shelfLayer.setCollisionByProperty({shelf:true})
this.shelfLayer.setCollisionByProperty({shelf2:true})
this.shelfLayer.setCollisionByProperty({shelf3:true})
this.shelfLayer.setCollisionByProperty({shelf4:true})

this.physics.add.collider(this.shelfLayer,this.player);   

}

// remove fruit
collectfruit(player, tile) {
console.log('correctfruit', tile.index );
this.fruitLayer.removeTileAt(tile.x, tile.y); // remove the item

this.fruitCount += 1; 
this.collectSnd.play();
console.log(this.fruitCount);
this.fruitText.setText(this.fruitCount);
return false;
}

wrongfruit(player, tile) {
console.log('wrongfruit', this.liveCount );
this.fruitLayer.removeTileAt(tile.x, tile.y); // remove the item
this.liveCount -= 1;


// // Default is 3 lives
if ( this.liveCount === 2) {
 this.explodeSnd.play();
 this.cameras.main.shake(200);
 this.heart3.setVisible(false);
} else if ( this.liveCount === 1) {
 this.explodeSnd.play();
 this.cameras.main.shake(200);
 this.heart2.setVisible(false);
} else if ( this.liveCount === 0) {
 this.explodeSnd.play();
 this.cameras.main.shake(1000);
 this.heart1.setVisible(false);
 this.isDead = true;
//  this.scene.start("failScene2");
}

// No more lives, shake screen and restart the game
if ( this.isDead ) {
 console.log("Player is dead!!!")
 window.music1.stop();
// delay 1 sec
this.time.delayedCall(2000,function() {
// Reset counter before a restart
this.isDead = false;
this.liveCount = 3;
this.fruitCount = 0
this.scene.start("failScene2");
},[], this);
}

return false;
}


// remove obstacle
hitobstacle(player, obstacle) {
    console.log('obstacle', obstacle.x, obstacle.y );
    // this.obstacleLayer.removeTileAt(tile.x, tile.y); // remove the item
    this.snapSnd.play();
    window.music1.stop();
    obstacle.disableBody(true,true);
       // delay 1 sec
       this.time.delayedCall(500,function() {
       this.fruitCount = 0
       this.liveCount = 3;
        // this.scene.restart();
       this.scene.start("trapScene2");
    },[], this);
    return false;
    }



   


update() {

    if (this.cursors.left.isDown)
    {
       console.log("left");
       this.player.body.setVelocityX(-300);
       this.player.anims.play('side', true); // walk left
       this.player.flipX = true; // flip the sprite to the left
    }
    else if (this.cursors.right.isDown)
    {
       console.log("right");
       this.player.body.setVelocityX(300);
       this.player.anims.play('side', true);
       this.player.flipX = false; // use the original sprite looking to the right
    } 
    else if (this.cursors.up.isDown)
    {
       console.log("back");
       this.player.body.setVelocityY(-300);
       this.player.anims.play('back', true);
    }
    else if (this.cursors.down.isDown)
    {
       console.log("front");
       this.player.body.setVelocityY(300);
       this.player.anims.play('front', true);
    }

    else {
       this.player.body.setVelocity(0);
       this.player.anims.stop();
    }
    
    // Check for the vegeCount
    if ( this.player.x >= this.endPoint.x && this.player.y >= this.endPoint.y && this.fruitCount > 4 ) {
    console.log('Collected 5 fruit, jump to level 3');
    window.music1.stop();
    this.scene.stop("level2");
    this.scene.start("listScene3");
    }


    
  
}


}