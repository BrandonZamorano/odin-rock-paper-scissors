const MOVES = { ROCK: "ROCK", PAPER: "PAPER", SCISSORS: "SCISSORS" };
const RESULT = { WIN: "Win", LOSE: "Lose", TIE: "Tie" };

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
  return result;
}

function game() {
  let playerScore = 0;
  let computerScore = 0;

  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt(
      `Enter ${Object.values(MOVES).join(" or ")}: `
    );
    const computerSelection = computerPlay();

    const roundResult = playRound(playerSelection, computerSelection);

    switch (roundResult) {
      case RESULT.WIN:
        console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
        playerScore++;
        break;

      case RESULT.LOSE:
        console.log(
          `You Lose! ${playerSelection} loses to ${computerSelection}`
        );
        computerScore++;
        break;
      case RESULT.TIE:
        console.log(`You Tied! Both players chose ${playerSelection}`);
        continue;
    }
  }

  if (playerScore > computerScore) {
    return RESULT.WIN;
  } else if (playerScore < computerScore) {
    return RESULT.LOSE;
  }

  return RESULT.TIE;
}
console.log(game());
