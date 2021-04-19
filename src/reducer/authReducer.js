const INITIAL_STATE = {
  user: null,
  cart: [],
}

export const authReducer = (state = INITIAL_STATE, action) => {
  let newState = { ...state }
  switch (action.type) {
    case 'LOGIN':
      newState.user = { ...action.payload }
      return newState
    case 'UPDATE_CART':
      return { ...state.cart, cart: action.payload }
    case 'LOGOUT':
      return INITIAL_STATE
    default:
      return state
  }
}
