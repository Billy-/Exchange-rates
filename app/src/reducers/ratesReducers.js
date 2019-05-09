import { combineReducers } from 'redux'
import moment from 'moment'
import { GET_INITIAL_DATA_SUBMIT, GET_INITIAL_DATA_SUCCESS, GET_INITIAL_DATA_FAILURE, GET_RATES_SUBMIT, GET_RATES_SUCCESS, GET_RATES_FAILURE, BASE_CHANGED, DATE_CHANGED } from '../actions/ratesActions'
import { GET_HISTORY_SUBMIT } from '../actions/historyActions'

const initialState = {
    isLoading: false,
    errorMsg: null,
    currencyCodes: ['EUR'],
    base: 'EUR',
    comparing: 'USD',
    date: moment(),
    rates: []
}

export default (state=initialState, action) => {
    switch (action.type) {
        case GET_INITIAL_DATA_SUBMIT:
        case GET_RATES_SUBMIT:
            return { ...state, isLoading: true }
        case GET_INITIAL_DATA_FAILURE:
        case GET_RATES_FAILURE:
            return { ...state, isLoading: false, errorMsg: action.payload.message }
        case GET_INITIAL_DATA_SUCCESS:
            return { ...state, isLoading: false, errorMsg: null, base: action.payload.base, currencyCodes: Object.keys(action.payload.rates).concat(action.payload.base).sort(), rates: action.payload.rates}
        case GET_RATES_SUCCESS:
            const currencyCodes = Object.keys(action.payload.rates).concat(action.payload.base).sort()
            return { ...state, isLoading: false, errorMsg: null, currencyCodes, rates: action.payload.rates }
        case BASE_CHANGED:
            return { ...state, base: action.payload }
        case DATE_CHANGED:
            return { ...state, date: action.payload }
        case GET_HISTORY_SUBMIT:
            return { ...state, comparing: action.payload }
        default:
            return { ...state }
    }
}