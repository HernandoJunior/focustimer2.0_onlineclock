import * as elements from './elements.js'
import * as sounds from './sounds.js'
import * as timer from './timer.js'
import state from './stateInicial.js'

// Audio themes
export function changeBgColorAndPlayAudio(element, audio){
  element.classList.toggle('music-on')

  if (element.classList.contains("music-on")){
    audio.play()
    element.style.backgroundColor = "#5f3ba5"
    return
   }
   
   element.style.backgroundColor = '#e1e1e6c1'
   audio.pause()
}

export function audioTree(){
  elements.tree.addEventListener('click', (event) => {
    changeBgColorAndPlayAudio(tree, sounds.audioForest)
  })
}

export function audioFire(){
  elements.fire.addEventListener('click', () => {
    changeBgColorAndPlayAudio(fire, sounds.audioFire)
  })
}

export function audioRain(){
  elements.rain.addEventListener('click', () => {
    changeBgColorAndPlayAudio(rain, sounds.audioRain)
  })
}

export function audioCoffe(){
  elements.coffee.addEventListener('click', () => {
    changeBgColorAndPlayAudio(coffee, sounds.audioCoffe)
  })
  
}


//Functions in timer
export function playTimer(){
  console.log("executei a função play");
  state.isRunning = document.documentElement.classList.toggle('running')
    timer.countDown()
}

export function stopTimer(){
  console.log("executei a função stop");
  state.isRunning = false
  document.documentElement.classList.remove('running')

  timer.uptadeDisplay()
}

export function addFiveSecondsInTimer(){
  console.log("cheguei na função uptade seconds")
  
  if (state.seconds >= 60){
    state.minutes +=1
    state.seconds = 0
  }
  state.seconds += 5,
  timer.uptadeDisplay()
  
}

export function removeFiveSecondsInTimer(){
  while (state.seconds <= 0){
    state.seconds = 0
    return
  }
  state.seconds -= 5,
  timer.uptadeDisplay()
 
}

export function set () {
  elements.minutes.setAttribute('contenteditable', true)
  elements.minutes.focus()
}

export function setMinutes() {
  elements.minutes.setAttribute('contenteditable', true)
  elements.minutes.focus()
  
  elements.minutes.addEventListener('focus', () => {
    elements.minutes.textContent = ""
  })

  elements.minutes.addEventListener('keypress', (event) => {
    // Testa se o caractere digitado não é um dígito
    if (/\D/.test(event.key) || event.key.length > 3) {
        event.preventDefault(); // Impede a inserção do caractere
    }
  });

  elements.minutes.addEventListener('blur', (event) => {
    
    let time = event.currentTarget.textContent
    //ternário IF
    time = time > 60 ? 60 : time

    state.minutes = time
    state.seconds = 0
    timer.uptadeDisplay()
  })
} 