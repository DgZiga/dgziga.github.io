const TWO_PI = Math.PI*2;
const PI_OVER2 = Math.PI/2;
const PI_3OVER4 = Math.PI*3/4;
var renderCanvasW = $("#renderCanvas")[0].width;
var renderCanvasH = $("#renderCanvas")[0].height;

function radBoundaries(angle){
    if(angle<0)     {return TWO_PI-Math.abs(angle)}     
    if(angle>TWO_PI){return Math.abs(angle)-TWO_PI}
    return angle
}