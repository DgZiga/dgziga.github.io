const MOV_SPEED = 0.001;
const PI_PERCENTILE = Math.PI/100;
const ROT_SPEED = PI_PERCENTILE*2;

const BUTTON_LEFT = 37;
const BUTTON_RIGHT = 39;
const BUTTON_FORWARDS = 38;
const BUTTON_BACKWARDS = 40;


const BUTTON_Z = 90;
const BUTTON_X = 88;
const BUTTON_A = 65;
const BUTTON_S = 83;
const BUTTON_W = 87;
const BUTTON_Q = 81;

var inputMap = {};
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    inputMap[e.keyCode] = e.type == 'keydown';
}

function handleInput(){
    var rotating = false;
    if(inputMap[BUTTON_LEFT]){ //sx
        player.turn(ROT_SPEED);
        currentImg = leftImg;
        rotating = true;
    }
    if(inputMap[BUTTON_FORWARDS]){ //forwards
        player.moveTowards(MOV_SPEED);
    } else {
        player.decellerate(MOV_SPEED);
    }
    if(inputMap[BUTTON_RIGHT]){ //dx
        player.turn(-ROT_SPEED);
        currentImg = rightImg;
        rotating = true;
    }
    if(inputMap[BUTTON_BACKWARDS]){ //backwards
        player.moveTowards(-MOV_SPEED);
    }

    //mode7 params
    if(inputMap[BUTTON_Q]){ //backwards
        NEAR_PLANE += 0.001;
    }
    if(inputMap[BUTTON_A]){ //backwards
        NEAR_PLANE -= 0.001;
    }
    if(inputMap[BUTTON_W]){ //backwards
        FAR_PLANE += 0.001;
    }
    if(inputMap[BUTTON_S]){ //backwards
        FAR_PLANE -= 0.001;
    }
    if(inputMap[BUTTON_Z]){ //backwards
        FOV += ONE_DEG_TO_RAD;
    }
    if(inputMap[BUTTON_X]){ //backwards
        FOV -= ONE_DEG_TO_RAD;
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