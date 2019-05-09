import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import MediaQuery from 'react-responsive'
import moment from 'moment'
import RateTable from '../rateTable'
import styles from './style.css'

import History from '../history'

import datePickerStyles from 'react-datepicker/dist/react-datepicker-cssmodules.css'

Object.assign(styles, datePickerStyles)

import { changeBase, changeDate } from '../../actions/ratesActions'
import { getHistory } from '../../actions/historyActions'
const today = moment()
const minDate = moment('19990101')

let Rates = state => {
    const { onChangeDate, onChangeBase, onChangeHistory, currencyCodes, base, date, rates, comparing, isLoading, errorMsg } = state
    const currencies = currencyCodes.map(c => <option value={c} key={c}>{c}</option>)
    return <div styleName="widget">
        <div styleName="rates">
            <select className={styles.input} name="base" value={base} onChange={onChangeBase}>{currencies}</select>
            <DatePicker className={styles.input} selected={date} onChange={onChangeDate} minDate={minDate} maxDate={today} format='DD/MM/YYYY' showMonthDropdown showYearDropdown dropdownMode="select" />
            { isLoading && <div styleName="loading-icon">Loading</div> }
            { errorMsg && <p>{errorMsg}</p> }
            { Object.keys(rates).length > 0 && <RateTable rates={rates} comparing={comparing} onChangeHistory={compare => onChangeHistory(base, compare)}/> }
        </div>
        <MediaQuery query="(min-width: 800px)"><History /></MediaQuery>
    </div>
}

Rates = CSSModules(Rates, styles)

const mapStateToProps = (state, ownProps) => {
    return { ...state.rates }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChangeBase: e => {
            dispatch(changeBase(e.target.value))
        },
        onChangeDate: moment => {
            dispatch(changeDate(moment))
        },
        onChangeHistory: (base, compare) => {
            dispatch(getHistory(base, compare))
        }
    }
}

Rates = connect(mapStateToProps, mapDispatchToProps)(Rates)

export default Rates
