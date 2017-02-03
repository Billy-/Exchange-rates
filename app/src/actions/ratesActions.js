import axios from 'axios'

export const GET_INITIAL_DATA_SUBMIT = 'GET_INITIAL_DATA_SUBMIT'
export const GET_INITIAL_DATA_SUCCESS = 'GET_INITIAL_DATA_SUCCESS'
export const GET_INITIAL_DATA_FAILURE = 'GET_INITIAL_DATA_FAILURE'

import { getHistory } from './historyActions'

export const getInitialData = _ => {
    return (dispatch, getState) => {
        dispatch({type: GET_INITIAL_DATA_SUBMIT})
        return axios.get(`https://api.fixer.io/latest`)
            .then(response => {
                dispatch({type: GET_INITIAL_DATA_SUCCESS, payload: response.data })
                dispatch(getHistory(response.data.base, Object.keys(response.data.rates)[0]))
            })
            .catch(error => {
                dispatch({type: GET_INITIAL_DATA_FAILURE, payload: error.response ? error.response.data.error : error })
            })
    }
}

export const GET_RATES_SUBMIT = 'GET_RATES_SUBMIT'
export const GET_RATES_SUCCESS = 'GET_RATES_SUCCESS'
export const GET_RATES_FAILURE = 'GET_RATES_FAILURE'

export const getRates = (base, date) => {
    return (dispatch, getState) => {
        dispatch({type: GET_RATES_SUBMIT})
        return axios.get(`https://api.fixer.io/${date.format('YYYY-MM-DD')}`, { params: { base } })
            .then(response => {
                const { data } = response
                const keys = Object.keys(data.rates)
                dispatch({type: GET_RATES_SUCCESS, payload: data })
                let { comparing } = getState().rates
                comparing = (comparing == response.data.base || !keys[comparing]) ? keys[0] : comparing
                dispatch(getHistory(response.data.base, comparing))
            })
            .catch(error => {
                dispatch({type: GET_RATES_FAILURE, payload: error.response ? error.response.data.error : error })
            })
    }
}

export const DATE_CHANGED = 'DATE_CHANGED'

export const changeDate = date => {
    return (dispatch, getState) => {
        dispatch({type: DATE_CHANGED, payload: date})
        const { base } = getState().rates
        dispatch(getRates(base, date))
    }
}

export const BASE_CHANGED = 'BASE_CHANGED'

export const changeBase = base => {
    return (dispatch, getState) => {
        dispatch({type: BASE_CHANGED, payload: base})
        const { date } = getState().rates
        dispatch(getRates(base, date))
    }
}