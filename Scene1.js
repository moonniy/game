class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }

    preload(){
	this.load.image("background", "assets/images/background.png");

	this.load.image("asteroid","assets/images/Asteroid01.png",{
	    frameWidth: 16,
	    frameHeight: 16
	});

	this.load.image("asteroid02","assets/images/Asteroid02.png",{
	    frameWidth: 32,
	    frameHeight: 16
	});
	
	this.load.image("asteroid03","assets/images/Asteroid03.png",{
	    frameWidth: 32,
	    frameHeight: 16
	});
	this.load.spritesheet("explosion","assets/spritesheets/explosion.png",{
	    frameWidth: 16,
	    frameHeight: 16
	});
/*
	this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
	    frameWidth: 16,
	    frameHeight: 16
	});
*/
	this.load.image("player","assets/images/ship3.png",{
	    frameWidth: 64,
	    frameHeight: 64
	});

	this.load.spritesheet("beam","assets/spritesheets/laser.png",{
	    frameWidth: 16,
	    frameHeight: 16
	});

	this.load.bitmapFont("pixelFont","assets/font/font.png","assets/font/font.xml");

    }
    
    create(){
        this.add.text(20,20, "Loading game... ");   
        this.scene.start("playGame");


	this.anims.create({
	    key: "beam_anim",
	    frames: this.anims.generateFrameNumbers("beam"),
	    frameRate: 20,
	    repeat: -1
	});
	/*
	this.anims.create({
	    key: "ship1_anim",
	    frames: this.anims.generateFrameNumbers("ship"),
	    frameRate: 20,
	    repeat: -1
	});
	this.anims.create({
	    key: "ship2_anim",
	    frames: this.anims.generateFrameNumbers("ship2"),
	    frameRate: 20,
	    repeat: -1
	});
		this.anims.create({
	    key: "ship3_anim",
	    frames: this.anims.generateFrameNumbers("ship3"),
	    frameRate: 20,
	    repeat: -1
	});
*/	this.anims.create({
	    key: "explode",
	    frames: this.anims.generateFrameNumbers("explosion"),
	    frameRate: 20,
	    repeat: -0,
	    hideOnComplete: true
	});
/*
	this.anims.create({
	    key: "red",
	    frames: this.anims.generateFrameNumbers("power-up", {
		start: 0,
		end: 1
	    }),
	    frameRate: 20,
	    repeat: -1
	});
	this.anims.create({
	    key: "gray",
	    frames: this.anims.generateFrameNumbers("power-up", {
		start: 2,
		end: 3
	    }),
	    frameRate: 20,
	    repeat: -1
	});

	this.anims.create({
	    key: "thrust",
	    frames: this.anims.generateFrameNumbers("player"),
	    frameRate: 20,
	    repeat: -1
	});

*/
	
    }
    

}
