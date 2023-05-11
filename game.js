var buttonsColour = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keypress(function () {
    if (!start) {
        $("#level-title").text("level " + level);
        nextSequence();
        start = true;
    }
});
$(".btn").click(function () {
    var userChosed = $(this).attr("id");
    userClickedPattern.push(userChosed);
    makeSound(userChosed);
    animatePress(userChosed);
    checkAnswer(userClickedPattern.length - 1);


});
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

          console.log("wrong");

        //   playing the worong sound :
          makeSound("Wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass('game-over');
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
       startOver();
    }

}



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonsColour[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    makeSound(randomChosenColour);


}
function makeSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}
function startOver(){
    level=0;
    gamePattern=[];
    start=false;
}