const MOV_SPEED = 4;
const PI_PERCENTILE = Math.PI/100;
const ROT_SPEED = PI_PERCENTILE*2;

const BUTTON_LEFT = 37;
const BUTTON_RIGHT = 39;
const BUTTON_FORWARDS = 38;
const BUTTON_BACKWARDS = 40;

var inputMap = {};
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    inputMap[e.keyCode] = e.type == 'keydown';
}

function handleInput(){
    var rotating = false;
    if(inputMap[BUTTON_LEFT]){ //sx
        player.moveTowards(Direction.TURN_R, ROT_SPEED);
        currentImg = leftImg;
        rotating = true;
    }
    if(inputMap[BUTTON_FORWARDS]){ //forwards
        player.moveTowards(Direction.FORWARD, MOV_SPEED);
    }
    if(inputMap[BUTTON_RIGHT]){ //dx
        player.moveTowards(Direction.TURN_L, ROT_SPEED);
        currentImg = rightImg;
        rotating = true;
    }
    if(inputMap[BUTTON_BACKWARDS]){ //backwards
        player.moveTowards(Direction.BACK, MOV_SPEED);
    }
    if(!rotating){
        currentImg = centerImg;
    }
}


function pressButton(button){
    inputMap[button]=true;
}
function releaseButton(button){
    inputMap[button]=false;
}

function handleSlider(slider){
    if(slider.value <= 33){
        pressButton(BUTTON_LEFT);
    } else if(slider.value >= 66){
        pressButton(BUTTON_RIGHT);
    }else{
        releaseButton(BUTTON_LEFT);
        releaseButton(BUTTON_RIGHT);
    }
}

function resetSlider(slider){
    releaseButton(BUTTON_LEFT);
    releaseButton(BUTTON_RIGHT);
    slider.value=50;
}