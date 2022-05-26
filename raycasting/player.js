function checkMovement(newX, newY){
    var i= Math.floor(newX / cellW);
    var j= Math.floor(newY / cellH);
    return walls[i*1+j*MAP_W] != 1
}

const MAX_SPEED = MOV_SPEED*5
const WALL_PAD_AMT = cellH*2;

function goForwards(player, amount){
    var newY =player.y - amount * player.sina;
    var newX =player.x + amount * player.cosa;
    var checkY =player.y - WALL_PAD_AMT * player.sina;// check Forwards
    var checkX =player.x + WALL_PAD_AMT * player.cosa;// check Forwards
    tryMovePlayer(newX, newY, checkX, checkY);
}
function goBackwards(player, amount){
    var newY =player.y - amount * player.sina;
    var newX =player.x + amount * player.cosa;
    var checkY =player.y + WALL_PAD_AMT * player.sina;// check Backwards
    var checkX =player.x - WALL_PAD_AMT * player.cosa;// check Backwards
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

class Player{
    constructor(x, y, a){
        this.x = x;
        this.y = y;
        this.a = a;
        this.updateInternal();
        this.speed = 0;
    }

    moveTo(x, y, a){
        this.x = x;
        this.y = y;
        this.a = a;
        this.updateInternal();
    }
    
    accellerate(amt){
        this.speed+=amt;
        if(this.speed > MAX_SPEED){
            this.speed = MAX_SPEED;
        }
        if(this.speed < -MAX_SPEED){
            this.speed = -MAX_SPEED;
        }
    }

    setSpeed(amt){
        this.speed=amt;
    }

    updateInternal(){
        this.a = radBoundaries(this.a);
        this.cosa = Math.cos(this.a);
        this.sina = Math.sin(this.a);
    }

    moveTowards(amount){
        this.accellerate(amount/10);
        if(this.speed>0){
            goForwards(this, this.speed);
        }else{
            goBackwards(this, this.speed)
        }
        updateSpeedGauge(this.speed);
        this.updateInternal();
    }

    decellerate(amount){
        if(this.speed > 0){
            this.moveTowards(-amount);
        }else if(this.speed < 0){
            this.moveTowards(amount);
        }
    }

    turn(amt){
        player.a+=amt;
    }
}

const player = new Player(4*cellW,20*cellH, Math.PI/4*-1);
