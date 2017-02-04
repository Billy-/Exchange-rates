import React from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './style.css'

let Home = _ => <section>
    <p><b>Welcome to Exchange-R8s!</b> Your go-to web-app for currency exchange rates!</p>
    <p>Browse the home and about page at your leisure; they're packed with glorious static text to keep you entertained for hours. If you ever get tired of that, head over to the rates page to get your exchange rates now!</p>
    <Link to="rates" styleName="button">Get your rates now</Link>
</section>


export default CSSModules(Home, styles)