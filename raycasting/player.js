function checkMovement(newX, newY){
    var i= Math.floor(newX / cellW);
    var j= Math.floor(newY / cellH);
    return walls[i*1+j*MAP_W] != 1
}

var PLAYER_MAX_SPEED;
var   SAND_MAX_SPEED;
var   CURR_MAX_SPEED;


var PLAYER_MAX_ROT_ANGLE;
var PLAYER_MIN_ROT_ANGLE;

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
    //check Sand
    var i= Math.floor(newX / cellW);
    var j= Math.floor(newY / cellH);
    if(walls[i*1+j*MAP_W] == 2){
        CURR_MAX_SPEED = SAND_MAX_SPEED;
    } else {
        CURR_MAX_SPEED = PLAYER_MAX_SPEED;
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
        if(this.speed > CURR_MAX_SPEED){
            this.speed = CURR_MAX_SPEED;
        }
        if(this.speed < -CURR_MAX_SPEED){
            this.speed = -CURR_MAX_SPEED;
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

    moveTowards(amount, brakingAllowed=true){
        if(this.speed>0){
            if(amount<0 && brakingAllowed){ //speed is positive but amount is negative: braking
                this.accellerate(amount/5);
            } else {
                this.accellerate(amount/10);
            }
            goForwards(this, this.speed);

        }else{
            this.accellerate(amount/10);
            goBackwards(this, this.speed)
        }
        updateSpedGraphics(this.speed);
    }

    decellerate(amount){
        if(Math.abs(this.speed) < amount){ //we would continuosly bounce between negative and positive speed
            this.speed = 0;
            updateSpedGraphics(this.speed);
            return;
        }
        if(this.speed > 0){
            this.moveTowards(-amount, false);
        }else if(this.speed < 0){
            this.moveTowards(amount, false);
        }
    }

    turn(mul){
        // rotAngle : rotAngleMax = maxSpeed-speed : maxSpeed
        // rotAngle = rotAngleMax * (maxSpeed - speed) / maxSpeed
        var amt = PLAYER_MAX_ROT_ANGLE * (PLAYER_MAX_SPEED - Math.abs(this.speed)) / PLAYER_MAX_SPEED;
        if(amt < PLAYER_MIN_ROT_ANGLE){amt = PLAYER_MIN_ROT_ANGLE}
        amt*=mul
        player.a+=amt;
        this.updateInternal();
    }
}

const player = new Player(4*cellW,20*cellH, Math.PI/4*-1);
