import { combineReducers } from 'redux'
import { RootReducer } from '../utils/interfaces'
import UserReducer from './userReducer'

const rootReducer = combineReducers<RootReducer>({
	UserReducer,
})

export default rootReducer
