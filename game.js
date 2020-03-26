function tamVentana() {
  var tam = [0, 0];
  if (typeof window.innerWidth != 'undefined')
  {
    tam = [window.innerWidth,window.innerHeight];
  }
  else if (typeof document.documentElement != 'undefined'
      && typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth != 0)
  {
    tam = [
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
    ];
  }
  else   {
    tam = [
        document.getElementsByTagName('body')[0].clientWidth,
        document.getElementsByTagName('body')[0].clientHeight
    ];
  }
  return tam;
}
var tam = tamVentana();

var gameSettings = {
    playerSpeed: 200,
}

var config ={
    width: tam[0],
    height: tam[1],
    backgroundColor: 0x000000,
    scene:[Scene1, Scene2],
    physics:{
	default: "arcade",
	arcade: {
	    debug: false
	}
    }
}

window.onload = function(){
    var game = new Phaser.Game(config);
}
