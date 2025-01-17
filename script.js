//====== BEAT THAT GAME ======//
// Step 1 - 2 Players take turn to play. - Player 1 and 2.
// Step 2 - When each player clicks submit, rolls 2 dice and show dice number - 2 x Random Nos.
// Step 3 - Each player picks which 1 of the 2 numbers that they want to specify 1st, and the other as the 2nd number. - 2 configs.
// Step 4 - After both players have rolled and chosen dice order, player with higher combined number wins. - Comparison of both 2-digit numbers.

// Planning
// 1) Define game states and global variables.
// 2) Roll dice function, and convert rolled dice numbers to 2-digit numbers.
// 3) Create arrays to store numbers.
// 4) Compare numbers.
// 5) Reset game.

// Global Variables
// GV - Constants
var gameStateDiceRoll = "Game State - Dice Roll";
var gameStateChooseDiceOrder = "Game State - Choose Dice Order";
var gameStateCompareScores = "Game State - Compare Scores";
var validInput = "Valid Input";
var invalidInput = "Invalid Input";

// GV - Variables
var gameState = gameStateDiceRoll;
var currentPlayer = 1;
var gamesPlayed = 1;
var inputValidation = validInput;
var player1ScoreSum = 0;
var player2ScoreSum = 0;

// Arrays
var currentPlayerRolls = [];
var allPlayerScores = [];
var player1ScoreRecord = [];
var player2ScoreRecord = [];

// Helper Functions
// Helper Function 1 - Roll Dice Function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  return randomNumber;
};

// Helper Function 2 - Roll 2 Dice for Player
var rollDiceForPlayer = function () {
  var diceCounter = 0;
  var diceRollMessage = "";
  while (diceCounter < 2) {
    currentPlayerRolls.push(rollDice());
    diceCounter = diceCounter + 1;
  }
  diceRollMessage = `Great Player ${currentPlayer}! You rolled <br>Dice 1: ${currentPlayerRolls[0]} <br>Dice 2: ${currentPlayerRolls[1]}<br>Please enter "1" or "2" to choose the order of the dice you desire to form your number. "1" being for Dice 1 before Dice 2, and "2" being for Dice 2 before Dice 1.`;
  return diceRollMessage;
};

// Helper Function 3 - Registering Player Score
var getPlayerScore = function (playerOrderChoice) {
  var playerChoiceMessage = "";
  var playerScore = 0;
  // Player Choice
  if (playerOrderChoice != 1 && playerOrderChoice != 2) {
    inputValidation = invalidInput;
    playerChoiceMessage = `Invalid input. Please input either "1" or "2" to form your desired 2-digit number and continue the game. <br>Dice 1 is ${currentPlayerRolls[0]}. <br> Dice 2 is ${currentPlayerRolls[1]}.`;
    return playerChoiceMessage;
  } else if (playerOrderChoice == 1) {
    inputValidation = validInput;
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    playerChoiceMessage = `Player ${currentPlayer} is ${playerScore}.`;
  } else if (playerOrderChoice == 2) {
    inputValidation = validInput;
    playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    playerChoiceMessage = `Player ${currentPlayer}'s score is ${playerScore}.`;
  }
  // Storing of all players record
  allPlayerScores.push(playerScore);
  // Change current player record
  currentPlayerRolls = [];
  return playerChoiceMessage;
};

// Helper Function 4 - Compare Player Scores
var comparePlayerScores = function () {
  var compareMessage = `Player 1's score is ${allPlayerScores[0]}.<br>Player 2's score is ${allPlayerScores[1]}.`;

  // Player 1 wins
  if (allPlayerScores[0] > allPlayerScores[1]) {
    compareMessage =
      compareMessage +
      " <br>Player 1 wins! <br>Please press the Submit button to reset the game.<br>";
  }
  // Player 2 wins
  if (allPlayerScores[0] < allPlayerScores[1]) {
    compareMessage =
      compareMessage +
      " <br>Player 2 wins! <br>Please press the Submit button to reset the game.<br>";
  }
  // Draw
  if (allPlayerScores[0] == allPlayerScores[1]) {
    compareMessage =
      compareMessage +
      " <br>It is a Draw! <br>Please press the Submit button to reset the game.<br>";
  }
  return compareMessage;
};

// Helper Function 5 - Reset Game
var resetGame = function () {
  var resetGameMessage = "";
  currentPlayer = 1;
  gameState = gameStateDiceRoll;
  allPlayerScores = [];
};

// Helper Function 6 - Player Score Summation and Record
var player1Sum = function () {
  player1ScoreRecord.push(allPlayerScores[0]);
  player1ScoreSum += allPlayerScores[0];
  return player1ScoreSum;
};
var player2Sum = function () {
  player2ScoreRecord.push(allPlayerScores[1]);
  player2ScoreSum += allPlayerScores[1];
  return player2ScoreSum;
};

//Helper Function 7 - Player Score Sum Comparison
var comparePlayerScoreSums = function () {
  var compareSumMessage = "";

  // Score Sum Draw
  if (player1ScoreSum == player2ScoreSum) {
    compareSumMessage = `<br>It is a draw thus far.`;
  }

  // Score Sum - Player 1 win
  if (player1ScoreSum > player2ScoreSum) {
    compareSumMessage = `<br>Player 1 is currently winning!`;
  }

  // Score Sum - Player 2 win
  if (player1ScoreSum < player2ScoreSum) {
    compareSumMessage = `<br>Player 2 is currently winning!`;
  }

  return compareSumMessage;
};

var main = function (input) {
  var gameMessage = " ";
  // Roll Dice
  if (gameState == gameStateDiceRoll) {
    gameMessage = rollDiceForPlayer();
    gameState = gameStateChooseDiceOrder;
  }
  // Player Score
  else if (gameState == gameStateChooseDiceOrder) {
    gameMessage = getPlayerScore(input);
    if (currentPlayer == 1 && inputValidation == validInput) {
      // Change Player
      currentPlayer = 2;
      gameState = gameStateDiceRoll;
      return (
        gameMessage + " It is Player 2's turn. Please switch over the controls."
      );
    }
    // Shift to Compare Score Mode
    if (currentPlayer == 2 && inputValidation == validInput) {
      gameState = gameStateCompareScores;
      return gameMessage + " Press the Submit button to compare scores.";
    }
  }
  // Compare Scores
  else if (gameState == gameStateCompareScores) {
    gameMessage =
      comparePlayerScores() +
      `<br>SCOREBOARD<br>` +
      `<br>Player 1's combined score thus far is ${player1Sum()}. <br>Player 2's combined score thus far is ${player2Sum()}.` +
      comparePlayerScoreSums() +
      `<br><br>Number of rounds played = ${gamesPlayed}. <br>Player 1's 2-digit numbers thus far are ${player1ScoreRecord}. <br>Player 2's 2-digit numbers thus far are ${player2ScoreRecord}.`;
    gamesPlayed += 1;
    // Reset Game
    resetGame();
  }
  return gameMessage;
};
