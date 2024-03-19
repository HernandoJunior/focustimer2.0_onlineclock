import state from './stateInicial.js'
import * as actions from './actions.js'
import * as elements from './elements.js'
import { buttonsTimer } from './elements.js'
import { kitchenTimer } from './sounds.js'

export function registrerControls() {
  buttonsTimer.addEventListener('click', (event) => {
    const action = event.target.dataset.action
    
    if (typeof actions[action] != "function"){
      return
    }

    actions[action]()
  })
}

export function countDown() {
  clearTimeout(state.countDownId)

  if(state.isRunning === false) {
    return
  }

  let minutes = Number(elements.minutes.textContent)
  let seconds = Number(elements.seconds.textContent)
  
  seconds--
  if(seconds < 0){
    seconds = 59
    minutes--
  }
  
  if(minutes < 0){
    actions.stopTimer()
    kitchenTimer.play()
    return
  }
  
  uptadeDisplay(minutes, seconds)
  
  /*FUNÇÃO DO JAVASCRIPT P EXECUTAR UMA FUNÇÃO DEPOIS DE DETERMINADO TEMPO EM MILISEGUNDOS - 
  RECURSÃO = QUANDO UMA FUNÇÃO CHAMA ELA MESMA EM ALGUM MOMENTO */
  state.countDownId = setTimeout(() => countDown(), 1000)
}

export function uptadeDisplay(minutes, seconds) {
  minutes = minutes ?? state.minutes 
  seconds = seconds ?? state.seconds

  elements.minutes.textContent = String(minutes).padStart(2, "0")
  elements.seconds.textContent = String(seconds).padStart(2, "0")
}


export function setMinutes() {
  elements.minutes.addEventListener('focus', () => {
    elements.minutes.textContent = ""
  })

  elements.minutes.addEventListener('keypress', (event) => {
    
    const maxLength = 2;
    // Testa se o caractere digitado não é um dígito
    if (/\D/.test(event.key) || event.target.textContent.length >= maxLength) {
        event.preventDefault(); // Impede a inserção do caractere
    }
  });

  elements.minutes.addEventListener('blur', (event) => {
    
    let time = event.currentTarget.textContent
    //ternário IF
    time = time > 60 ? 60 : time

    state.minutes = time
    state.seconds = 0
    uptadeDisplay()
  })
} 