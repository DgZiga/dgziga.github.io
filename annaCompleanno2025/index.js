document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });

const words =[
    "GREATEST",
    "DICEY",
    "PLEASESTANDUP",
    "MAY",
    "",
    "PELATO",
    "",
    "VANTAGGIO",
    "PADE",
    "LISCIANI",
    "MENSA",
    "ZOMBIECIDE",
    "BIRRA",
    "ETIOPIA"
]
const start_y_positions = [
    7,
    6,
    0,
    6,
    0,
    4,
    0,
    7,
    4,
    1,
    6,
    7,
    6,
    1
]

function s(arg){
    return document.querySelectorAll(arg);
}

var html = "";
for(var i=0; i<words.length; i++){
    var word = words[i];
    var x = i;
    var y = start_y_positions[i];
    var chars = word.split("");
    for(var j=0; j<chars.length; j++){
        var char = chars[j]
        html+='<div class="letter" style="grid-area: a'+y+'-'+x+';" onclick="this.children[0].value=\'\'"> <input type="text" maxlength="1" onInput="focusNext(this)"> '+
        (j==0 ? 
            '<div class="numberInGrid">'+(i*1+1)+'</div>'
            : ''
        )+'</div>'
        y++;
    }
}
s("#grid")[0].innerHTML = html;

var definizioniOpen = false;
function openDefinizioni(){
    if(definizioniOpen){
        $("#definizioni").animate({
            top: "-100svh"
        }, 500)
    } else {
        $("#definizioni").animate({
            top: 0
        }, 500)
    }
    definizioniOpen = !definizioniOpen;
}
function focusNext(node){
    if(node.value.length == 1){
        node.offsetParent.nextSibling.children[0].focus();
    }
}