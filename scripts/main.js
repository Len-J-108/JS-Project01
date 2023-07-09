'use-strict';

//import anything from ssr.js
import * as ssr from './ssr.js';

//select container
const container = document.getElementById('container');

//------------------------------------------------------------------------------------

// INFO: SELECTING

const wrapperInput = document.getElementById('wrapper-input');
const wrapperGame = document.getElementById('wrapper-game');
const modal = document.getElementById('modal');
const tryAgainBtn = modal.querySelector('#try-again');
const wrapperMessages = document.getElementById('wrapper-messages');
const showScoreMsg = wrapperMessages.querySelector('#show-score');
const winLoseMsg = wrapperMessages.querySelector('#win-lose-msg');
const threeButtonsDiv = wrapperGame.querySelector('.three-buttons-div');

let playerName = '';
let playerInstance = {};

//------------------------------------------------------------------------------------
const form = wrapperInput.querySelector('form');
form.addEventListener('submit', (ee) => {
  ee.preventDefault(); //prevents automatic reload. of site.
  playerName = ee.target.querySelector('input').value;
  buildGame(playerName);
  // form.classList.toggle('hide');
  wrapperInput.classList.add('hide');
});

threeButtonsDiv.classList.add('three-btn-div');

//------------------------------------------------------------------------------------
wrapperGame.append(showScoreMsg);

//------------------------------------------------------------------------------------
const buildGame = () => {
  // h2.textContent = `${playerName}... good luck`;
  // creating a player Class
  playerInstance = ssr.createPlayer(playerName);
  // creating buttons for game choices
  for (let i = 0; i < ssr.pool.length; i++) {
    const image = document.createElement('img');
    image.src = `./images/image-${i}.png`;
    image.alt = ssr.pool[i];
    image.classList.add('image');
    threeButtonsDiv.append(image);
  }
};

let count = { countA: 0, countB: 0 };
let { countA, countB } = count;
//------------------------------------------------------------------------------------
const gameFunction = (ee) => {
  // ee.preventDefault(); // do i need this?????

  const choiceValueA = ee.target.alt;
  const choiceValueB = ssr.pool[ssr.chooseRandom()];
  const game = ssr.singleGame(choiceValueA, choiceValueB);

  if (game === 0) {
    showScoreMsg.textContent = `${countA} : ${countB}`;
  }
  if (game === -1) {
    countA++;
    showScoreMsg.textContent = `${countA} : ${countB}`;
  }
  if (game === +1) {
    countB++;
    showScoreMsg.textContent = `${countA} : ${countB}`;
  }
  if (countA > 1 || countB > 1) {
    const res = countA > countB ? '...You Won' : 'You Lost';
    winLoseMsg.textContent = res;
    // winLoseMsg.classList.toggle('hide');

    countA = 0;
    countB = 0;

    return;
  }
};
//------------------------------------------------------------------------------------
threeButtonsDiv.addEventListener('click', gameFunction);
//------------------------------------------------------------------------------------
// NOTE: Try Again button in modal when game is finished...

/* tryAgainBtn.addEventListener('click', (ee) => {
  countA = 0;
  countB = 0;
  winLoseMsg.textContent = null;
  showScoreMsg.textContent = null;
  resultMsg.classList.toggle('hide');
}); */
//------------------------------------------------------------------------------------
