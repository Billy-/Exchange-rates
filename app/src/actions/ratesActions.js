import axios from 'axios'

export const GET_RATES_SUBMIT = 'GET_RATES_SUBMIT'
export const GET_RATES_SUCCESS = 'GET_RATES_SUCCESS'
export const GET_RATES_FAILURE = 'GET_RATES_FAILURE'

export const getRates = params => {
    console.log('submitGET_RATESThunk', params)
    return dispatch => {
        console.log('submitGET_RATES', params)
        dispatch({type: GET_RATES_SUBMIT})
        return axios.post('https://fixer.io', params)
            .then(response => {
                console.log('res', response)
                dispatch({type: GET_RATES_SUCCESS, payload: response})
            })
            .catch(error => {
                console.log('err', error)
                let msg = error.response && error.response.data ? error.response.data : error.message
                dispatch({type: GET_RATES_FAILURE, payload: msg })
            })
    }
}