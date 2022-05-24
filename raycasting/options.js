function closeOptionsMenu(){
    $("#optionMenu").hide();
    $("#mainMenu").show();
}

var graphicsQuality = 2;
const MAX_GRAPHICS_QUALITY = 6;

function handleQualitySlider(slider){
    graphicsQuality = MAX_GRAPHICS_QUALITY-slider.value;
}
