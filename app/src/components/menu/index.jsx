import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'

import styles from './style.css'

let Menu = _ => <ul styleName="menu">
    <li styleName="menu-item"><Link to="/" styleName="menu-link">Home</Link></li>
    <li styleName="menu-item"><Link to="/about" styleName="menu-link">About</Link></li>
    <li styleName="menu-item"><Link to="/rates" styleName="menu-link">Get Rates</Link></li>
</ul>

export default CSSModules(Menu, styles)