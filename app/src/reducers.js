import { combineReducers } from 'redux'

import ratesReducer from './reducers/ratesReducers'

export default combineReducers({ rates: ratesReducer })