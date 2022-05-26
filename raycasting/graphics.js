var topDownCtx = $("#topDownCanvas")[0].getContext("2d");
var renderCtx = $("#renderCanvas")[0].getContext("2d");

var topDownCanvasW = $("#topDownCanvas")[0].width;
var topDownCanvasH = $("#topDownCanvas")[0].height;
var cellH = 1/MAP_H;
var cellW = 1/MAP_W;
var topDownWallH = topDownCanvasH/MAP_H;
var topDownWallW = topDownCanvasW/MAP_W ;


//topDownCtx.transform(1, 0, 0, -1, 0, topDownCanvasH)

//render Grid
function renderTopDownGrid(){
    for(var x = 0; x<=MAP_W; x++){
        topDownCtx.beginPath();
        topDownCtx.strokeStyle="gray"
        topDownCtx.lineWidth=1;
        topDownCtx.moveTo(x*topDownWallW, 0);
        topDownCtx.lineTo(x*topDownWallW, topDownCanvasH);
        topDownCtx.stroke();
    }
    for(var y = 0; y<=MAP_H; y++){
        topDownCtx.beginPath();
        topDownCtx.lineWidth=1;
        topDownCtx.strokeStyle="gray"
        topDownCtx.moveTo(0, y*topDownWallH);
        topDownCtx.lineTo(topDownCanvasW, y*topDownWallH);
        topDownCtx.stroke();
    }
}

function fillTopDownWalls(){
    for(var x = 0; x<MAP_W; x++){
        for(var y = 0; y<MAP_H; y++){
            if(walls[x*1+y*MAP_W] == 1){
                topDownCtx.fillStyle = "#000000";
                topDownCtx.fillRect(x*topDownWallW, y*topDownWallH, topDownWallW, topDownWallH);
            }else if(walls[x*1+y*MAP_W] == 2){
                topDownCtx.fillStyle = "#c49000";
                topDownCtx.fillRect(x*topDownWallW, y*topDownWallH, topDownWallW, topDownWallH);
            }else{
                topDownCtx.fillStyle = "#FFFFFF";
                topDownCtx.fillRect(x*topDownWallW, y*topDownWallH, topDownWallW, topDownWallH);
            }
        }
    }
}

const PLAYER_COORD_SCALING = cellH/topDownWallH;
const PLAYER_RAY_LEN = cellH/PLAYER_COORD_SCALING;

function drawTopDownPlayer(){
    topDownCtx.fillStyle = "#FF0000";
    topDownCtx.fillRect(player.x/PLAYER_COORD_SCALING-2, player.y/PLAYER_COORD_SCALING-2, 3, 3);
    topDownCtx.beginPath();
    topDownCtx.lineWidth=1;
    topDownCtx.strokeStyle="#FF0000"
    topDownCtx.moveTo(player.x/PLAYER_COORD_SCALING, player.y/PLAYER_COORD_SCALING);
    topDownCtx.lineTo(player.x/PLAYER_COORD_SCALING+player.cosa*PLAYER_RAY_LEN, player.y/PLAYER_COORD_SCALING-player.sina*PLAYER_RAY_LEN);
    topDownCtx.stroke();
}

function schifo(){
    var ctx = $("#bgCnv")[0].getContext("2d");
    var img = $("#bgImg")[0];
    var height = renderCanvasH;
    var width = renderCanvasW;
    var slice_height = height/4
    var half_slice_width_increase = 0.5
    for (var ix=height-slice_height;ix>=0;ix-=slice_height){
        // move a section of the source image to the target canvas
        ctx.drawImage(img, 
            0,ix, width,
              slice_height,0-half_slice_width_increase,
              width,slice_height);
        // stretch the whole canvas
        ctx.scale(scale_ratio, 1);
    }
}

const SPEED_GAUGE_MAX = 30; //vh

function updateSpedGraphics(speed){
    updateSpeedGauge(speed);
    updateFOV(speed);
}

function updateFOV(speed){
    var fov = Math.abs(speed) * MAX_FOV / GAME_MAX_SPEED ;
    if(fov < MIN_FOV){fov = MIN_FOV}
    FOV = fov;
}

function updateSpeedGauge(speed){
    var h = Math.abs(speed) * SPEED_GAUGE_MAX / GAME_MAX_SPEED ;
    var negative = SPEED_GAUGE_MAX-h;
    $("#speedMeter")[0].style.height = h+"vh";
    $("#emptySpeedMeter")[0].style.height = negative+"vh";
}

let lastValidTimestamp = -1;
const TARGET_FPS = 60;
const TARGET_MS = 1000/TARGET_FPS;

var centerImg = $("#center")[0];
var leftImg = $("#left")[0];
var rightImg = $("#right")[0];

var currentImg = centerImg;

function gameTick(timestamp){
    var delta = timestamp-lastValidTimestamp; 
    if(delta < TARGET_MS){  
        requestAnimationFrame(gameTick);
        return;
    } 
    lastValidTimestamp=timestamp;

    //console.log(delta);
    topDownCtx.clearRect(0,0, topDownCanvasW, topDownCanvasH);
    renderCtx.clearRect(0,0, renderCanvasW, renderCanvasH);
	fillTopDownWalls();
    //renderTopDownGrid();
    //castRay();
    renderMode7();
    drawTopDownPlayer();

    renderCtx.drawImage(currentImg,0,0)

    handleInput();
    requestAnimationFrame(gameTick);
}