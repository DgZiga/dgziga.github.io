document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, { passive: false }); 

 $("#grQualitySlider")[0].addEventListener('touchmove', function(event) {
    event.stopPropagation();
}); 


function closeMainMenu(){
    $("#mainMenu").hide();
}

function openCharSelection(){
    closeMainMenu();
    selectCharAsPlayer(0); //default
}

function startLevelEditor(){
    closeMainMenu();
    $("#levelEditor").show();
}

function startOptionsMenu(){
    closeMainMenu();
    $("#optionMenu").show();
}