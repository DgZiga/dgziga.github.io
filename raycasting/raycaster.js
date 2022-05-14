var debug = false;

const ONE_DEG_TO_RAD = 0.0174533;
const RAYS_NO = 240;
const FOV = 60; //deg
const RAYS_DEGREE_INCREMENT = ONE_DEG_TO_RAD/(RAYS_NO/FOV);
const HALD_RAYS_NO = RAYS_NO/2;
const LINE_WIDTH_COMPENSATION = 2; //if we were to draw a line exactly (renderCanvasW / RAYS_NO)px wide, the canvas would break (small gaps would form), so we are adding a little bit of imprecision to fix this
const RENDER_WIDTH_PER_RAY = renderCanvasW / RAYS_NO;
const DEFAULT_TMP_DIST = 9999999;

//Pitagora
function distance(srcX, srcY, dstX, dstY){
    return Math.sqrt(((srcX-dstX)*(srcX-dstX))*1 + ((srcY-dstY)*(srcY-dstY))*1)
}

function castRay(){

    var rayY, rayX;     //First line hit coords 
    var rayOY, rayOX;   //Second line hit coords

    var mapX, mapY, mapI;

    var dof = 0; //depth of field
    var tmpDist, finalX, finalY;

    var color;

    var rayCounter = HALD_RAYS_NO*-1
    for(var i=0; i<RAYS_NO; i++){
        var rayA = radBoundaries(player.a*1 + rayCounter*RAYS_DEGREE_INCREMENT);
        rayCounter++;
        var tan = Math.tan(rayA);
        var aTan = 1/tan;

        rayY=0; rayX=0; rayOY=0; rayOX=0; mapX=0; mapY=0; mapI=0; dof = 0; tmpDist=DEFAULT_TMP_DIST; finalX=0; finalY=0;

        debug && console.log("aTan: "+aTan);debug && console.log("rayA: "+rayA);

        //check horizontal lines
        if( rayA == PI_OVER2 || rayA == PI_3OVER4){ //Vertical
            debug && console.log("Vertical, skipping horizontal check");
            rayX = player.x;
            rayY = player.y;
            dof = MAP_W;
        } else if( Math.cos(rayA) < 0){ //looking left
            debug && console.log("lookingLeft");
            rayX = Math.floor(player.x/cellW)*cellW-0.0001;
            rayY = (player.x-rayX)*tan+player.y;
            rayOX = -cellW; 
            rayOY = -1*rayOX*tan;
        } else { //Looking right
            debug && console.log("lookingRight");
            rayX = Math.floor(player.x/cellW)*cellW+cellW*1;
            rayY = (player.x-rayX)*tan+player.y;
            rayOX = cellW; 
            rayOY = -1*rayOX*tan;
        }
        debug && console.log("rayY: "+ rayY);debug && console.log("rayX: "+ rayX);debug && console.log("rayOY: "+ rayOY);debug && console.log("rayOX: "+ rayOX);var color = "#0000FF"
        while(dof < MAP_W && rayX > 0 && rayY > 0){
            mapX = Math.floor(rayX/cellW);
            mapY = Math.floor(rayY/cellH);
            mapI = mapX*1+mapY*MAP_W;
            debug && console.log("trying mapX: "+ mapX + ", mapY: "+mapY+", mapI: "+mapI);
            if(walls[mapI] == 1){
                debug && console.log("hit wall with dof: "+dof+", mapX: "+mapX+", mapY: "+mapY+", rayX: "+rayX+", rayY:"+ rayY);
                finalX = rayX;
                finalY = rayY;
                tmpDist = distance(player.x, player.y, rayX, rayY);
                color = "rgb(0, 153, 51)"
                dof = MAP_W;
            }else{
                rayX += rayOX*1;
                rayY += rayOY*1;
                dof++;
            }
        }

        dof = 0;
        //check vertical lines
        if( rayA == 0 || rayA == Math.PI){ //Horizontal
            debug && console.log("Horizontal, skipping vertical check");
            rayX = player.x;
            rayY = player.y;
            dof = MAP_W;
        } else if( Math.sin(rayA) > 0){ //looking Up
            debug && console.log("lookingUp");
            rayY = Math.floor(player.y/cellH)*cellH-0.0001;
            rayX = (player.y-rayY)*aTan+player.x;
            rayOY = -cellH;
            rayOX = -1*rayOY*aTan;
        } else { //Looking down
            debug && console.log("lookingDown");
            rayY = Math.floor(player.y/cellH)*cellH+cellW*1;
            rayX = (player.y-rayY)*aTan+player.x;
            rayOY = cellH;
            rayOX = -1*rayOY*aTan;
        }
        debug && console.log("rayY: "+ rayY);debug && console.log("rayX: "+ rayX);debug && console.log("rayOY: "+ rayOY);debug && console.log("rayOX: "+ rayOX);
        while(dof < MAP_W && rayX > 0 && rayY > 0){
            mapX = Math.floor(rayX/cellW);
            mapY = Math.floor(rayY/cellH);
            mapI = mapX*1+mapY*MAP_W;
            debug && console.log("trying mapX: "+ mapX + ", mapY: "+mapY+", mapI: "+mapI);
            if(walls[mapI] == 1){
                debug && console.log("hit wall with dof: "+dof+", mapX: "+mapX+", mapY: "+mapY+", rayX: "+rayX+", rayY:"+ rayY);
                var vDist = distance(player.x, player.y, rayX, rayY);
                debug && console.log("vDist:"+vDist+", hDist: "+tmpDist);
                if(tmpDist == undefined || vDist < tmpDist){
                    tmpDist = vDist;
                    finalX = rayX;
                    finalY = rayY;
                    color = "rgb(51, 204, 51)"
                }
                dof = MAP_W;
            }else{
                rayX += rayOX*1;
                rayY += rayOY*1;
                dof++;
            }
        }
        if(tmpDist != 0 && tmpDist != DEFAULT_TMP_DIST){ //found collision

            //Stroke 2d topdown
            topDownCtx.beginPath();
            topDownCtx.lineWidth=1;
            topDownCtx.strokeStyle="#00FF00"
            topDownCtx.moveTo(player.x/PLAYER_COORD_SCALING, player.y/PLAYER_COORD_SCALING);
            topDownCtx.lineTo(finalX/PLAYER_COORD_SCALING, finalY/PLAYER_COORD_SCALING);
            topDownCtx.stroke();

            //Fix fisheye
            var deltaAngle = radBoundaries(player.a - rayA);
            tmpDist = tmpDist * Math.cos(deltaAngle);

            //Calc lineH
            var lineH = renderCanvasH * cellH / tmpDist;
            lineH = lineH > renderCanvasH ? renderCanvasH : lineH;

            //Render
            renderCtx.lineWidth=RENDER_WIDTH_PER_RAY+LINE_WIDTH_COMPENSATION;
            
            //Draw ceiling
            renderCtx.beginPath();
            renderCtx.strokeStyle="#77cff2"
            renderCtx.moveTo(renderCanvasW-RENDER_WIDTH_PER_RAY * i, 0);
            renderCtx.lineTo(renderCanvasW-RENDER_WIDTH_PER_RAY * i, renderCanvasH/2 - lineH/2);
            renderCtx.stroke();
            //draw wall
            renderCtx.beginPath();
            renderCtx.strokeStyle=color
            renderCtx.moveTo(renderCanvasW-RENDER_WIDTH_PER_RAY * i, renderCanvasH/2 - lineH/2);
            renderCtx.lineTo(renderCanvasW-RENDER_WIDTH_PER_RAY * i, renderCanvasH/2 + lineH/2);
            renderCtx.stroke();
            //Draw floor
            renderCtx.beginPath();
            renderCtx.strokeStyle="#3be351"
            renderCtx.moveTo(renderCanvasW-RENDER_WIDTH_PER_RAY * i, renderCanvasH/2 + lineH/2);
            renderCtx.lineTo(renderCanvasW-RENDER_WIDTH_PER_RAY * i, renderCanvasH);
            renderCtx.stroke();
            
        } else {

            //Draw ceiling
            renderCtx.beginPath();
            renderCtx.strokeStyle="#77cff2"
            renderCtx.moveTo(renderCanvasW-RENDER_WIDTH_PER_RAY * i, 0);
            renderCtx.lineTo(renderCanvasW-RENDER_WIDTH_PER_RAY * i, renderCanvasH/2);
            renderCtx.stroke();
            //Draw floor
            renderCtx.beginPath();
            renderCtx.strokeStyle="#3be351"
            renderCtx.moveTo(renderCanvasW-RENDER_WIDTH_PER_RAY * i, renderCanvasH/2);
            renderCtx.lineTo(renderCanvasW-RENDER_WIDTH_PER_RAY * i, renderCanvasH);
            renderCtx.stroke();

        }

    }
}