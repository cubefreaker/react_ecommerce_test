const INITIAL_STATE = {
  type: null,
  status: false,
  message: null,
}

export const validationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'VALIDATED':
      return { ...state, ...action.payload }
    default:
      return INITIAL_STATE
  }
}
