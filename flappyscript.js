const bird = document.querySelector('.bird')
const gameContainer = document.querySelector('.game-container')

let birdBottom = 100
let gravity = 2
let isGameOver = false
let gap = 150

function startGame() {
  birdBottom -= gravity
  bird.style.bottom = birdBottom + 'px'
}

let gameTimerId = setInterval(startGame, 10)

function control(e) {
  if (e.keyCode === 32) {
    jump()
  }
}

function jump() {
  if (birdBottom < 500) {
    birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
  }
}

document.addEventListener('keyup', control)

function generatePipe() {
  let pipeLeft = 400
  let pipeBottom = Math.random() * 200

  const pipe = document.createElement('div')
  const topPipe = document.createElement('div')

  pipe.classList.add('pipe')
  topPipe.classList.add('pipe')

  pipe.classList.add('bottom-pipe')
  topPipe.classList.add('top-pipe')

  gameContainer.appendChild(pipe)
  gameContainer.appendChild(topPipe)

  pipe.style.left = pipeLeft + 'px'
  topPipe.style.left = pipeLeft + 'px'

  pipe.style.bottom = pipeBottom + 'px'
  topPipe.style.height = 600 - pipeBottom - gap + 'px'

  function movePipe() {
    pipeLeft -= 2
    pipe.style.left = pipeLeft + 'px'
    topPipe.style.left = pipeLeft + 'px'

    if (pipeLeft === -60) {
      clearInterval(pipeTimerId)
      gameContainer.removeChild(pipe)
      gameContainer.removeChild(topPipe)
    }

    // collision detection
    if (
      pipeLeft > 20 &&
      pipeLeft < 100 &&
      birdBottom < pipeBottom + 50 ||
      pipeLeft > 20 &&
      pipeLeft < 100 &&
      birdBottom > pipeBottom + gap - 200
    ) {
      gameOver()
    }
  }

  let pipeTimerId = setInterval(movePipe, 20)
  if (!isGameOver) setTimeout(generatePipe, 3000)
}

generatePipe()

function gameOver() {
  clearInterval(gameTimerId)
  isGameOver = true
  document.removeEventListener('keyup', control)
}
