import axios from 'axios'
import { Promise } from 'bluebird'
import moment from 'moment'

export const GET_HISTORY_SUBMIT = 'GET_HISTORY_SUBMIT'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS'
export const GET_HISTORY_FAILURE = 'GET_HISTORY_FAILURE'

import access_key from './accessKey'

export const getHistory = (base, compare) => {
    return dispatch => {
        dispatch({type: GET_HISTORY_SUBMIT, payload: compare})
        const reqs = [...Array(12).keys()].map(e => moment().subtract(e, 'months')).reverse()
        let responses = []
        let data = { labels: reqs.map(d => d.format('MMM')), datasets: [{data: [], fillColor: 'rgba(52,204,204,0.3)', borderColor: 'rgba(52,204,204,1)'}]}
        return Promise.map(reqs, d => {
            return axios.get(`http://data.fixer.io/api/${d.format('YYYY-MM-DD')}`, { params: { base, symbols: compare, access_key } })
                .then(response => responses.push(response.data))
        }, { concurrency: 10 })
        .then(_ => {
            data.datasets[0].data = sortByKey(responses.map(r => { return {date: r.date, rate: r.rates[compare] }}), 'date').map(r => r.rate)
            dispatch({type: GET_HISTORY_SUCCESS, payload: data })
        })
        .catch(error => {
            dispatch({type: GET_HISTORY_FAILURE, payload: error.response ? error.response.data.error : error })
        })
    }
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}