import state from './stateInicial.js'
import * as timer from './timer.js'
import * as action from './actions.js'

export function start (minutes, seconds){
  state.minutes = minutes
  state.seconds = seconds

  timer.uptadeDisplay()

  timer.registrerControls()
}