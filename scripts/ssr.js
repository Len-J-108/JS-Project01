'use strict';
// pool of choices for the game
const pool = ['Scissor', 'Rock', 'Paper'];

// freeze makes the pool uneditable
Object.freeze(pool);
// console.log(pool);
//------------------------------------------------------------------------------------
//   player class
class Player {
  constructor(userName, score = 0, amountOfPlayedGames = 0) {
    this.userName = userName;
    this.score = score;
    this.amountOfPlayedGames = amountOfPlayedGames;
  }
  showPlayerdetails() {
    console.log(`Name: ${this.userName}`);
    console.log(`Score: ${this.score}`);
  }
  winMsg() {
    return `, you won!`;
  }
  looseMsg() {
    return `, you lost!`;
  }
  evenMsg() {
    return `even...
    
    `;
  }
  addToScore() {
    this.score++;
  }
  showScore() {
    return `Ỳou have won ${this.score} games so far...`;
  }
  showAmountOfPlayedGames() {
    return `You have played ${this.amountOfPlayedGames} so far...carry on!`;
  }
  showStatistic() {
    const stat = (this.score / this.amountOfPlayedGames) * 100;
    return `You have won ${stat}% of all games.`;
  }
}
//------------------------------------------------------------------------------------
// create instance fo Player
// const playerOne = new Player('Charly', 0, 0); // old
const createPlayer = (val, score = 0, amountOfPlayedGames = 0) => {
  return new Player(val, score, amountOfPlayedGames);
};
//------------------------------------------------------------------------------------
// class tesing
// console.log(playerOne.showPlayerdetails());

// console.log(playerOne.winMsg());
// console.log(playerOne.looseMsg());
// console.log(playerOne.evenMsg());

// console.log(playerOne.showScore());;
// console.log(playerOne.showAmountOfPlayedGames());
// console.log(playerOne.showStatistic());
//------------------------------------------------------------------------------------

// Game Logic

//  Scissor beats Paper
//  Rock beats Scissor
//  Paper beats Rock

// Compare Function

/*  a is player and b is radnom Function
    when a wins: res is -1
    when b wins: res is 1
    if their even: res is 0*/

function compare(a, b) {
  if (a === b) {
    return 0;
  }
  switch (a) {
    case 'Scissor':
      return b === 'Rock' ? 1 : -1;
    case 'Rock':
      return b === 'Paper' ? 1 : -1;
    case 'Paper':
      return b === 'Scissor' ? 1 : -1;
  }
}

//------------------------------------------------------------------------------------
// testing game Logic
// console.log(compare('Scissor', 'Scissor')); // 0
// console.log(compare('Scissor', 'Rock')); // 1
// console.log(compare('Scissor', 'Paper')); // -1

// console.log(compare('Rock', 'Rock')); // 0
// console.log(compare('Rock', 'Scissor')); // -1
// console.log(compare('Rock', 'Paper')); // 1

// console.log(compare('Paper', 'Paper')); // 0
// console.log(compare('Paper', 'Rock')); // -1
// console.log(compare('Paper', 'Scissor')); // 1
//------------------------------------------------------------------------------------

// randon Function ----> Math.floor(Math.random() * (max - min + 1) + min) <----

const chooseRandom = () => {
  return Math.floor(Math.random() * 3); // between 0 and 2 (indices of pool)
};

// console.log(chooseRandom()); // random test
//------------------------------------------------------------------------------------

// Main Game

//single Game Function with compare as inner function
const singleGame = (valA, valB = pool[chooseRandom()]) => {
  console.log(`${valA} : ${valB}`);
  return compare(valA, valB);
};
//singleGame(pool[1], pool[0]); // singlGame test
// console.log(singleGame(pool[1], pool[0]));

//function
let count = { countA: 0, countB: 0 };
const mainGame = (val) => {
  let { countA, countB } = count;
  let i = 1;
  while (countA + countB < 3) {
    console.log(`ROUND ${i}`);
    const game = singleGame(val);
    game === 0
      ? console.log(playerOne.evenMsg())
      : game < 0
      ? countA++
      : countB++;
    console.log(`${playerOne.userName}: ${countA} / computer: ${countB}
      
      `);
    i++;
  }
  if (countA > 1) {
    playerOne.addToScore();
    playerOne.amountOfPlayedGames++;
    return console.log(playerOne.userName, playerOne.winMsg());
  }
  if (countB > 1) {
    playerOne.amountOfPlayedGames++;
    return console.log(playerOne.userName, playerOne.looseMsg());
  }
};

//  mainGame(pool[0]); // main game test

const bigGame = (num) => {
  for (let i = 0; i < num; i++) {
    console.log(`G A M E : ${i + 1}`);
    mainGame(pool[chooseRandom()]);
  }
  console.log(playerOne.showAmountOfPlayedGames());
  console.log(playerOne.showScore());
  console.log(playerOne.showStatistic());
  return;
};
// bigGame(8); // big game test

export { pool, createPlayer, singleGame };
