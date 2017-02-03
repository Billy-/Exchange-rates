import { combineReducers } from 'redux'

import ratesReducer from './reducers/ratesReducers'
import historyReducer from './reducers/historyReducers'
export default combineReducers({ rates: ratesReducer, history: historyReducer })