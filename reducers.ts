import { combineReducers } from 'redux'
import { gameSettingsActions, gameScoreActions } from 'actions'
const { SET_NUMBER_OF_CUP, SET_SHUFFLE_SPEED } = gameSettingsActions
const { INCREMENT_SCORE, RESET_SCORE } = gameScoreActions

interface Action {
  type: string
  payload?: number|string
}

const gameSettingsReducer = (previousSetting = {}, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case SET_NUMBER_OF_CUP: return { ...previousSetting, numberOfCups: payload }
    case SET_SHUFFLE_SPEED: return { ...previousSetting, shuffleSpeed: payload }
    default: return previousSetting
  }
}

const gameScoreReducer = (previousScore: number = 0, action: Action) => {
  console.log('>>>>>>>>', action)
  const { type } = action
  switch (type) {
    case INCREMENT_SCORE: return previousScore + 1
    case RESET_SCORE: return 0
    default: return 0
  }
}

export default combineReducers({
  settings: gameSettingsReducer,
  score: gameScoreReducer
})
