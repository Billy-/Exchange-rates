import axios from 'axios'

export const GET_INITIAL_DATA_SUBMIT = 'GET_INITIAL_DATA_SUBMIT'
export const GET_INITIAL_DATA_SUCCESS = 'GET_INITIAL_DATA_SUCCESS'
export const GET_INITIAL_DATA_FAILURE = 'GET_INITIAL_DATA_FAILURE'

export const getInitialData = _ => {
    console.log('submitGET_INITIAL_DATAThunk')
    return dispatch => {
        console.log('submitGET_INITIAL_DATA')
        dispatch({type: GET_INITIAL_DATA_SUBMIT})
        return axios.get(`http://api.fixer.io/latest`)
            .then(response => {
                console.log('res', response)
                dispatch({type: GET_INITIAL_DATA_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({type: GET_INITIAL_DATA_FAILURE, payload: error.response.data.error })
            })
    }
}

export const GET_RATES_SUBMIT = 'GET_RATES_SUBMIT'
export const GET_RATES_SUCCESS = 'GET_RATES_SUCCESS'
export const GET_RATES_FAILURE = 'GET_RATES_FAILURE'

export const getRates = (base, date) => {
    console.log('submitGET_RATESThunk', base, date)
    return dispatch => {
        console.log('submitGET_RATES', base, date)
        dispatch({type: GET_RATES_SUBMIT})
        return axios.get(`http://api.fixer.io/${date.format('YYYY-MM-DD')}`, { params: { base } })
            .then(response => {
                console.log('res', response)
                dispatch({type: GET_RATES_SUCCESS, payload: response.data })
            })
            .catch(error => {
                dispatch({type: GET_RATES_FAILURE, payload: error.response.data.error })
            })
    }
}

export const DATE_CHANGED = 'DATE_CHANGED'

export const changeDate = date => {
    console.log('changeDateThunk', date)
    return (dispatch, getState) => {
        dispatch({type: DATE_CHANGED, payload: date})
        const base = getState().rates.base
        dispatch(getRates(base, date))
    }
}

export const BASE_CHANGED = 'BASE_CHANGED'

export const changeBase = base => {
    console.log('baseChangeThunk', base)
    return (dispatch, getState) => {
        dispatch({type: BASE_CHANGED, payload: base})
        const date = getState().rates.date
        dispatch(getRates(base, date))
    }
}