
var currentBrush = 0;
const PALETTE = {
    0: {bgColor:"#a7a7a7", textColor:'#000000', label:"nothing"},
    1: {bgColor:"#000000", textColor:'#ffffff', label:"wall"}
};

//Level editor
function applyLevelEditorChanges(){
    var rows = $("#levelEditorRows")[0].value;
    var cols = $("#levelEditorColumns")[0].value;
    var gridDiv = $("#levelEditorGrid")[0];
    var blockH = 100/rows+"%";
    var blockW = 100/cols+"%";
    var style = 'style="width:'+blockW+'; height:'+blockH+'"';

    gridDiv.innerHTML="";
    for(var i=0; i<rows; i++){
        for(var j=0; j<cols; j++){
            var index = i*rows + j*1;
            gridDiv.innerHTML+=getGridBlock(style, index);
            paint($("#"+index)[0])
        }
    }
}

function checkMousePressed(e, callback, obj){
    e.preventDefault()
    if(e.buttons == 1){
        callback(obj);
    }
}

function paint(obj){
    obj.dataset.value = currentBrush;
    obj.style.backgroundColor=PALETTE[currentBrush].bgColor;
    obj.style.color=PALETTE[currentBrush].textColor;
    obj.style.borderColor=PALETTE[currentBrush].textColor;
}

function preventAndPaint(e, obj){
    e.preventDefault();
    paint(obj);
}

function getGridBlock(style, index){
    return '<div id="'+index+'" onmousedown="preventAndPaint(event, this)"'+
     'onmouseover="checkMousePressed(event, paint, this)" class="levelEditorGridBlock" '+style+' '+
     ' data-value="'+currentBrush+'"></div>';
}

function selectPalette(id, obj){
    $(".paletteDiv").css("border","");
    $(obj).css("border", "1px solid red");
    currentBrush=id;
}






//Export
function exportLevelEditor(){
    var rows = $("#levelEditorRows")[0].value;
    var cols = $("#levelEditorColumns")[0].value;
    var outWalls = "var walls = [\n    ";
    var colCount = 0;
    for(child of $("#levelEditorGrid")[0].children){
        outWalls += child.dataset.value+", ";
        colCount++;
        if(colCount == cols){
            colCount = 0;
            outWalls += "\n    ";
        }
    }
    outWalls +="];";
    var output = "const MAP_W = "+cols+"\n";
    output += "const MAP_H = "+rows+"\n";
    output += "\n"+outWalls;
    console.log(output);
}







//Populate palette hodler
function getPaletteP(id, val){
    return '<p onclick="selectPalette('+id+', this)" class="paletteDiv"'+
    ' style="background-color:'+val.bgColor+'; color:'+val.textColor+'">'+val.label+'</p>';
}

var palHolderDiv = $("#paletteHolder")[0];
for(var palKey of Object.keys(PALETTE)){
    palHolderDiv.innerHTML+=getPaletteP(palKey, PALETTE[palKey]);
}
