'use-strict';

//import anything from ssr.js
import * as ssr from './ssr.js';

//------------------------------------------------------------------------------------

// INFO: SELECTING
const body = document.querySelector('body');
const container = body.querySelector('#container');
const wrapperMessages = container.children[0];
const wrapperInput = container.children[1];
const wrapperGame = container.children[2];
const modal = container.children[3];

const tryAgainBtn = modal.querySelector('#try-again');
const showScoreMsg = wrapperMessages.firstElementChild;
const winLoseMsg = showScoreMsg.nextElementSibling;
const threeButtonsDiv = wrapperGame.firstElementChild;
const namePlayerTag = document.getElementById('name1');
//------------------------------------------------------------------------------------
// create emplty player variables.
let playerName = '';
let playerInstance = {};

let count = { countA: 0, countB: 0 };
let { countA, countB } = count;
//------------------------------------------------------------------------------------
const form = wrapperInput.firstElementChild;
form.addEventListener('submit', (ee) => {
  ee.preventDefault(); //prevents automatic reload. of site.
  playerName = ee.target.querySelector('input').value;
  buildGame(playerName);
  body.classList.add('change-background');
  wrapperInput.classList.add('hide');
});

threeButtonsDiv.classList.add('three-btn-div');

//------------------------------------------------------------------------------------
wrapperGame.append(showScoreMsg);

//------------------------------------------------------------------------------------
const buildGame = (val) => {
  // creating a player Class
  playerInstance = ssr.createPlayer(val);
  // creating buttons for game choices
  for (let i = 0; i < ssr.pool.length; i++) {
    const image = document.createElement('img');
    image.src = `./images/image-${i}.png`;
    image.alt = ssr.pool[i];
    image.classList.add('image');
    threeButtonsDiv.append(image);
    showScoreMsg.textContent = `${countA} : ${countB}`;
    showScoreMsg.classList.add('opacity-full');
    // namePlayerTag.textContent = ee.target.previousElementSibling;
    // namePlayerTag.textContent = ee.target.querySelector('input').value;
  }
};

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
