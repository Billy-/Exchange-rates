import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from './style.css'

let Header = _ => <Link style={{"textDecoration": "none"}} to='/'><h1 styleName="header">Exchange-R8s</h1></Link>

export default CSSModules(Header, styles)