class Scene2 extends Phaser.Scene {
    constructor() {
	super("playGame");
    }

    create() {

	this.background = this.add.tileSprite(0, 0, config.width, config.height , "background");
	this.background.setOrigin(0, 0);

	this.asteroid1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "asteroid");
	this.asteroid2 = this.add.sprite(config.width / 2, config.height / 2, "asteroid02");
	this.asteroid3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "asteroid03");


	this.enemies = this.physics.add.group();
	this.enemies.add(this.asteroid1);
	this.enemies.add(this.asteroid2);
	this.enemies.add(this.asteroid3);
	
	this.asteroid1.setInteractive();
	this.asteroid2.setInteractive();
	this.asteroid3.setInteractive();

	this.input.on('gameobjectdown', this.destroyShip, this);

/*	this.add.text(20, 20, "Playing game", {
	    font: "25px Arial",
	    fill: "yellow"
	});
*/
	this.physics.world.setBoundsCollision();

	this.powerUps = this.physics.add.group();


	for (var i = 0; i < gameSettings.maxPowerups; i++) {
	    var powerUp = this.physics.add.sprite(16, 16, "power-up");
	    this.powerUps.add(powerUp);
	    powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

	    if (Math.random() > 0.5) {
		powerUp.play("red");
	    } else {
		powerUp.play("gray");
	    }

	    powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
	    powerUp.setCollideWorldBounds(true);
	    powerUp.setBounce(1);

	}


	this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
	//    this.player.play("thrust");
	this.cursorKeys = this.input.keyboard.createCursorKeys();
	this.player.setCollideWorldBounds(true);


	this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

	this.projectiles = this.add.group();

	this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
	    projectile.destroy();
	});

	this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

	this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

	this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);


	var graphics = this.add.graphics();
	graphics.fillStyle(0x000000, 1);
	graphics.beginPath();
	graphics.moveTo(0, 0);
	graphics.lineTo(config.width, 0);
	graphics.lineTo(config.width, 20);
	graphics.lineTo(0, 20);
	graphics.lineTo(0, 0);
	graphics.closePath();
	graphics.fillPath();

	
	this.score = 0;
	this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 24);

	this.beamSound = this.sound.add("audio_beam");
	this.explosionSound = this.sound.add("audio_explosion");
	this.resetSound = this.sound.add("audio_reset");
	this.music = this.sound.add("music");

	var musicConfig = {
	    mute: false,
	    volume: 1,
	    rate: 1,
	    detune: 0,
	    seek: 0,
	    loop: false,
	    delay: 0
	}
	this.music.play(musicConfig);
	
    }

/*    pickPowerUp(player, powerUp) {
	powerUp.disableBody(true, true);
    }
*/
    hurtPlayer(player, enemy) {
	this.resetShipPos(enemy);
	if(this.player.alpha < 1){
	    return;
	}
	var explosion = new Explosion(this, player.x, player.y);
	player.disableBody(true,true);
	//this.resetPlayer();
	this.time.addEvent({
	    delay: 1000,
	    callback: this.resetPlayer,
	    callbackScope: this,
	    loop: false
	});

    }

    hitEnemy(projectile, enemy) {
	var explosion = new Explosion(this, enemy.x, enemy.y);
	projectile.destroy();
	this.resetShipPos(enemy);
	this.score += 15;
	this.scoreLabel.text = "SCORE " + this.score;
	var scoreFormated = this.zeroPad(this.score, 6);
	this.scoreLabel.text = "SCORE " + scoreFormated;

	this.explosionSound.play();
    }

    resetPlayer(){
	var x = config.width / 2 - 8;
	var y = config.height - 64;
	this.player.enableBody(true, x, y, true, true);
	this.score = 0;
	this.scoreLabel.text = "SCORE " + this.score;
	this.player.alpha = 0.5;

	this.resetSound.play();
	var tween = this.tweens.add({
	    targets: this.player,
	    y: config.height -64,
	    ease: 'Power1',
	    duration: 1500,
	    repeat: 0,
	    onComplete: function(){
		this.player.alpha = 1;
	    },
	    callbackScope: this
	});

    }


    zeroPad(number, size){
	var stringNumber = String(number);
	while(stringNumber.length < (size || 2)){
            stringNumber = "0" + stringNumber;
	}
	return stringNumber;
    }
   
    update() {

	this.moveShip(this.asteroid1, 1);
	this.moveShip(this.asteroid2, 2);
	this.moveShip(this.asteroid3, 3);
	// this.ship1.alpha = 0;
	// this.ship2.alpha = 0;
	// this.ship3.alpha = 0;

	this.background.tilePositionY -= 0.5;


	this.movePlayerManager();


	if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.shootBeam();
	    if(this.player.active){
		this.shootBeam();
	    }
	}
 	for(var i = 0; i < this.projectiles.getChildren().length; i++){
	    var beam = this.projectiles.getChildren()[i];
	    beam.update();
	}


    }

    shootBeam(){
	var beam = new Beam(this);
	this.beamSound.play();
    }


    movePlayerManager(){

	this.player.setVelocity(0);

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



    moveShip(asteroid, speed) {
	asteroid.y += speed;
	if (asteroid.y > config.height) {
	    this.resetShipPos(asteroid);
	}
    }

    resetShipPos(asteroid) {
	asteroid.y = 0;
	var randomX = Phaser.Math.Between(0, config.width);
	asteroid.x = randomX;
    }

    destroyShip(pointer, gameObject) {
	gameObject.setTexture("explosion");
	gameObject.play("explode");
    }


}
