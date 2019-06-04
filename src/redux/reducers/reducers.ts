import { combineReducers } from 'redux'
import { IRootReducer } from '../../utils/interfaces'
import UserReducer from './userReducer'

const rootReducer = combineReducers<IRootReducer>({
	UserReducer,
})

export default rootReducer
