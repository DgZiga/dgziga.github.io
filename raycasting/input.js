const MOV_SPEED = 1;
const PI_PERCENTILE = Math.PI/100;
const ROT_SPEED = PI_PERCENTILE*3;

var inputMap = {};
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    inputMap[e.keyCode] = e.type == 'keydown';
}

function handleInput(){
    var rotating = false;
    if(inputMap[37]){ //sx
        player.moveTowards(Direction.TURN_R, ROT_SPEED);
        currentImg = leftImg;
        rotating = true;
    }
    if(inputMap[38]){ //forwards
        player.moveTowards(Direction.FORWARD, MOV_SPEED);
    }
    if(inputMap[39]){ //dx
        player.moveTowards(Direction.TURN_L, ROT_SPEED);
        currentImg = rightImg;
        rotating = true;
    }
    if(inputMap[40]){ //backwards
        player.moveTowards(Direction.BACK, MOV_SPEED);
    }
    if(!rotating){
        currentImg = centerImg;
    }
}