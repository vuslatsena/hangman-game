const blanksContainer = document.getElementById('hold');
const livesContainer = document.getElementById('mylives');
const letterButtons = document.querySelectorAll('#letters button');
const hintButton = document.getElementById('hint');
const resetButton = document.getElementById('reset');
const hangmanDiv = document.getElementById('hangman');
const countdownParagraph = document.getElementById('countdown');
const clueParagraph = document.getElementById('clue');
const stickmanCanvas = document.getElementById('stickman');
const stickmanContext = stickmanCanvas.getContext('2d');

let lives = 10;
let randomWord = '';
let hintUsed = false;

fetch('https://random-word-api.herokuapp.com/word?number=1')
  .then(response => response.json())
  .then(data => {
    randomWord = data[0];
    createBlanks();
  });

function createBlanks() {
  const blanks = '_'.repeat(randomWord.length);
  blanksContainer.textContent = blanks;
}

function checkLetter(letter) {
  let wordArray = blanksContainer.textContent.split('');
  let letterFound = false;

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === letter) {
      wordArray[i] = letter;
      letterFound = true;
    }
  }

  blanksContainer.textContent = wordArray.join('');

  if (!letterFound) {
    lives--;
    updateLives();
    drawHangman();
  }

  checkWin();
  checkLose();
}

function checkWin() {
  if (!blanksContainer.textContent.includes('_')) {
    alert('You win!');
    disableButtons();
  }
}

function checkLose() {
  if (lives === 0) {
    alert('You lose! The hangman is hanged! 👨‍🦱🔪');
    disableButtons();
  }
}

function disableButtons() {
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = true;
  }
  hintButton.disabled = true;
}

function updateLives() {
  livesContainer.textContent = `You have ${lives} lives left.`;
}

function drawHangman() {
  // Draw hangman based on the remaining lives
  // Add your own hangman drawing logic here
}

function resetGame() {
  lives = 10;
  hintUsed = false;
  randomWord = '';

  fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(response => response.json())
    .then(data => {
      randomWord = data[0];
      createBlanks();
      updateLives();
      resetHangman();
      enableButtons();
      resetHint();
    });
}

function resetHangman() {
  // Reset hangman drawing to initial state
  // Add your own logic here
}

function enableButtons() {
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = false;
  }
  hintButton.disabled = false;
}

function revealWord() {
  blanksContainer.textContent = randomWord;
}

function showHint() {
  if (!hintUsed) {
    clueParagraph.textContent = `Clue - ${randomWord}`;
    hintUsed = true;
  }
}

letterButtons.forEach(button => {
  button.addEventListener('click', event => {
    const clickedLetter = event.target.textContent.toLowerCase();
    if (randomWord.includes(clickedLetter)) {
      checkLetter(clickedLetter);
    } else {
      lives--;
      updateLives();
      drawHangman();
    }
    button.disabled = true;
  });
});

resetButton.addEventListener('click', resetGame);
hintButton.addEventListener('click', showHint);

function resetGame() {
  lives = 10;
  hintUsed = false;
  randomWord = '';

  fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(response => response.json())
    .then(data => {
      randomWord = data[0];
      createBlanks();
      updateLives();
      resetHangman();
      enableButtons();
      resetHint();
    });
}

function resetHangman() {
  // Reset hangman drawing to initial state
  // Add your own logic here
}

function enableButtons() {
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = false;
  }
  hintButton.disabled = false;
}

function resetHint() {
  clueParagraph.textContent = 'Clue -';
}

function showHint() {
  if (!hintUsed) {
    clueParagraph.textContent = `Clue - ${randomWord}`;
    hintUsed = true;
  }
}

