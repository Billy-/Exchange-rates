import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import RateTable from '../rateTable'
//import styles from './style.css'
let styles = {}

import datePickerStyles from 'react-datepicker/dist/react-datepicker-cssmodules.css'

Object.assign(styles, datePickerStyles)

import { changeBase, changeDate } from '../../actions/ratesActions'

const today = moment()
const minDate = moment('19990101')
console.log('minDate', minDate)

//Rushing a bit here, could dynamically get this data, but harcoding for now.

let Rates = state => {
    const { onChangeDate, onChangeBase, currencyCodes, base, date, rates, isLoading, errorMsg } = state
    const currencies = currencyCodes.map(c => <option value={c} key={c}>{c}</option>)
    return <div>
        <select name="base" value={base} onChange={onChangeBase}>{currencies}</select>
        <DatePicker selected={date} onChange={onChangeDate} minDate={minDate} maxDate={today} format='DD/MM/YYYY' showMonthDropdown showYearDropdown dropdownMode="select" />
        { isLoading && <div>Loading</div> }
        { errorMsg && <p>{errorMsg}</p> }
        { Object.keys(rates).length > 0 && <RateTable rates={rates} /> }
    </div>
}

Rates = CSSModules(Rates, styles)

const mapStateToProps = (state, ownProps) => {
    console.log('mapStateToProps', state, ownProps)
    return { ...state.rates }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('mapDispatchToProps', ownProps)
    return {
        onChangeBase: e => {
            console.log('onChangeBase', e.target.value)
            dispatch(changeBase(e.target.value))
        },
        onChangeDate: moment => {
            console.log('onChangedate', moment)
            dispatch(changeDate(moment))
        }
    }
}

Rates = connect(mapStateToProps, mapDispatchToProps)(Rates)

export default Rates