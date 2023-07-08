'use-strict';

//import anything from ssr.js
import * as ssr from './ssr.js';

//select container
const container = document.getElementById('container');

//------------------------------------------------------------------------------------

// NAME INPUT
// select #wrapper-div in HTML
const wrapperInput = document.getElementById('wrapper-input');
// creating Elements
const form = document.createElement('form');
const nameLabel = document.createElement('label');
const nameInput = document.createElement('input');
const nameSubmit = document.createElement('input');

nameLabel.textContent = 'Enter your name:'; // add label text
nameLabel.classList.add('input');
nameInput.type = 'text'; // add input type
nameInput.classList.add('input');
// set input attributes
nameSubmit.setAttribute('type', 'submit');
nameSubmit.setAttribute('value', 'Play');
nameSubmit.classList.add('input', 'submit-button');
// result Message => shows if a game is won or lost.
const resultMsg = document.createElement('h2');
resultMsg.classList.add('result-msg', 'hide');
// "Try Again" button => resets the game
const tryAgainBtn = document.createElement('button');
tryAgainBtn.textContent = 'Try Again';
tryAgainBtn.classList.add('hide'); // hides it at first (it gets shown when a game is over.)

container.append(resultMsg, tryAgainBtn); // implementing the "result message" & "try again" button.

form.append(nameLabel, nameInput, nameSubmit); // appending "input form tags"
wrapperInput.append(form);

let playerName = '';
let playerInstance = {};

//------------------------------------------------------------------------------------

form.addEventListener('submit', (ee) => {
  ee.preventDefault(); //prevents automatic reload. of site.
  playerName = ee.target.querySelector('input').value;
  buildGame(playerName);
  form.classList.toggle('hide');
  tryAgainBtn.classList.toggle('hide');
  wrapperInput.classList.add('hide');
});

const threeButtonsDiv = document.createElement('div');
threeButtonsDiv.classList.add('three-btn-div');

//------------------------------------------------------------------------------------

const wrapperGame = document.getElementById('wrapper-game');
const showScoreMsg = document.createElement('h3');
showScoreMsg.classList.add('show-score-msg');
const winLoseMsg = document.createElement('h3');
winLoseMsg.classList.add('win-lose-msg');
winLoseMsg.textContent = '...';
wrapperGame.append(winLoseMsg, showScoreMsg);

//------------------------------------------------------------------------------------
const buildGame = () => {
  const h2 = document.createElement('h2');
  h2.textContent = `${playerName}... good luck`;
  // creating a player Class
  playerInstance = ssr.createPlayer(playerName);
  // creating buttons for game choices
  for (let i = 0; i < ssr.pool.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = ssr.pool[i];
    btn.classList.add('btn');
    threeButtonsDiv.append(btn);
  }
  wrapperGame.append(h2, threeButtonsDiv);
};

let count = { countA: 0, countB: 0 };
let { countA, countB } = count;
//------------------------------------------------------------------------------------
const gameFunction = (ee) => {
  // ee.preventDefault(); // do i need this?????
  const showScoreMsg = document.querySelector('.show-score-msg');
  const winLoseMsg = document.querySelector('.win-lose-msg');
  console.log('show Score Msg:', showScoreMsg);

  const choiceValueA = ee.target.innerText;
  const choiceValueB = ssr.pool[ssr.chooseRandom()];
  const game = ssr.singleGame(choiceValueA, choiceValueB);

  if (game === 0) {
    winLoseMsg.textContent = `${choiceValueA} : ${choiceValueB}`;
    showScoreMsg.textContent = `${countA} : ${countB}`;
  }
  if (game === -1) {
    winLoseMsg.textContent = `${choiceValueA} : ${choiceValueB}`;
    countA++;
    showScoreMsg.textContent = `${countA} : ${countB}`;
  }
  if (game === +1) {
    winLoseMsg.textContent = `${choiceValueA} : ${choiceValueB}`;
    countB++;
    showScoreMsg.textContent = `${countA} : ${countB}`;
  }
  if (countA > 1 || countB > 1) {
    const res = countA > countB ? '...You Won' : 'You Lost';
    resultMsg.textContent = res;
    resultMsg.classList.toggle('hide');

    countA = 0;
    countB = 0;

    return;
  }
};
//------------------------------------------------------------------------------------
threeButtonsDiv.addEventListener('click', gameFunction);

tryAgainBtn.addEventListener('click', (ee) => {
  countA = 0;
  countB = 0;
  winLoseMsg.textContent = null;
  showScoreMsg.textContent = null;
  resultMsg.classList.toggle('hide');
});
//------------------------------------------------------------------------------------
