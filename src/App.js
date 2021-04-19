import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import NavMenu from './components/navMenu'
import Home from './pages/home'
import Cart from './pages/cart'
import Login from './pages/login'
import Products from './pages/products'
import ProductDetail from './pages/productDetail'
import { authCheck } from './action/authAction'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTags,
  faHeart,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'

library.add(faTags, faHeart, faShoppingCart)
// app.currentUser.logOut()
// const email = "hamzah.habibi@protonmail.com"
// const password = "Pa55w0rd"

// async function loginEmailPassword(email, password) {
//   // Create an anonymous credential
//   const credentials = Realm.Credentials.emailPassword(email, password);
//   try {
//     // Authenticate the user
//     const user = await app.logIn(credentials);
//     return user
//   } catch(err) {
//     console.error("Failed to log in", err);
//   }
// }
// loginEmailPassword(email, password).then(user => {
//   console.log("Successfully logged in!", user)
// })

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.authCheck()
  }

  render() {
    return (
      <div className='App'>
        <NavMenu />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/products/:id' children={<ProductDetail />} />
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default connect(null, { authCheck })(App)
