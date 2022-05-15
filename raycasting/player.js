function checkMovement(newX, newY){
    var i= Math.floor(newX / cellW);
    var j= Math.floor(newY / cellH);
    return walls[i*1+j*MAP_W] == 0
}

const WALL_PAD_AMT = 10;

function goForwards(player, amount){
    var newY =player.y - amount * player.sina;
    var newX =player.x + amount * player.cosa;
    var checkY =player.y - WALL_PAD_AMT * player.sina;
    var checkX =player.x + WALL_PAD_AMT * player.cosa;
    tryMovePlayer(newX, newY, checkX, checkY);
}

function goBackwards(player, amount){
    var newY =player.y + amount * player.sina;
    var newX =player.x - amount * player.cosa;
    var checkY =player.y + WALL_PAD_AMT * player.sina;
    var checkX =player.x - WALL_PAD_AMT * player.cosa;
    tryMovePlayer(newX, newY, checkX, checkY);
}

function tryMovePlayer(newX, newY, checkX, checkY){
    if(checkMovement(checkX, player.y)){
        player.x=newX;
    }
    if(checkMovement(player.x, checkY)){
        player.y=newY;
    }
}

class Direction {
    // Create new instances of the same class as static attributes
    static FORWARD  = new Direction("FORWARD", goForwards)
    static BACK     = new Direction("DOWN"   , goBackwards)
    static TURN_L   = new Direction("TURN_L" , function(player, amount){player.a-=amount; })   
    static TURN_R   = new Direction("TURN_R" , function(player, amount){player.a+=amount; })   
  
    constructor(name, movementFunc) {
      this.name = name
      this.movementFunc = movementFunc;
    }
}

class Player{
    constructor(x, y, a){
        this.x = x;
        this.y = y;
        this.a = a;
        this.updateInternal();
    }

    moveTo(x, y, a){
        this.x = x;
        this.y = y;
        this.a = a;
        this.updateInternal();
    }

    updateInternal(){
        this.a = radBoundaries(this.a);
        this.cosa = Math.cos(this.a);
        this.sina = Math.sin(this.a);
    }

    moveTowards(direction, amount){
        direction.movementFunc(this, amount);
        this.updateInternal();
    }
}

const player = new Player(4*cellW,20*cellH, Math.PI/4*-1);
