'use strict';

//selecting elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelector('.btn--modal');
const btnCloseModal = document.querySelector('.close--modal');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player1 = function () {
  document.getElementById(
    'name--0'
  ).innerHTML = ` <input type="text" name="Player 1"  placeholder="Enter Player 1 Name " >`;
};
const player2 = function () {
  document.getElementById(
    'name--1'
  ).innerHTML = ` <input type="text" name="Player 2"  placeholder="Enter Player 2 Name" >`;
};

//Starting Conditions
let scores;
let currentScore;
let activePlayer;
let playing;

const init = function () {
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  player1();
  player2();

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

init();

const resetGameButton = function () {
  document.querySelector('.btn--new').addEventListener('click', init);
};

btnOpenModal.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

//close modal window
btnCloseModal.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

//close the modal when we click on overlay(outside modal window)
overlay.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

//handling an "Esc" keypress event

document.addEventListener('keydown', function (event) {
  // console.log('A key Was pressed.');
  // console.log(event.key);
  if (event.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
    }
    console.log(`${event.key} was pressed`);
  }
});

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `/photos/dice-${dice}.png`;

    //3.Check for rolled 1
    if (dice !== 1) {
      //Add dice to the current score
      currentScore = currentScore + dice;
      //Select active player dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player: change value form 0 to 1 or vice versa. Reassigning the active player.
      switchPlayer();
    }
  }
});

//Holding current score
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active players score
    //scores[1] = scores[1] + currentScore;
    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#name--${activePlayer}`).textContent = 'Winner!';
    } else {
      //3.Switch to next player
      switchPlayer();
    }
  }
});

//Resetting Game
resetGameButton();
