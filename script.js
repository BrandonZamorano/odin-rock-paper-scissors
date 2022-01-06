const MOVES = { ROCK: "ROCK", PAPER: "PAPER", SCISSORS: "SCISSORS" };
const RESULT = { WIN: "Win", LOSE: "Lose", TIE: "Tie" };

let playerScore = 0;
let cpuScore = 0;

const rpsBtns = document.querySelectorAll(".rps-btn");

const playerScoreEl = document.querySelector(".player-score");
const cpuScoreEl = document.querySelector(".cpu-score");

const roundResultsEl = document.querySelector(".round-results");

function removeUpdateScoreAnimation(e) {
  e.target.classList.remove("updatingScore");
}

playerScoreEl.addEventListener("animationend", removeUpdateScoreAnimation);

cpuScoreEl.addEventListener("animationend", removeUpdateScoreAnimation);

function updateScore(pScore = playerScore, cScore = cpuScore) {
  if (playerScore != pScore) {
    console.log("Updating player score");
    playerScoreEl.classList.add("updatingScore");
  }

  if (cpuScore != cScore) {
    console.log("Updating cpu score");
    cpuScoreEl.classList.add("updatingScore");
  }

  playerScore = pScore;
  cpuScore = cScore;

  playerScoreEl.textContent = pScore;
  cpuScoreEl.textContent = cScore;
}

function displayRoundResults({ computerSelection, playerSelection } = {}) {
  roundResultsEl.classList.add("visible");
  const playerChoiceEl = document.querySelector(".player-choice");
  const cpuChoiceEl = document.querySelector(".cpu-choice");

  const emojiChoice = { ROCK: "🪨", PAPER: "📃", SCISSORS: "✂️" };

  playerChoiceEl.textContent = emojiChoice[playerSelection];

  cpuChoiceEl.textContent = emojiChoice[computerSelection];
}

rpsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const playerSelection = e.target.getAttribute("data-rps-choice");

    const computerSelection = computerPlay();

    const roundResult = playRound(playerSelection, computerSelection);

    displayRoundResults(roundResult);

    console.log("Round result: ", roundResult);

    switch (roundResult.result) {
      case RESULT.WIN:
        console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
        updateScore(playerScore + 1);
        break;

      case RESULT.LOSE:
        console.log(
          `You Lose! ${playerSelection} loses to ${computerSelection}`
        );
        updateScore(playerScore, cpuScore + 1);
        break;
      case RESULT.TIE:
        console.log(`You Tied! Both players chose ${playerSelection}`);
    }

    if (playerScore === 5) {
      alert("You won! Resetting game...");
      reset();
    } else if (cpuScore === 5) {
      alert("You Lost Resetting game...");
      reset();
    }
  });
});

// Game reset function that resets scores back to zero
// and updates the elements
function reset() {
  updateScore(0, 0);
  roundResultsEl.classList.remove("visible");
}

// When a button is clicked, play a round with the user choice depending on the button that was clicked.

function computerPlay() {
  const validMoves = Object.values(MOVES);
  return validMoves[Math.floor(Math.random() * validMoves.length)];
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toUpperCase();
  computerSelection = computerSelection.toUpperCase();

  let result;

  switch (playerSelection) {
    case MOVES.PAPER:
      if (computerSelection === MOVES.ROCK) {
        result = RESULT.WIN;
      } else if (computerSelection === MOVES.SCISSORS) {
        result = RESULT.LOSE;
      }
      break;
    case MOVES.ROCK:
      if (computerSelection === MOVES.SCISSORS) {
        result = RESULT.WIN;
      } else if (computerSelection === MOVES.PAPER) {
        result = RESULT.LOSE;
      }
      break;
    case MOVES.SCISSORS:
      if (computerSelection === MOVES.PAPER) {
        result = RESULT.WIN;
      } else if (computerSelection === MOVES.ROCK) {
        result = RESULT.LOSE;
      }
      break;
  }

  if (playerSelection === computerSelection) {
    result = RESULT.TIE;
  }
  return {
    playerSelection,
    computerSelection,
    result,
  };
}
