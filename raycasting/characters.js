const BASE_MOV_SPEED = 0.001;
const PI_PERCENTILE = Math.PI/100;
const GAME_MAX_SPEED = BASE_MOV_SPEED*5

class Character{
    constructor(name, maxSpeed, sandMaxSpeed, minRotAngle, maxRotAngle, accel){
        this.name = name;
        this.maxSpeed= maxSpeed
        this.sandMaxSpeed= sandMaxSpeed
        this.minRotAngle= minRotAngle
        this.maxRotAngle= maxRotAngle
        this.accel= accel
    }

    selectAsPlayer(){
        PLAYER_MAX_SPEED = this.maxSpeed;
        SAND_MAX_SPEED = this.sandMaxSpeed;
        CURR_MAX_SPEED = this.maxSpeed;
        PLAYER_MAX_ROT_ANGLE =this.maxRotAngle
        PLAYER_MIN_ROT_ANGLE =this.minRotAngle
        MOV_SPEED = this.accel;
    }

}

const CHARACTERS = [
    new Character("CompleAnna", BASE_MOV_SPEED*4.5, BASE_MOV_SPEED*3, PI_PERCENTILE    , PI_PERCENTILE*3, BASE_MOV_SPEED  ),
    new Character("UgandaBaby", BASE_MOV_SPEED*4  , BASE_MOV_SPEED*4, PI_PERCENTILE*2  , PI_PERCENTILE*4, BASE_MOV_SPEED  ),
    new Character("Ciruzzo"   , BASE_MOV_SPEED*5  , BASE_MOV_SPEED*2, PI_PERCENTILE*0.7, PI_PERCENTILE*2, BASE_MOV_SPEED*2)
];

function selectCharAsPlayer(id){
    var char = CHARACTERS[id];
    char.selectAsPlayer();
    $("#charSelSubtitle")[0].innerHTML = char.name;
    $("#charPortrtaitImg")[0].src = "img/characters/"+char.name+"/portrait.png";

    $("#center")[0].src = "img/characters/"+char.name+"/center.png";
    $("#left")[0].src = "img/characters/"+char.name+"/left.png";
    $("#right")[0].src = "img/characters/"+char.name+"/right.png";

    $("#manovrabilitaTD")[0].innerHTML =Math.ceil(char.minRotAngle+char.maxRotAngle/PI_PERCENTILE);
    $("#masSpeedTD")[0].innerHTML      =(char.maxSpeed/BASE_MOV_SPEED);
    $("#accelTD")[0].innerHTML         =(char.accel/BASE_MOV_SPEED)
    $("#sandTD")[0].innerHTML          =(char.sandMaxSpeed/BASE_MOV_SPEED)

}

function startGame(){
    $("#playerSelectionScreen").hide();
    requestAnimationFrame(gameTick);
}
