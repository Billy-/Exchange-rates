import React from 'react'
import Header from '../header'
import Menu from '../menu'
import CSSModules from 'react-css-modules'
import styles from './styles.css'

let Page = React.createClass({
  render() {
    return <div>
        <header>
          <Header />
          <Menu />
        </header>
        <main styleName="container main">
          {this.props.children}
        </main>
    </div>
  }
})

export default CSSModules(Page, styles, {allowMultiple: true})