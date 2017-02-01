import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux' 
import { Field, reduxForm } from 'redux-form'

//import styles from './style.css'
let styles = {}

import { getRates } from '../../actions/ratesActions'

import currencyCodes from './currencyCodes'

//Rushing a bit here, could dynamically get this data, but harcoding for now.
const currencies = currencyCodes.map(c => <option value={c} key={c}>{c}</option>)
const years = [...Array(18).keys()].map(y => <option value={y+1999} key={y}>{y+1999}</option>)
const months = [...Array(12).keys()].map(m => <option value={m+1} key={m}>{m+1}</option>)
// Again, very rushed, much hardcoded. Every month has 31 days >.< I will use a datepicker + pull in correct data later.
const days = [...Array(31).keys()].map(d => <option value={d+1} key={d}>{d+1}</option>)

let Rates = state => {
    const { onSubmit, handleSubmit, rates } = state
    const submit = e => {
        setTimeout(_ => handleSubmit(onSubmit))
    }
    return <form onSubmit={handleSubmit(onSubmit)}>
        <Field name="base" component="select" onChange={submit}>{currencies}</Field>
        <Field name="day" component="select" oChange={submit}>{days}</Field>
        <Field name="month" component="select" onChange={submit}>{months}</Field>
        <Field name="year" component="select" onChange={submit}>{years}</Field>
    </form>
}
Rates = reduxForm({form: 'rates'})(Rates)
Rates = CSSModules(Rates, styles)

const mapStateToProps = (state, ownProps) => {
    console.log('mapStateToProps', state, ownProps)
    return { ...state.rates }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('mapDispatchToProps', ownProps)
    return {
        onSubmit: (data) => {
            console.log('onSubmit', data)
            dispatch(getRates(data))
        }
    }
}

Rates = connect(mapStateToProps, mapDispatchToProps)(Rates)

export default Rates