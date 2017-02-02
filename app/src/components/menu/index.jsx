import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'

import styles from './style.css'

const NavLink = props => {
    return <Link {...props} className={styles["menu-link"]} activeClassName={styles.active} />
}
const Menu = _ => <ul styleName="menu">
    <li styleName="menu-item"><NavLink to="/about">About</NavLink></li>
    <li styleName="menu-item"><NavLink to="/rates">Get Rates</NavLink></li>
</ul>

export default CSSModules(Menu, styles)