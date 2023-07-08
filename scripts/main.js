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

const buildGame = (nme) => {
  const wrapperGame = document.getElementById('wrapperGame');
  const h2 = document.createElement('h2');
  h2.textContent = `${playerName}... Good Luck`;

  const threeButtonsDiv = document.createElement('div');
  wrapperGame.append(h2, threeButtonsDiv);
  playerInstance = ssr.createPlayer(playerName);
  for (let i = 0; i < ssr.pool.length; i++) {
    const btn = document.createElement('button');
    btn.textContent = ssr.pool[i];
    btn.classList.add('btn');
    threeButtonsDiv.append(btn);
  }
  console.log(playerInstance);
};

const choice = (ee) => {
  if (ee.target) {
    ssr.singleGame(ee.target.innerText);
  }
};

wrapperGame.addEventListener('click', choice);
