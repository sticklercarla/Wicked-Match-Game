// cardArray
const cardsArray = [
  {
    name: 'avi',
    img: 'images/dee.jpg',
  },
  {
    name: 'tess',
    img: 'images/eden.jpg',
  },
  {
    name: 'rachel',
    img: 'images/idina.jpg',
  },
  {
    name: 'tom',
    img: 'images/jackie.jpg',
  },
  {
    name: 'daniela',
    img: 'images/jenny.jpg',
  },
  {
    name: 'josh',
    img: 'images/julia.jpg',
  },
  {
    name: 'otha',
    img: 'images/shoshana.jpg',
  },
  {
    name: 'kevin',
    img: 'images/stephanie.jpg',
  },
]

const game = document.querySelector('#game-grid')


const newGame = () => {
  let counterNum = document.querySelector("#click-count")
  counterNum.innerHTML = 0
  game.innerHTML = ""
  gameGrid.sort(() => 0.5 - Math.random())
  gameGrid.forEach (student => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.name = student.name

    const front = document.createElement('div')
    front.classList.add('front')

    const back = document.createElement('div')
      back.classList.add('back')
      back.style.backgroundImage = `url(${student.img})`
      // card.style.backgroundImage = `url(${student.img})`
      game.appendChild(card)
      card.appendChild(front)
      card.appendChild(back)
  })
}

let refreshGame = document.querySelector("#new-game")
refreshGame.addEventListener("click", newGame)

// duplicating cards
let gameGrid = cardsArray.concat(cardsArray)
gameGrid.sort(() => 0.5 - Math.random())

let firstGuess = ''
let secondGuess = ''
let count = 0
let previousTarget = null;

gameGrid.forEach (student => {
  const card = document.createElement('div')
  card.classList.add('card')
  card.dataset.name = student.name

  const front = document.createElement('div')
  front.classList.add('front')

  const back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${student.img})`
    // card.style.backgroundImage = `url(${student.img})`
    game.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)
})


// add eventListener to cards
game.addEventListener('click', function(event) {
  let clickCount = document.querySelector("#click-count")
  let num = clickCount.innerText
  let int = parseInt(num)


  let clicked = event.target
  if (clicked.className === 'card' ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains('selected')
      ) {
        return
      }
    if (count < 2){
      count++
      if (count === 1) {
          firstGuess = clicked.parentNode.dataset.name
          clicked.parentNode.classList.add('selected')
      } else {
          secondGuess = clicked.parentNode.dataset.name
          clicked.parentNode.classList.add('selected')
          int++
          clickCount.innerText = int

      }
      if (firstGuess !== '' && secondGuess !== ''){
          if (firstGuess === secondGuess) {
            setTimeout(match, delay)
            setTimeout(resetGuesses, delay)
            match();
            resetGuesses();
          } else {
             setTimeout(resetGuesses, delay)
          }
       }
       previousTarget = clicked;
     }
  });

let delay = 500;

const match = () => {
  let selected = document.querySelectorAll('.selected')
  selected.forEach(card => {
    card.classList.add('match')
  })
  if (document.querySelectorAll('.match').length === 16){
    gameOver(event)
    let modal = document.querySelector(".gameOver")
    modal.style.display = "block"
    let refreshBtn = document.querySelector(".closeBtn")
    refreshBtn.addEventListener('click', function(){
    newGame()
    modal.style.display = "none"
    })
  }
}

const resetGuesses = () => {
  firstGuess = ''
  secondGuess = ''
  count = 0

  let selected = document.querySelectorAll('.selected')
  selected.forEach(card => {
    card.classList.remove('selected')
  })
}
