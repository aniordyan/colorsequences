let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let started = false;
let level = 0;


$(document).keypress(function() {
  if (!started) {
    nextSequence();
    $("h1").text("Level " + level);
    started = true;
  }
});
function startOver(){
    gamePattern = [];
    level = 0 ;
    started = false;

}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  $("#" + randomChosenColor).fadeIn(300).fadeOut(300).fadeIn(300);
  let audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  gamePattern.push(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
  console.log(gamePattern);
  userClickPattern = [];
}

$ (".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePressed(userChosenColor);
  userClickPattern.push(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
  console.log(userClickPattern);
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel] ){
      console.log("success");
      console.log(gamePattern);
      console.log(userClickPattern);
      if (gamePattern.length === userClickPattern.length){
          setTimeout(nextSequence(), 1000);

      }
  } else{
      let audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $ ("body").addClass("game-over");
      setTimeout(function () { $("body").removeClass("game-over")

      }, 200);
      $("h1").text("Սխալվեցիր:Վերսկսելու համար սեղմել ցանկացած կոճակ");
      startOver();
  }
}

function animatePressed(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() { 
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}
function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

    
    
    
    
    
