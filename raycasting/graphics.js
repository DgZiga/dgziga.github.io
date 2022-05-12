var topDownCtx = $("#topDownCanvas")[0].getContext("2d");
var renderCtx = $("#renderCanvas")[0].getContext("2d");

var topDownCanvasW = $("#topDownCanvas")[0].width;
var topDownCanvasH = $("#topDownCanvas")[0].height;
var cellH = 20;
var cellW = 20;
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
            }
        }
    }
}

const PLAYER_RAY_LEN = 10;

function drawTopDownPlayer(){
    topDownCtx.fillStyle = "#FF0000";
    topDownCtx.fillRect(player.x-2, player.y-2, 3, 3);
    topDownCtx.beginPath();
    topDownCtx.lineWidth=1;
    topDownCtx.strokeStyle="#FF0000"
    topDownCtx.moveTo(player.x, player.y);
    topDownCtx.lineTo(player.x+player.cosa*PLAYER_RAY_LEN, player.y-player.sina*PLAYER_RAY_LEN);
    topDownCtx.stroke();
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
    renderTopDownGrid();
    castRay();
    drawTopDownPlayer();

    renderCtx.drawImage(currentImg,0,0)

    handleInput();
    requestAnimationFrame(gameTick);
}