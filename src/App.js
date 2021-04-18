import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom';

import NavMenu from './components/navMenu'
import Cart from './pages/cart'
import Products from './pages/products'
import * as Realm from 'realm-web'

const REALM_APP_ID = 'application-0-hlkrj'
const app = new Realm.App({ id: REALM_APP_ID })

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.authCheck()
  }

  authCheck = () => {}

  render() {
    return (
      <div className='App'>
        <NavMenu />
        <Switch>
          <Route exact path='/'>
            <Products />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default connect(null, {})(App);
