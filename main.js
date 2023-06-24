const $player1 = document.querySelector('.namePlayer1')
const $player2 = document.querySelector('.namePlayer2')
let player1Score = 0
let player2Score = 0
let player1Moves = []
let player2Moves = []

function selectNames() {
  const namePlayer1 = prompt('Digite o nome do Jogador que será o X')
  const namePlayer2 = prompt('Digite o nome do Jogador que será o O')

  $player1.innerText = namePlayer1
  $player2.innerText = namePlayer2
}

function turnX(tag) {
  const $h1 = document.createElement('h1')
  $h1.innerText = 'X'
  $h1.classList.add('styleX')
  document.body.classList.remove('Xturn')
  document.body.classList.add('Oturn')
  document.querySelector('.player1').classList.remove('thisTurn')
  document.querySelector('.player2').classList.add('thisTurn')
  document.querySelector('.turn').innerHTML = `Vez de O - ${$player2.innerHTML}`
  player1Moves.push(tag.classList[1])
  return $h1
}

function turnO(tag) {
  const $h1 = document.createElement('h1')
  $h1.innerText = 'O'
  $h1.classList.add('styleO')
  document.body.classList.remove('Oturn')
  document.body.classList.add('Xturn')
  document.querySelector('.player2').classList.remove('thisTurn')
  document.querySelector('.player1').classList.add('thisTurn')
  document.querySelector('.turn').innerHTML = `Vez de X - ${$player1.innerHTML}`
  player2Moves.push(tag.classList[1])
  return $h1
}

function returnWin() {
  if (
    player1Moves.includes('b1') && player1Moves.includes('b2') && player1Moves.includes('b3') ||
    player2Moves.includes('b1') && player2Moves.includes('b2') && player2Moves.includes('b3')
  ) return true

  else if (
    player1Moves.includes('b4') && player1Moves.includes('b5') && player1Moves.includes('b6') ||
    player2Moves.includes('b4') && player2Moves.includes('b5') && player2Moves.includes('b6')
  ) return true

  else if (
    player1Moves.includes('b7') && player1Moves.includes('b8') && player1Moves.includes('b9') ||
    player2Moves.includes('b7') && player2Moves.includes('b8') && player2Moves.includes('b9')
  ) return true

  else if (
    player1Moves.includes('b1') && player1Moves.includes('b4') && player1Moves.includes('b7') ||
    player2Moves.includes('b1') && player2Moves.includes('b4') && player2Moves.includes('b7')
  ) return true

  else if (
    player1Moves.includes('b2') && player1Moves.includes('b5') && player1Moves.includes('b8') ||
    player2Moves.includes('b2') && player2Moves.includes('b5') && player2Moves.includes('b8')
  ) return true

  else if (
    player1Moves.includes('b3') && player1Moves.includes('b6') && player1Moves.includes('b9') ||
    player2Moves.includes('b3') && player2Moves.includes('b6') && player2Moves.includes('b9')
  ) return true

  else if (
    player1Moves.includes('b1') && player1Moves.includes('b5') && player1Moves.includes('b9') ||
    player2Moves.includes('b1') && player2Moves.includes('b5') && player2Moves.includes('b9')
  ) return true

  else if (
    player1Moves.includes('b3') && player1Moves.includes('b5') && player1Moves.includes('b7') ||
    player2Moves.includes('b3') && player2Moves.includes('b5') && player2Moves.includes('b7')
  ) return true

  else if (player1Moves.length >= 5 || player2Moves.length > 4) {
    setTimeout(() => {
      empate()
    }, 300)
  }

  return
}

function empate() {
  document.querySelector('.empate').style.display = 'block'
  document.querySelector('.mainDiv').style.display = 'none'
}

function rebootGame() {
  document.querySelector('.turn').innerText = `Vez de X - ${$player1.innerText}`

  if (document.body.classList.contains('Oturn')) {
    document.body.classList.remove('Oturn')
    document.body.classList.add('Xturn')
  }

  if (document.querySelector('.player2').classList.contains('thisTurn')) {
    document.querySelector('.player2').classList.remove('thisTurn')
    document.querySelector('.player1').classList.add('thisTurn')
  }

  document.querySelectorAll('.bloco').forEach(function (valor) {
    return valor.innerHTML = ''
  })

  document.querySelector('.winX').style.display = 'none'
  document.querySelector('.winO').style.display = 'none'
  document.querySelector('.empate').style.display = 'none'
  document.querySelector('.mainDiv').style.display = 'flex'

  player1Moves = []
  player2Moves = []
}

function startGame() {

  document.querySelector('.player1').classList.add('thisTurn')
  document.querySelector('.turn').innerText = `Vez de X - ${$player1.innerText}`
  document.addEventListener('click', function (e) {
    const tag = e.target

    if (tag.classList.contains('rebootGame')) {
      rebootGame()
    }

    if (tag.classList.contains('bloco')) {

      if (tag.innerText) {
        alert('Campo já selecionado pelo adiversario')
        return
      }

      if (document.body.classList.contains('Xturn')) {
        tag.append(turnX(tag))
        if (returnWin()) {
          player1Score++
          document.querySelector('.player1 .input .score').innerHTML = player1Score

          setTimeout(() => {
            document.querySelector('.turn').innerHTML = `Jogador X - ${$player1.innerText} ganhouu!!`
            document.querySelector('.mainDiv').style.display = 'none'
            document.querySelector('.winX').style.display = 'flex'
          }, 100)
        }

      } else {
        document.querySelector('.player2').classList.toggle('thisTurn')
        tag.append(turnO(tag))
        if (returnWin()) {
          player2Score++
          document.querySelector('.player2 .input .score').innerHTML = player2Score

          setTimeout(() => {
            document.querySelector('.turn').innerHTML = `Jogador O - ${$player2.innerText} ganhouu!!`
            document.querySelector('.mainDiv').style.display = 'none'
            document.querySelector('.winO').style.display = 'flex'
          }, 100)
        }
      }
    }
  }) 
}

startGame()
