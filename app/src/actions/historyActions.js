import axios from 'axios'
import { Promise } from 'bluebird'
import moment from 'moment'

export const GET_HISTORY_SUBMIT = 'GET_HISTORY_SUBMIT'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS'
export const GET_HISTORY_FAILURE = 'GET_HISTORY_FAILURE'

export const getHistory = (base, compare) => {
    return dispatch => {
        dispatch({type: GET_HISTORY_SUBMIT, payload: compare})
        const reqs = [...Array(12).keys()].map(e => moment().subtract(e, 'months')).reverse()
        let data = { labels: reqs.map(d => d.format('MMM')), datasets: [{data: [], fillColor: 'rgba(52,204,204,0.3)', borderColor: 'rgba(52,204,204,1)'}]}
        return Promise.map(reqs, d => {
            return axios.get(`https://api.fixer.io/${d.format('YYYY-MM-DD')}`, { params: { base, symbols: compare } })
                .then(response => data.datasets[0].data.push(response.data.rates[compare]))
        }, { concurrency: 10 })
        .then(_ => {
            dispatch({type: GET_HISTORY_SUCCESS, payload: data })
        })
        .catch(error => {
            dispatch({type: GET_HISTORY_FAILURE, payload: error.response ? error.response.data.error : error })
        })
    }
}
