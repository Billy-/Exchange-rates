import { combineReducers } from 'redux'
import moment from 'moment'
import { GET_INITIAL_DATA_SUBMIT, GET_INITIAL_DATA_SUCCESS, GET_INITIAL_DATA_FAILURE, GET_RATES_SUBMIT, GET_RATES_SUCCESS, GET_RATES_FAILURE, BASE_CHANGED, DATE_CHANGED } from '../actions/ratesActions'

const initialState = {
    isLoading: false,
    errorMsg: null,
    currencyCodes: [],
    base: 'EUR',
    date: moment(),
    rates: []
}

export default (state=initialState, action) => {
    console.log('ratesReducer', state, action)
    switch (action.type) {
        case GET_INITIAL_DATA_SUBMIT:
        case GET_RATES_SUBMIT:
            return { ...state, isLoading: true, rates: [] }
        case GET_INITIAL_DATA_FAILURE:
        case GET_RATES_FAILURE:
            return { ...state, isLoading: false, errorMsg: action.payload }
        case GET_INITIAL_DATA_SUCCESS:
            return { ...state, isLoading: false, errorMsg: null, base: action.payload.base, currencyCodes: Object.keys(action.payload.rates).concat(action.payload.base).sort(), rates: action.payload.rates}
        case GET_RATES_SUCCESS:
            return { ...state, isLoading: false, errorMsg: null, rates: action.payload.rates }
        case BASE_CHANGED:
            return { ...state, base: action.payload }
        case DATE_CHANGED:
            return { ...state, date: action.payload }
        default:
            return { ...state }
    }
}