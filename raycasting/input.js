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


function pressLeft(){
    inputMap[37]=true;
}
function pressRight(){
    inputMap[39]=true;
}

function releaseLeft(){
    inputMap[37]=false;
}
function releaseRight(){
    inputMap[39]=false;
}

function handleSlider(slider){
    if(slider.value <= 33){
        pressLeft();
    } else if(slider.value >= 66){
        pressRight();
    }else{
        releaseLeft();
        releaseRight();
    }
}

function resetSlider(slider){
    releaseLeft();
    releaseRight();
    slider.value=50;
}