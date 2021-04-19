import { combineReducers } from 'redux'
import { productReducer } from './productReducer'
import { authReducer } from './authReducer'
import { navReducer } from './navReducer'
import { validationReducer } from './validationReducer'

export const Reducers = combineReducers({
  productReducer,
  authReducer,
  navReducer,
  validationReducer
})
