var buttonColours = ["red", "blue","green","yellow"];

var userClickedPattern = [];
var gamePattern = [];

var start = false;
var level = 0;

function  playSound(colour){
    var audio = new Audio('./sounds/'+colour+'.mp3');
    audio.play();
}
function nextSequence(){

    $("#level-title").text("Level   " + level);
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    return playSound(randomChosenColour);
}
$(document).on("click",".btn",function(){
    var userChoosenColour = $(this).attr("id");    userClickedPattern.push(userChoosenColour);

    playSound(userChoosenColour); 
    animatePress(userChoosenColour);
    checkAnswer((userClickedPattern).length-1);
})
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);

}
$(document).on("keypress",function(){
    
    if(!start){
        $("h1").text("Level  "+ level);
        nextSequence();
        start = true;
    }
})
function checkAnswer(currentLevel){
   
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
        },1000);
    }
}
    else{
        var wrong = new Audio('./sounds/wrong.mp3');
        wrong.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over , Press any Key to Restart");
        startOver();
    }
}
function startOver(){
    start = false;
    level = 0;
    gamePattern = [];
    userClickedPattern =[];
}

