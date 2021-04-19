// import axios from 'axios'
import * as Realm from 'realm-web'

const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID })

export const authCheck = () => {
  return dispatch => {
    if (app.currentUser) {
      dispatch({
        type: 'LOGIN',
        payload: app.currentUser._profile,
      })
    }
  }
}

export const authSignup = (email, password) => {
  return async dispatch => {
    await app.emailPasswordAuth.registerUser(email, password).then(() => {
      dispatch({
        type: '',
        payload: '',
      })
    })
  }
}

export const authLogin = (email, password) => {
  const credentials = Realm.Credentials.emailPassword(email, password)
  return async dispatch => {
    await app.logIn(credentials).then(user => {
      if (user.id === app.currentUser.id) {
        dispatch({
          type: 'LOGIN',
          payload: app.currentUser._profile,
        })
      }
    })
  }
}

export const authLogout = () => {
  return async dispatch => {
    if (app.currentUser) await app.currentUser.logOut()
    dispatch({
      type: 'LOGOUT',
      payload: {},
    })
  }
}
