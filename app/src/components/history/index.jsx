import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import moment from 'moment'

import { Line } from 'react-chartjs'

import styles from './style.css'

import { getHistory } from '../../actions/historyActions'

let History = state => {
    const { isLoading, data, errorMsg } = state
    return <div styleName="history">
        { isLoading && <p styleName="loading">Loading last 12 months</p> }
        { errorMsg && <p>{errorMsg}</p> }
        { data && <Line data={data} options={{responsive: true}}/> }
    </div>
}

History = CSSModules(History, styles)

const mapStateToProps = (state, ownProps) => {
    return { ...state.history }
}

History = connect(mapStateToProps)(History)

export default History