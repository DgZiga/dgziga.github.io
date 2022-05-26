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
    var moving = false;
    if(inputMap[BUTTON_LEFT]){ //sx
        player.turn(ROT_SPEED);
        currentImg = leftImg;
        rotating = true;
    }
    if(inputMap[BUTTON_FORWARDS]){ //forwards
        player.moveTowards(MOV_SPEED);
        moving = true;
    }
    if(inputMap[BUTTON_RIGHT]){ //dx
        player.turn(-ROT_SPEED);
        currentImg = rightImg;
        rotating = true;
    }
    if(inputMap[BUTTON_BACKWARDS]){ //backwards
        player.moveTowards(-MOV_SPEED);
        moving = true;
    }
    if(!moving){
        player.decellerate(MOV_SPEED/2);
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

function pressButtonAndPrevent(event, button){
    event.preventDefault();
    event.stopPropagation();
    pressButton(button);
}
function releaseButtonAndPrevent(event, button){
    event.preventDefault();
    event.stopPropagation();
    releaseButton(button);
}

function handleMobileTurn(event){
    event.preventDefault();
    event.stopPropagation();
    var movButton =document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY).dataset.movButton;
    if(movButton === undefined){
        return;
    }
    releaseButton(BUTTON_LEFT);
    releaseButton(BUTTON_RIGHT);
    if(movButton !== 0){
        pressButton(movButton);
    }
}

function releaseAll(){
    releaseButton(BUTTON_LEFT);
    releaseButton(BUTTON_RIGHT);
}

$("#leftCtrl")[0].addEventListener ('touchmove', handleMobileTurn); 
$("#centrCtrl")[0].addEventListener('touchmove', handleMobileTurn); 
$("#rightCtrl")[0].addEventListener('touchmove', handleMobileTurn); 

$("#leftCtrl")[0].addEventListener ('touchstart', handleMobileTurn); 
$("#centrCtrl")[0].addEventListener('touchstart', handleMobileTurn); 
$("#rightCtrl")[0].addEventListener('touchstart', handleMobileTurn); 

$("#leftCtrl")[0].addEventListener ('touchend', releaseAll); 
$("#centrCtrl")[0].addEventListener('touchend', releaseAll); 
$("#rightCtrl")[0].addEventListener('touchend', releaseAll); 
