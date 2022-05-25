document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, { passive: false }); 

/* $("#ctrlRange")[0].addEventListener('touchmove', function(event) {
    event.stopPropagation();
}); */


function closeMainMenu(){
    $("#mainMenu").hide();
}

function startGame(){
    closeMainMenu();
    requestAnimationFrame(gameTick);
}

function startLevelEditor(){
    closeMainMenu();
    $("#levelEditor").show();
}

function startOptionsMenu(){
    closeMainMenu();
    $("#optionMenu").show();
}