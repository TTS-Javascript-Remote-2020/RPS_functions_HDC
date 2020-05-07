module.exports = (numberOfPlayers) => {
  const NAMES = ["Sophia", "Olivia", "Emma", "Ava", "Aria", "Isabella", "Amelia", "Mia", "Riley", "Aaliyah",
              "Liam", "Noah", "William", "James", "Oliver", "Benjamin", "Elijah", "Lucas", "Mason", "Logan"];
  const players = [];
  for (let i = 0; i < numberOfPlayers; i++) {
    players.push({
      id: i,
      name: NAMES[Math.floor((Math.random()*2498)%20)],
      getHand: () => getHand()
    })
  }
  return players;
}
