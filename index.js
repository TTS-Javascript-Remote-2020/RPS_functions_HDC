const createPlayers = require './createPlayers.js';

// Define a `hands` array with the values 'rock', 'paper', and 'scissors';
// const HANDS = ['rock', 'paper', 'scissors'];

// 2. Define a function called `getHand()` that returns a hand from the array using `parseInt(Math.random()*10)%3`
const getHand = () => {
  const HANDS = ['rock', 'paper', 'scissors'];
  return HANDS[parseInt(Math.random()*10)%3];
};

// 3. Define two objects for two players. Each player has `name` and `getHand()` properties.
// const createPlayers = (numberOfPlayers) => {
//   const NAMES = ["Sophia", "Olivia", "Emma", "Ava", "Aria", "Isabella", "Amelia", "Mia", "Riley", "Aaliyah",
//               "Liam", "Noah", "William", "James", "Oliver", "Benjamin", "Elijah", "Lucas", "Mason", "Logan"];
//   const players = [];
//   for (let i = 0; i < numberOfPlayers; i++) {
//     players.push({
//       id: i,
//       name: NAMES[Math.floor((Math.random()*2498)%20)],
//       getHand: () => getHand()
//     })
//   }
//   return players;
// }

let player1 = {
  name: 'Master',
  getHand: () => getHand()
};
let player2 = {
  name: 'Student',
  getHand: () => getHand()
}

// 4. Define a function called `playRound()` that
//    - Takes two player objects as arguments
//    - Gets hands from each
//    - Determines the winner
//    - Logs the hands played and name of the winner.
//    - If its a tie, log the hands played and "it's a tie".
//    - Returns the winner object (null if no winner)
const playRound = (player1, player2) => {
  let hand1 = player1.getHand();
  let hand2 = player2.getHand();
  if (hand1 === hand2) {
    console.log(`Both ${player1.name} and ${player2.name} played ${hand2}. It's a tie.`)
    return null;
  } else if (hand1 === "rock" && hand2 === "scissors" ||
      hand1 === "paper" && hand2 === "rock" ||
      hand1 === "scissors" && hand2 === "paper") {
        console.log(`${player1.name} played ${hand1} while ${player2.name} played ${hand2}. ${player1.name} wins.`);
        return player1;
      } else {
        console.log(`${player2.name} played ${hand2} while ${player1.name} played ${hand1}. ${player2.name} wins. `);
        return player2;
      }


};

// 5. Define a function called `playGame()` that takes arguments `player1`, `player2`, and `playUntil`.
//  - Play rounds until one of the players wins `playUntil` hands
//  - When one player has won enough games, return the winning player object
const playGame = (player1, player2, playUntil) => {
  player1.wins = 0;
  player2.wins = 0;
  while (player1.wins < playUntil && player2.wins < playUntil) {
    let winner = playRound(player1, player2)
    if (winner != null) {
      if (winner.name === player1.name) {
        player1.wins++
      } else {
        player2.wins++
      }
    }
  }
  const winner = Object.assign({}, player1.wins > player2.wins ? player1:player2);
  player1.wins = 0;
  player2.wins = 0;

  console.log(`${winner.name} has won ${winner.wins} rounds. She/he is the game winner.`);
  return winner;
};

// 6. Play a game to 5 wins
playGame(player1, player2, 5);

// **Bonus Questions**
// - Define a function caled `playTournament()`
//  - Take 4 players and `playUntil` as arguments
//  - Play a game between the first two players, and the second two players
//  - Play a game between the winners of the first round.
//  - Announce the tournament winner's name "[name] is the world champion";

const playTournament = (players, playUntil) => {
  let winner1 = playGame(players[0], players[1], playUntil);
  let winner2 = playGame(players[2], players[3], playUntil);
  let ultimateWinner = playGame(winner1, winner2, playUntil);
  console.log(`${ultimateWinner.name} is the Champion of the WORLD!`)
};

const playersTournament1 = createPlayers(4);
playTournament(playersTournament1, 5);
