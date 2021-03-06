export const validateEmail = email => {
  return dispatch => {
    let type = 'PASS'
    let valData = {}
    if (
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      type = 'VALIDATED'
      valData = {
        type: 'email',
        status: true,
        message: 'Please input a valid email address',
      }
    }
    dispatch({
      type: type,
      payload: valData,
    })
  }
}

export const validatePassword = password => {
  return dispatch => {
    let type = 'PASS'
    let valData = {}
    if (!password) {
      type = 'VALIDATED'
      valData = {
        type: 'password',
        status: true,
        message: 'Please input password',
      }
    } else if (!password.match(/^(?=.*\d)(?=.*[a-zA-Z])/)) {
      type = 'VALIDATED'
      valData = {
        type: 'password',
        status: true,
        message: 'Password must contain number and alphabetical character',
      }
    } else if (password.length < 6) {
      type = 'VALIDATED'
      valData = {
        type: 'password',
        status: true,
        message: 'Password length minimun 6 characters',
      }
    }
    dispatch({
      type: type,
      payload: valData,
    })
  }
}
