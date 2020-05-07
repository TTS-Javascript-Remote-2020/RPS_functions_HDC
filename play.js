const round = (player1, player2) => {
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

const game = (player1, player2, playUntil) => {
  player1.wins = 0;
  player2.wins = 0;
  while (player1.wins < playUntil && player2.wins < playUntil) {
    let winner = round(player1, player2)
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

// Tournament has a players argument that is an array.
const tournament = (players, playUntil) => {
  let winner1 = game(players[0], players[1], playUntil);
  let winner2 = game(players[2], players[3], playUntil);
  let ultimateWinner = game(winner1, winner2, playUntil);
  console.log(`${ultimateWinner.name} is the Champion of the WORLD!`)
};

module.exports = {
  round: round,
  game: game,
  tournament: tournament
}
