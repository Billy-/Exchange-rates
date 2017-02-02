import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Page from './components/page'
import Home from './components/home'
import About from './components/about.jsx'
import Rates from './components/rates'
import { NotFound } from './components/404.jsx'

import { getInitialData } from './actions/ratesActions'

import styles from './global.css'

import reducers from './reducers'

const loggerMiddleware = createLogger()

let appReducer = _ => null

let store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware))

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Page} onEnter={_ => store.dispatch(getInitialData())}>
                <IndexRoute component={Home} />
                <Route path="about" component={About} />
                <Route path="rates" component={Rates} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    </Provider>,
    app
)