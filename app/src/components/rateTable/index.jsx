import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import styles from './style.css'

let RateTable = state => {
    const { rates } = state
    return <table styleName='table'>
        <thead><tr><th>Currency</th><th>Rate</th></tr></thead>
        <tbody>
        { Object.keys(rates).sort().map(r => {
            return <tr key={r}>
                <td>{r}</td>
                <td>{rates[r]}</td>
            </tr>
        }) }
        </tbody>
    </table>
}

RateTable = CSSModules(RateTable, styles)

export default RateTable