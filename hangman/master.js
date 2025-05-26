// Select necessary DOM elements
const guessContainer = document.querySelector('.guessContainer');
const mod = document.querySelector('.modal');
const model = document.querySelector('.gameOver');
const playAgain = document.querySelector('.playAgain');
const scoreSpan = document.querySelector('.score');
const win = document.getElementById('win');
const faux = document.getElementById('false');
const lost = document.getElementById('lost');
const vrai = document.getElementById('true');
const hintDiv = document.querySelector('.hint');
const showHintBtn = document.querySelector('.showHint');
const lettersContainer = document.querySelector('.lettersContainer');
const hangmanDraw = document.querySelector('.hangman-draw');
const chancesDisplay = document.querySelector('.chances');
const categoryDisplay = document.querySelector('.category');

// Game state variables
let chosenWord = '';
let correctLetters = [];
let wrongGuess = 6;
let design = 0;
let maxGuess = 6;
let score = 0;
let currentHint = '';

// Show Game Over or Victory Modal
function gameOver(isVictory) {
  setTimeout(() => {
    mod.classList.add('open');
    model.querySelector('img').src = isVictory ? './images/victory.gif' : './images/lost.gif';
    model.querySelector('h1').innerHTML = isVictory ? 'Congrats!' : 'Game Over';
    model.querySelector('h1').style.color = isVictory ? '#22c55e' : '#ef4444';
    model.querySelector('p').innerHTML = `${isVictory ? 'You Found The Word:' : 'The correct word is:'} <b class='text-base md:text-lg lg:text-3xl'>${chosenWord}</b>`;
    isVictory ? win.play() : lost.play();
  }, 300);
}

// Main game logic
function initGame(span, clickedLetter) {
  span.classList.add('clicked');
  if (chosenWord.includes(clickedLetter)) {
    vrai.play();
    [...chosenWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        const guessSpans = guessContainer.querySelectorAll('span');
        guessSpans[index].innerHTML = letter;
        guessSpans[index].classList.add('guessed');
        span.classList.add('correct');
      }
    });
  } else {
    faux.play();
    wrongGuess--;
    design++;
    for (let i = 1; i <= design; i++) {
      hangmanDraw.classList.add(`wrong-${i}`);
    }
    span.classList.add('wrong');
    chancesDisplay.innerHTML = wrongGuess === 1 ? 'last chance' : `chance left ${wrongGuess}/${maxGuess}`;
    if (wrongGuess === 0) {
      lettersContainer.classList.add('done');
      gameOver(false);
      score = Math.max(0, score - 10);
    }
  }

  if (correctLetters.length === chosenWord.replace(/\s/g, '').length) {
    score += 10;
    gameOver(true);
  }

  scoreSpan.innerHTML = score;
}

// Generate keyboard
const keyBoard = 'abcdefghijklmnopqrstuvwxyz'.split('');
keyBoard.forEach(letter => {
  const span = document.createElement('span');
  span.className = 'letters';
  span.textContent = letter;
  lettersContainer.appendChild(span);
  span.addEventListener('click', e => initGame(e.target, letter));
});

// Word categories
const words = {
  Movies: [
    { word: 'dune', hint: 'A sci-fi epic set on a desert planet.' },
    { word: 'fight club', hint: 'The first rule is you do not talk about it.' },
    { word: 'interstellar', hint: 'A space journey through a wormhole.' },
    { word: 'life of pi', hint: 'A boy stranded at sea with a tiger.' },
    { word: 'harry potter', hint: 'A famous wizard with a lightning scar.' },
    { word: 'taxi driver', hint: 'You talkin’ to me?' },
    { word: 'beetlejuice', hint: 'Say his name three times.' },
    { word: 'perfect days', hint: 'A Japanese film about a toilet cleaner.' },
    { word: 'cruella', hint: 'Disney villain with a passion for fashion.' },
    { word: 'creed', hint: 'A boxing movie spin-off from Rocky.' }
  ],
  Footballer: [
    { word: 'messi', hint: 'Argentinian football GOAT.' },
    { word: 'cristiano', hint: 'Portuguese star, known for his jump.' },
    { word: 'zidane', hint: 'French legend, famous headbutt.' },
    { word: 'maradona', hint: 'Hand of God.' },
    { word: 'pele', hint: 'Brazilian king of football.' },
    { word: 'nedved', hint: "Czech Ballon d'Or winner." },
    { word: 'cruyff', hint: 'Dutch total football pioneer.' },
    { word: 'mbappe', hint: 'French speedster, World Cup winner.' },
    { word: 'neymar', hint: 'Brazilian with fancy footwork.' },
    { word: 'ronaldinho', hint: 'Always smiling, magical skills.' },
    { word: 'haaland', hint: 'Norwegian goal machine.' }
  ]
};

// Show hint
if (showHintBtn) {
  showHintBtn.addEventListener('click', () => {
    hintDiv.innerHTML = `<span>${currentHint}</span>`;
    showHintBtn.disabled = true;
    showHintBtn.classList.add('opacity-60', 'cursor-not-allowed');
  });
}

// Random word selector
function randomWord() {
  const categories = Object.keys(words);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const wordObj = words[randomCategory][Math.floor(Math.random() * words[randomCategory].length)];
  chosenWord = wordObj.word.toLowerCase();
  currentHint = wordObj.hint;
  categoryDisplay.innerHTML = randomCategory;
  resetGame();
  console.log('Chosen Word:', chosenWord);
}

// Reset game state
function resetGame() {
  correctLetters = [];
  wrongGuess = maxGuess;
  design = 0;
  mod.classList.remove('open');
  guessContainer.innerHTML = [...chosenWord].map(l => l === ' ' ? `<span class='space'></span>` : `<span></span>`).join('');
  for (let i = 1; i <= maxGuess; i++) {
    hangmanDraw.classList.remove(`wrong-${i}`);
  }
  chancesDisplay.innerHTML = `chance left ${wrongGuess}/${maxGuess}`;
  lettersContainer.classList.remove('done');
  document.querySelectorAll('.letters').forEach(span => {
    span.classList.remove('clicked', 'correct', 'wrong');
  });
  win.pause(); win.currentTime = 0;
  lost.pause(); lost.currentTime = 0;
  hintDiv.innerHTML = '';
  if (showHintBtn) {
    showHintBtn.disabled = false;
    showHintBtn.classList.remove('opacity-60', 'cursor-not-allowed');
  }
}

// Start first game
randomWord();

// Restart on play again
playAgain.addEventListener('click', randomWord);
