import { IUserReducer } from '../../utils/interfaces'

const INITIAL_STATE: IUserReducer = {
	accessToken: null,
}

export default (state: IUserReducer = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case 'USER_LOGGED_IN':
			return { ...state, accessToken: action.payload }
		case 'USER_LOGGED_OUT':
			return { ...state, accessToken: null }
		default:
			return state
	}
}
