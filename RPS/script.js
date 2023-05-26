
//Grab classes by class name

const monitor = document.querySelector('.monitor');
const squaresContainer = document.querySelector('.squares-container');
const box = document.querySelector('.box');
const choice = document.querySelector('.choice');
const button = document.querySelector('.button');
const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const rps = ['Rock', 'Paper', 'Scissors']



// set Default message
monitor.textContent = 'Mark Score 10 and beat Computer!';
box.textContent = 'Tap Here To Play';



// Hide the choice div initially
squaresContainer.style.display = 'none';
choice.style.display = 'none';


// Function to display rps array elements in a loop
let intervalId;
function displayRPS() {
  let index = 0;
  intervalId = setInterval(() => {
    monitor.textContent = rps[index];
    index = (index + 1) % rps.length;
  }, 500);
}



// Function for Hard Mode
let intervalId2;
function displayRPS2() {
  let index2 = 0;
  intervalId2 = setInterval(() => {
    monitor.textContent = rps[index2];
    index2 = (index2 + 1) % rps.length;
  }, 250);
}



//set event when User tapped box to start
box.addEventListener('click', function() {
  displayRPS();
  box.textContent = `Choose your choice below!`;
  squaresContainer.style.display = 'flex';
  choice.style.display = 'flex';
});



//Definition User's Score
let userScore = 5;
for (let i = 0; i < 5; i++) {
  addRed();
}



/////////////////////////////Computer
//Definition what computer choose
function ComputerChoice() {
  let computer = rps[Math.floor(Math.random() * rps.length)];
  return computer;
}



/////////////////////////////RED
//Definition how to add red button in squaresContainer
function addRed() {
  const newSquare = document.createElement('div');
  newSquare.classList.add('red');
  squaresContainer.appendChild(newSquare);
}



//Definition how to remove red button in squaresContainer
function removeRed() {
  const redSquares = squaresContainer.getElementsByClassName('red');
  if (redSquares.length > 0) {
    redSquares[redSquares.length - 1].remove();
  }
}




////////////Definition event for User's Choice

//User's Choice : Rock

rock.addEventListener('click', function() {
  clearInterval(intervalId);
  let computerChoice = monitor.textContent;
  if (computerChoice == rps[0]) {
    box.textContent = 'Tie! Try Again';
    setTimeout(displayRPS, 1500);
  } else if (computerChoice == rps[1]) {
    box.textContent = 'Computer Win! Try Again';
    userScore -= 1;
    removeRed();
    setTimeout(displayRPS, 1500);
  } else {
    box.textContent = 'You Win! Try Again';
    userScore += 1;
    addRed();
    setTimeout(displayRPS, 1500);
  }
  if (userScore == 0) {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    monitor.textContent = 'Game Over!!';
    box.textContent = 'Tap Here To Try Again!!';
    choice.style.display = 'none';
    box.addEventListener('click', function() {
      location.reload();
    });
  }
  if (userScore == 10) {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    monitor.textContent = 'Congrats!';
    box.textContent = 'Tap Here To Try High Speed!!';
    choice.style.display = 'none';
    box.addEventListener('click', function() {
      clearInterval(intervalId);
      clearInterval(intervalId2);
      displayRPS2();
      userScore = 5;
      const redSquares = squaresContainer.getElementsByClassName('red');
      while (redSquares.length > 0) {
      redSquares[0].remove();
      }
      for (let i = 0; i < 5; i++) {
        addRed();
      }
    });
  }
});

//User's Choice : Paper

paper.addEventListener('click', function() {
  clearInterval(intervalId);
  let computerChoice = monitor.textContent;
  if (computerChoice == rps[0]) {
    box.textContent = 'You Win! Try Again';
    userScore += 1;
    addRed();
    setTimeout(displayRPS, 1500);
  } else if (computerChoice == rps[1]) {
    box.textContent = 'Tie! Try Again';
    setTimeout(displayRPS, 1500);
  } else {
    box.textContent = 'Computer Win! Try Again';
    userScore -= 1;
    removeRed();
    setTimeout(displayRPS, 1500);
  }
  if (userScore === 0) {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    monitor.textContent = 'Game Over!!';
    box.textContent = 'Tap Here To Try Again!!';
    choice.style.display = 'none';
    box.addEventListener('click', function() {
      location.reload();
    });
  }
  if (userScore == 10) {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    monitor.textContent = 'Congrats!';
    box.textContent = 'Tap Here To Try High Speed!!';
    choice.style.display = 'none';
    box.addEventListener('click', function() {
      clearInterval(intervalId);
      displayRPS2();
      userScore = 5;
      const redSquares = squaresContainer.getElementsByClassName('red');
      while (redSquares.length > 0) {
      redSquares[0].remove();
      }
      for (let i = 0; i < 5; i++) {
        addRed();
      }
    });
  }
});

//User's Choice : Scissors

scissors.addEventListener('click', function() {
  clearInterval(intervalId);
  let computerChoice = monitor.textContent;
  if (computerChoice == rps[0]){
    box.textContent = 'Computer Win! Try Again';
    userScore -= 1;
    removeRed();
    setTimeout(displayRPS, 1500);
  } else if (computerChoice == rps[1]){
    box.textContent = 'You Win! Try Again';
    userScore += 1;
    addRed();
    setTimeout(displayRPS, 1500);
  } else {
    box.textContent = 'Tie! Try Again';
    setTimeout(displayRPS, 1500);
  }
  
  if (userScore == 0) {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    monitor.textContent = 'Game Over!!';
    box.textContent = 'Tap Here To Try Again!!';
    choice.style.display = 'none';
    box.addEventListener('click', function() {
      location.reload();
    });
  }
  if (userScore == 10) {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    monitor.textContent = 'Congrats!';
    box.textContent = 'Tap Here To Try High Speed!!';
    choice.style.display = 'none';
    box.addEventListener('click', function() {
      clearInterval(intervalId);
      displayRPS2();
      userScore = 5;
      const redSquares = squaresContainer.getElementsByClassName('red');
      while (redSquares.length > 0) {
      redSquares[0].remove();
      }
      for (let i = 0; i < 5; i++) {
        addRed();
      }
    });
  }
})
