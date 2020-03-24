class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }

    create(){
	this.background= this.add.tileSprite(0,0, config.width, config.height, "background");
	this.background.setOrigin(0,0);

	this.player=this.physics.add.sprite(config.width/2-8, config.height -64, "player");
	this.player.play("thrust");
	this.cursorKeys = this.input.keyboard.createCursorKeys();
	this.player.setCollideWorldBounds(true);

	this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){

	this.background.tilePositionY -= 0.5;

	this.movePlayerManager();

	if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
	    console.log("Fire");
	}
    }

    movePlayerManager(){

	if(this.cursorKeys.left.isDown){
	    this.player.setVelocityX(-gameSettings.playerSpeed);
	}else if(this.cursorKeys.right.isDown){
	    this.player.setVelocityX(gameSettings.playerSpeed);
	}

	
	if(this.cursorKeys.up.isDown){
	    this.player.setVelocityY(-gameSettings.playerSpeed);
	}else if(this.cursorKeys.down.isDown){
	    this.player.setVelocityY(gameSettings.playerSpeed);
	}

    }

}
