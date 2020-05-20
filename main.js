const container = document.getElementById('container');
let players = []

const getHand = () => {
  const HANDS = ['rock', 'paper', 'scissors'];
  return HANDS[parseInt(Math.random()*10)%3];
};

const createPlayers = () => {
  const players = [];
  for (let i = 0; i < 2; i++) {
    let name = prompt(`What is the name of player number ${i + 1}`);
    let container = document.getElementsByClassName('player')[i];
    players.push({
      name: name,
      getHand: getHand,
      parent: container
    })
    let title = document.createElement('h2');
    title.innerHTML = `Player ${i + 1}: ${players[i].name}`;
    container.appendChild(title);
  }
  return players;
}

const playRound = (players, game = false) => {
  let hand1 = players[0].getHand();
  let hand2 = players[1].getHand();
  let dispay = '';
  let winner = null;
  if (hand1 === hand2) {
    display = `${players[0].name} and ${players[1].name} played ${hand2}. It is a tie.`;
  } else if (hand1 === "rock" && hand2 === "scissors" ||
      hand1 === "paper" && hand2 === "rock" ||
      hand1 === "scissors" && hand2 === "paper") {
        display = `${players[0].name} played ${hand1} and ${players[1].name} played ${hand2}. ${players[0].name} wins.`;
        winner = players[0];
      } else {
        display = `
          ${players[1].name} played ${hand2} while ${players[0].name} played ${hand1}. ${players[1].name} wins.
        `;
        winner = players[1];
      }
  if (!game) displayWinner(display);
  return winner;
};

const playGame = (players, playUntil) => {
  players[0].wins = 0;
  players[1].wins = 0;
  while (players[0].wins < playUntil && players[1].wins < playUntil) {
    let winner = playRound(players, true)
    if (winner != null) {
      if (winner.name === players[0].name) {
        players[0].wins++
      } else {
        players[1].wins++
      }
    }
  }
  const winner = Object.assign({}, players[0].wins > players[1].wins ? players[0]:players[1]);
  players[0].wins = 0;
  players[1].wins = 0;

  let display = `${winner.name} has won ${winner.wins} rounds. She/he is the game winner.`;
  displayWinner(display);
  return winner;
};


const displayWinner = (display) => {
  let gameContainer = document.getElementById('gameContainer');
  let gameResult = document.createElement('p');
  gameResult.setAttribute('class', 'result');
  gameResult.innerHTML = display;
  let results = document.getElementsByClassName('result');
  if (results.length > 3) {
    gameContainer.removeChild(results[0])
  }
  gameContainer.appendChild(gameResult);
  displayPlayAgain();
}

const endPlay = () => {
  alert('Thanks for playing');
  window.location.reload(false);
}

const handleClick = (event) => {
  removePlayAgain();
  switch(event.target.id) {
    case 'playGame':
      playGame(players, 5);
      break;
    case 'playRound':
      playRound(players);
      break;
    default:
      endPlay();
      break;
  }

}

const removePlayAgain = () => {
  let element = document.getElementById('playAgain');
  element.parentNode.removeChild(element);
}

const displayPlayAgain = () => {
  let container = document.getElementById('gameContainer')
  let newElement = document.createElement('div');
  newElement.setAttribute('id', 'playAgain');
  newElement.innerHTML = `
    <button id="playGame"
      type="button"
      name="gameButton"
      onClick="handleClick(event)"
      >
        Play 5 Round Game
    </button>
    <button id="playRound"
      onClick="handleClick(event)"
      type="button"
      name="roundButton"
      >
        Play Again
      </button>
    <button id="endPlay"
      onClick="handleClick(event)"
      type="button"
      name="button"
      >
        Quit
      </button>
  `;
  container.appendChild(newElement);
}

const playLiveRound = () => {
  let intro = document.getElementById('intro');
  container.removeChild(intro);
  players = createPlayers()
  playRound(players);
}

const beginPlay = () => {
  let newElement = document.createElement('div');
  newElement.setAttribute('id', 'intro');
  newElement.innerHTML = `
    <p>Grab a friend and play a round of rock, paper, scissors.</p>
    <button id="play" type="button" name="button" onClick="playLiveRound()">Play Game</button>
  `
  container.appendChild(newElement);
}

beginPlay();
