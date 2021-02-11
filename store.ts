import { createStore } from 'redux'
import cupGameReducer from 'reducers'
import defaultSetting from 'default'
const store = createStore(cupGameReducer, defaultSetting)

export default store