'use-strict';

//import anything from ssr.js
import * as ssr from './ssr.js';

// select #wrapper-div in HTML
const wrapperInput = document.getElementById('wrapperInput');

const form = document.createElement('form');
const nameLabel = document.createElement('label');
nameLabel.textContent = 'Enter your name:';
const nameInput = document.createElement('input');
nameInput.type = 'text';
const nameSubmit = document.createElement('input');
nameSubmit.setAttribute('type', 'submit');
nameSubmit.setAttribute('value', 'Play');

// nameSubmit.textContent = 'Play';
form.append(nameLabel, nameInput, nameSubmit);
wrapperInput.append(form);

// const nameInputValue = ''
let playerName = '';
let playerInstance = {};

form.addEventListener('submit', (ee) => {
  ee.preventDefault();
  playerName = ee.target.querySelector('input').value;
  // return;
  console.log(playerName);
  buildGame(playerName);
});

const threeButtonsDiv = document.createElement('div');
threeButtonsDiv.classList.add('three-btn-div');

const buildGame = (nme) => {
  const wrapperGame = document.getElementById('wrapperGame');
  const h2 = document.createElement('h2');
  h2.textContent = `${playerName}... Good Luck`;

  playerInstance = ssr.createPlayer(playerName);
  for (let i = 0; i < ssr.pool.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = ssr.pool[i];
    btn.classList.add('btn');
    threeButtonsDiv.append(btn);
  }
  console.log(playerInstance);

  const winLoseMsg = document.createElement('h3');
  winLoseMsg.classList.add('win-lose-msg');
  winLoseMsg.textContent = '...';

  const showScoreMsg = document.createElement('h3');
  showScoreMsg.classList.add('show-score-msg');

  wrapperGame.append(h2, threeButtonsDiv, winLoseMsg, showScoreMsg);
};

let count = { countA: 0, countB: 0 };
let { countA, countB } = count;

threeButtonsDiv.addEventListener('click', (ee) => {
  const winLoseMsg = document.querySelector('.win-lose-msg');
  const showScoreMsg = document.querySelector('.show-score-msg');
  console.log('show Score Msg:', showScoreMsg);

  const choiceValueA = ee.target.innerText;
  const choiceValueB = ssr.pool[ssr.chooseRandom()];
  const game = ssr.singleGame(choiceValueA, choiceValueB);

  console.log('GAME::  ', game);
  console.log(winLoseMsg);

  if (game === 0) {
    console.log('even');
    winLoseMsg.textContent = `${choiceValueA} : ${choiceValueB}`;
    showScoreMsg.textContent = `${countA} : ${countB}`;
  }
  if (game === -1) {
    console.log('you won');
    winLoseMsg.textContent = `${choiceValueA} : ${choiceValueB}`;
    countA++;
    showScoreMsg.textContent = `${countA} : ${countB}`;
  }
  if (game === +1) {
    console.log('computer won');
    winLoseMsg.textContent = `${choiceValueA} : ${choiceValueB}`;
    countB++;
    showScoreMsg.textContent = `${countA} : ${countB}`;
  }
  if (countA + countB >= 3) {
    console.log(`countA: ${countA}
    countB: ${countB}
    done!!`);
    winLoseMsg.textContent = '...You Won...';
    return;
  }
});

//------------------------------------------------------------------------------------
