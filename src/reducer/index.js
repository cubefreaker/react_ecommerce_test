import { combineReducers } from 'redux'
import { productReducer } from './productReducer'
import { authReducer } from './authReducer'

export const Reducers = combineReducers({
  productReducer,
  authReducer,
})
