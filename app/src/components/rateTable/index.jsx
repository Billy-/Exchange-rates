import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import cx from 'classnames'
import styles from './style.css'

import History from '../history'

let RateTable = state => {
    const { rates, comparing, onChangeHistory } = state
    console.log(comparing)
    const keys = Object.keys(rates).sort()
    const ci = keys.indexOf(comparing)
    const tableContent = keys.map(r => {
        return <tr key={r} styleName={cx('rate', { active: comparing == r })} onClick={_ => onChangeHistory(r)}>
            <td>{r}</td>
            <td>{rates[r]}</td>
        </tr>
    })
    const history = <MediaQuery key="history" query="(max-width: 800px)">{ ci > -1 ? <tr styleName="history"><td colSpan="2"><History /></td></tr> : null }</MediaQuery>
    console.log(ci)
    tableContent.splice(ci+1, 0, history )
    return <table styleName='table'>
        <thead><tr><th>Currency</th><th>Rate</th></tr></thead>
        <tbody>
        { tableContent }
        </tbody>
    </table>
}

RateTable = CSSModules(RateTable, styles, {allowMultiple: true})

export default RateTable