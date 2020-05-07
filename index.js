const createPlayers = require('./createPlayers');
const play = require('./play');

let players = createPlayers(4);

play.round(players[0], players[1]);
play.game(players[2], players[3], 5);

play.tournament(players, 5);
