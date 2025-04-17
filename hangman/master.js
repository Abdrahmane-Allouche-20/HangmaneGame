const guessContainer=document.querySelector('.guessContainer')
const mod=document.querySelector('.modal')
const model =document.querySelector('.gameOver')
const playAgain=document.querySelector('.playAgain')
let chosenWord;
let correctLetters;
let wrongGuess;
let design;
let maxGuess=6
let score=0
const scoreSpan = document.querySelector('.score')
const win=document.getElementById('win')
const faux=document.getElementById('false')
const lost=document.getElementById('lost')
const vrai=document.getElementById('true')

//game over function 
function gameOver(isVictory){
  setTimeout(()=>{
    mod.classList.add('open')
    const modalContext= isVictory? 'You Found The Word:':' the correct word is:'
    model.querySelector('img').src=isVictory? './images/victory.gif':'./images/lost.gif'
    model.querySelector('h1').innerHTML=isVictory? 'Congrats!':'Game Over'
    model.querySelector('h1').style.cssText=`${isVictory?'color:#22c55e ' :'color:#ef4444'}`
    model.querySelector('p').innerHTML=`${modalContext}  <b class=' text-base md:text-lg lg:text-3xl'>${chosenWord}`
    if(isVictory){
      win.play()
      
    }
    else{
      lost.play()
      
    }
      
      
    

  },300)
}
  //checking if clicked letter match the word
function initGame(span,clickedLetter){
  console.log(clickedLetter)
  span.classList.add('clicked')
  if(chosenWord.includes(clickedLetter)){
    vrai.play();
    [...chosenWord].forEach((letter,index)=>{
     
      if(clickedLetter===letter ){
        
        correctLetters.push(letter)  
  
        guessContainer.querySelectorAll('span')[index].innerHTML=letter
        guessContainer.querySelectorAll('span')[index].classList.add('guessed')
        span.classList.add('correct')
      }
      console.log(chosenWord.length )
    })
   
  }else{
    faux.play()
    wrongGuess--;
    design++
    for(let i=1;i<=design;i++){
      document.querySelector('.hangman-draw').classList.add(`wrong-${i}`)
    }
    span.classList.add('wrong')
    document.querySelector('.chances').innerHTML=` chance left ${wrongGuess}/${maxGuess}`
    if (wrongGuess===1) {
      document.querySelector('.chances').innerHTML=`last chance`
      
    }
    if(wrongGuess===0){
      document.querySelector('.lettersContainer').classList.add('done')
     
    }
    
  }
  if (wrongGuess === 0) {
    document.querySelector('.lettersContainer').classList.add('done');
    gameOver(false);
    score=score -10
    if(score<0){
      score=0
    }
  }
  
  if (correctLetters.length ===chosenWord.replace(/\s/g, '').length  ) {
    score+=10;
    console.log(true)
    gameOver(true);
    console.log(document.querySelector('.playAgain'))
   
  }
  
  
    scoreSpan.innerHTML=score
  
    
  
  
}


//reset the game
const resetGame=()=>{
  correctLetters=[]
   wrongGuess=6
   design=0
  mod.classList.remove('open')
  guessContainer.innerHTML=chosenWord.split('').map((letter)=>{if(letter===' '){
   return `<span class='space'></span>`
  }else{
    return `<span></span>`
  }}).join('')
for(let i =0;i<=6;i++){
  document.querySelector('.hangman-draw').classList.remove(`wrong-${i}`)
}
document.querySelector('.chances').innerHTML=` chance left ${wrongGuess}/${maxGuess}`
document.querySelector('.lettersContainer').classList.remove('done');
var letterSpans = document.querySelectorAll('.letters');
  letterSpans.forEach(function(span) {
    span.classList.remove('clicked');
    span.classList.remove('correct');
    span.classList.remove('wrong');
    lost.currentTime = 0;
    win.currentTime = 0;
    lost.pause()
    win.pause()
  });
}

//create keyboard
const alphabets='abcdefghijklmnopqrstuvwxyz'
const keyBoard=Array.from(alphabets)
document.querySelector
keyBoard.forEach(letter=>{
  const span = document.createElement('span')
  span.className='letters'
  span.appendChild(document.createTextNode(letter))
  document.querySelector('.lettersContainer').appendChild(span)
  //checking if clicked letter match the word
  span.addEventListener('click',e=>initGame(e.target,letter))
})

// random word
const words={
  Movies:['dune','fight club','interstellar','life of pi','harry potter','taxi driver','Beetlejuice','Perfect Days','cruella','creed'],
  Footballer:['Messi','Cristiano','Zidane','Maradona','pele','nedved','cruyff','mbappe','neymar','ronaldinho','haaland'],
  fruits:['banana','orange','kiwi','strawberry','pineapple','water melon','apple','melon','cherry','grapes'],
  cars:['audi','bmw','ferrari','mercedes','ford','toyota','kia','Volkswagen','volvo','chevrolet'],
  hero:['batman','superman','cyborg','robin','ironman','spiderman','wanda','dr strange','black panter','flash'],
  emotions:['angry','sad','silly','hopeful','wonder','hate','happy','disappointed','exhausted','curios'],
  personality:['calm','arrogant','humble','brave','careful','funny','friendly','polite','selfish','sweet'],
  animals:['cat','dog','bird','wolf','bear','lion','fox','crocodile','monkey','rabbit'],
  fish:['shark','orca','piranha','whale','lobster','squid','sword fish','tuna','crab','octopus'],
  sport:['football','baseball','basketball','tennis','swimming','golf','boxing','badminton','handball','rugby'],
  country:['algeria','morocco','indonesia','india','mexico','russia','japan','thailand','venezuela','romania'],
}
function randomWord(){
  let keys= Object.keys(words)
  let randomKey= keys[Math.floor(Math.random()*keys.length)]
  let value= words[randomKey]
   chosenWord=value[Math.floor(Math.random()*value.length)].toLowerCase();
  
  document.querySelector('.category').innerHTML=randomKey
  //generate guess container
  resetGame()
  
  console.log(chosenWord)
  
}
randomWord()

playAgain.addEventListener('click',randomWord)