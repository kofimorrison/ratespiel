/*
Game Function:
-Player must guess a number between a min and max
-player gets a certain amount of guesses
-notify player of guesses remaining
-notify the player of the correct answer if loose
-let player choose to play again
*/

//game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

//get winning number
function getRandomNum(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown',function(e){
  if(e.target.className === 'spiel-wiederholen'){
    window.location.reload();
  }
})

//listen for guess
guessBtn.addEventListener('click',function(){
  let guess = parseInt(guessInput.value);


  //check if won
  if(guess === winningNum){
    //gameover: won
    //disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = 'green';
    //set message
    setMessage(`${winningNum} ist richtig, du hast gewonnen!`, 'green');
    //play again?
    guessBtn.value = 'Spiel Wiederholen';
    guessBtn.className += 'spiel-wiederholen';
  }else{
    //wrong number
    guessesLeft = guessesLeft - 1;//guessesleft -= 1
    if(guessesLeft === 0){
      //gameover: lost
      //disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = 'red';
    //set message
    setMessage(`Game Over, du hast verloren. Die richtige Zahl lautet ${winningNum}`, 'red');
    guessBtn.value = 'Spiel Wiederholen';
    guessBtn.className += 'spiel-wiederholen';
    }else{
      //game continues: answer wrong
      guessInput.style.borderColor = 'red';
      setMessage(`${guess} ist falsch, ${guessesLeft} Versuche noch`,'red');
      //clear input
      guessInput.value = '';
    }
     //validate
  if(guess < min || guess > max || isNaN(guess)){
    setMessage(`Bitte tragen Sie eine Zahl zwischen ${min} und ${max}`, 'red');
  }
  }
})

//set message
function setMessage(msg, color){
  message.textContent = msg;
  message.style.color = color;
}

