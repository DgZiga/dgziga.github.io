var NEAR_PLANE = 0.03;
var FAR_PLANE = 0.05;
const ONE_DEG_TO_RAD = 0.0174533;
var FOV = 60*ONE_DEG_TO_RAD;
/* const TEXTURE_W = 32;
const TEXTURE_H = 32; */
const TEXTURE_W = 1024;
const TEXTURE_H = 1024; 
const COLOR_SPACE = 3 //each pixel is described by 3 values: r, g, and b 

var drawTopDown = true;
var done = false;

function renderMode7(){
    // Create Frustum corner points
    var fFarX1 = player.x + Math.cos(player.a + FOV/2) * FAR_PLANE;
    var fFarY1 = player.y - Math.sin(player.a + FOV/2) * FAR_PLANE;

    var fNearX1 = player.x + Math.cos(player.a + FOV/2) * NEAR_PLANE;
    var fNearY1 = player.y - Math.sin(player.a + FOV/2) * NEAR_PLANE;

    var fFarX2 = player.x + Math.cos(player.a - FOV/2) * FAR_PLANE;
    var fFarY2 = player.y - Math.sin(player.a - FOV/2) * FAR_PLANE;

    var fNearX2 = player.x + Math.cos(player.a - FOV/2) * NEAR_PLANE;
    var fNearY2 = player.y - Math.sin(player.a - FOV/2) * NEAR_PLANE;

    
    if(drawTopDown){
        topDownCtx.beginPath();
        topDownCtx.lineWidth=2;
        topDownCtx.strokeStyle="#00FF00" //green
        topDownCtx.moveTo(fFarX1 /PLAYER_COORD_SCALING, fFarY1 /PLAYER_COORD_SCALING);
        topDownCtx.lineTo(fFarX2/PLAYER_COORD_SCALING, fFarY2/PLAYER_COORD_SCALING);
        topDownCtx.stroke(); 
        
        topDownCtx.beginPath();
        topDownCtx.lineWidth=2;
        topDownCtx.strokeStyle="#FFFF00" //yellow
        topDownCtx.moveTo(fFarX2 /PLAYER_COORD_SCALING, fFarY2 /PLAYER_COORD_SCALING);
        topDownCtx.lineTo(fNearX2/PLAYER_COORD_SCALING, fNearY2/PLAYER_COORD_SCALING);
        topDownCtx.stroke(); 
        
        topDownCtx.beginPath();
        topDownCtx.lineWidth=2;
        topDownCtx.strokeStyle="#FF00FF" //magenta
        topDownCtx.moveTo(fNearX2/PLAYER_COORD_SCALING, fNearY2/PLAYER_COORD_SCALING);
        topDownCtx.lineTo(fNearX1/PLAYER_COORD_SCALING, fNearY1/PLAYER_COORD_SCALING);
        topDownCtx.stroke(); 
        
        topDownCtx.beginPath();
        topDownCtx.lineWidth=2;
        topDownCtx.strokeStyle="#0000FF" //blue
        topDownCtx.moveTo(fNearX1/PLAYER_COORD_SCALING, fNearY1/PLAYER_COORD_SCALING);
        topDownCtx.lineTo(fFarX1 /PLAYER_COORD_SCALING, fFarY1 /PLAYER_COORD_SCALING);
        topDownCtx.stroke(); 
    }

    // Starting with furthest away line and work towards the camera point
    for (var y = 20; y < renderCanvasH / 2; y+=graphicsQuality) {
        // Take a sample point for depth linearly related to rows down screen
        var fSampleDepth = y/ (renderCanvasH / 2);

        // Use sample point in non-linear (1/x) way to enable perspective
        // and grab start and end points for lines across the screen
        var fStartX = (fFarX1 - fNearX1) / (fSampleDepth) + fNearX1;
        var fStartY = (fFarY1 - fNearY1) / (fSampleDepth) + fNearY1;
        var fEndX =   (fFarX2 - fNearX2) / (fSampleDepth) + fNearX2;  
        var fEndY =   (fFarY2 - fNearY2) / (fSampleDepth) + fNearY2;  


        // Linearly interpolate lines across the screen
        for (var x = 0; x < renderCanvasW; x+=graphicsQuality) {
            var fSampleWidth = x / renderCanvasW;
            var fSampleX = (fEndX - fStartX) * fSampleWidth + fStartX;
            var fSampleY = (fEndY - fStartY) * fSampleWidth + fStartY;

            // Wrap sample coordinates to give "infinite" periodicity on maps
            fSampleX = fSampleX%1;
            fSampleY = fSampleY%1;

            var textureX = Math.floor(fSampleX*TEXTURE_W);//Math.abs(Math.floor(fSampleX % TEXTURE_W));
            var textureY = Math.floor(fSampleY*TEXTURE_H);//Math.abs(Math.floor(fSampleY % TEXTURE_H));

             if(drawTopDown){
                topDownCtx.fillStyle = "rgba(255,0,0,255)";
                topDownCtx.fillRect(textureX/PLAYER_COORD_SCALING, textureY/PLAYER_COORD_SCALING, 1, 1 );
            } 
            var firstIndex =  (textureX+textureY*TEXTURE_W)*COLOR_SPACE;

            var red = MARIO_KART_CIRCUIT_4_TEXTURE[firstIndex];
            var green = MARIO_KART_CIRCUIT_4_TEXTURE[firstIndex*1+1];
            var blue = MARIO_KART_CIRCUIT_4_TEXTURE[firstIndex*1+2];

            renderCtx.fillStyle = "rgba("+red+","+green+","+blue+",255)";
            renderCtx.fillRect(x, y+renderCanvasH / 2, graphicsQuality, graphicsQuality );

            // Sample symbol and colour from sky sprite, we can use same
            // coordinates, but we need to draw the "inverted" y-location
            /* sym = sprSky->SampleGlyph(fSampleX, fSampleY);
            col = sprSky->SampleColour(fSampleX, fSampleY);
            Draw(x, (ScreenHeight() / 2) - y, sym, col); */
        }
    }

}