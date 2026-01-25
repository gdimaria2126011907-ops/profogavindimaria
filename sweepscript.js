const grid = document.querySelector('.grid')
const width = 10
const bombAmount = 20

let squares = []
let isGameOver = false

function createBoard() {
  //  bombs and  squares
  const bombsArray = Array(bombAmount).fill('bomb')
  const emptyArray = Array(width * width - bombAmount).fill('valid')
  const gameArray = emptyArray.concat(bombsArray)
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

  // create 
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.setAttribute('id', i)
    square.classList.add(shuffledArray[i])
    grid.appendChild(square)
    squares.push(square)

    // left click
    square.addEventListener('click', function () {
      if (isGameOver) return

      if (square.classList.contains('bomb')) {
        gameOver()
      } else {
        checkSquare(square, i)
      }
    })

    // right click
    square.oncontextmenu = function (e) {
      e.preventDefault()
      if (isGameOver) return
      if (!square.classList.contains('checked')) {
        square.classList.toggle('flag')
      }
    }
  }
}

function checkSquare(square, id) {
  if (square.classList.contains('checked')) return

  const isLeftEdge = (id % width === 0)
  const isRightEdge = (id % width === width - 1)

  let total = 0

  // check surrounding squares
  if (id > 0 && !isLeftEdge && squares[id - 1].classList.contains('bomb')) total++
  if (id > 9 && !isRightEdge && squares[id + 1 - width].classList.contains('bomb')) total++
  if (id > 10 && squares[id - width].classList.contains('bomb')) total++
  if (id > 11 && !isLeftEdge && squares[id - 1 - width].classList.contains('bomb')) total++
  if (id < 98 && !isRightEdge && squares[id + 1].classList.contains('bomb')) total++
  if (id < 90 && !isLeftEdge && squares[id - 1 + width].classList.contains('bomb')) total++
  if (id < 88 && !isRightEdge && squares[id + 1 + width].classList.contains('bomb')) total++
  if (id < 89 && squares[id + width].classList.contains('bomb')) total++

  square.classList.add('checked')

  if (total === 0) {
    // reveal surro squares
    setTimeout(() => {
      if (id > 0 && !isLeftEdge) checkSquare(squares[id - 1], id - 1)
      if (id > 9 && !isRightEdge) checkSquare(squares[id + 1 - width], id + 1 - width)
      if (id > 10) checkSquare(squares[id - width], id - width)
      if (id > 11 && !isLeftEdge) checkSquare(squares[id - 1 - width], id - 1 - width)
      if (id < 98 && !isRightEdge) checkSquare(squares[id + 1], id + 1)
      if (id < 90 && !isLeftEdge) checkSquare(squares[id - 1 + width], id - 1 + width)
      if (id < 88 && !isRightEdge) checkSquare(squares[id + 1 + width], id + 1 + width)
      if (id < 89) checkSquare(squares[id + width], id + width)
    }, 10)
  } else {
    square.innerHTML = total
    square.setAttribute('data', total)
  }
}

function gameOver() {
  isGameOver = true

  squares.forEach(square => {
    if (square.classList.contains('bomb')) {
      square.innerHTML = '💣'
      square.classList.add('bomb-reveal')
    }
  })
}


createBoard()
