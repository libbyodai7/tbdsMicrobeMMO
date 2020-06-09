/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {

  game.load.image('bg', 'assets/background.jpg');
  game.load.image('cold', 'assets/microbes/cold.png');
  game.load.image('mono', 'assets/microbes/mono.png');
  game.load.image('herpes', 'assets/microbes/herpes.png');
  game.load.image('sars', 'assets/microbes/sars.png');
  game.load.image('measles', 'assets/microbes/measles.png');
  game.load.image('cursor', 'assets/cursor.png')


  //  game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
 //   game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
  //   game.load.image('sprite','assets/sprites/sprite.png');
};

Game.create = function(){

  game.add.image(0, 0, 'bg');

  var cold = game.add.sprite(100, 300, 'cold');
  cold.inputEnabled = true;
  cold.input.enableDrag(true);


  var mono = game.add.sprite(300, 300, 'mono');
  mono.inputEnabled = true;
  mono.input.enableDrag(true);

  var herpes = game.add.sprite(500, 300, 'herpes');
  herpes.inputEnabled = true;
  herpes.input.enableDrag(true);

  var sars = game.add.sprite(650, 300, 'sars');
  sars.inputEnabled = true;
  sars.input.enableDrag(true);

  var measles = game.add.sprite(850, 300, 'measles');
  measles.inputEnabled = true;
  measles.input.enableDrag(true);

  this.add.text(50, 400, 'measles', { fontFamily: '"Press Start 2P"' });
  this.add.text(250, 400, 'herpes', { fontFamily: '"Press Start 2P"' });
  this.add.text(450, 400, 'sars', { fontFamily: '"Press Start 2P"' });
  this.add.text(600, 400, 'mono', { fontFamily: '"Press Start 2P"' });
  this.add.text(750, 400, 'common cold', { fontFamily: '"Press Start 2P"' });

//  game.input.setDraggable([ cold, mono, herpes, sars, measles ]);
//  game.input.dragDistanceThreshold = 100;

    Game.playerMap = {};
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);


  //  var map = game.add.tilemap('map');
  //  map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    // var layer;
    // for(var i = 0; i < map.layers.length; i++) {
    //     layer = map.createLayer(i);
    // }
    // layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    // layer.events.onInputUp.add(Game.getCoordinates, this);
    Client.askNewPlayer();
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'cursor');
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var tween = game.add.tween(player);
    var duration = distance*10;
    tween.to({x:x,y:y}, duration);
    tween.start();
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};
