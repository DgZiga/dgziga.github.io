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