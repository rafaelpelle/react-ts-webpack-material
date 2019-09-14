import { UserReducer } from '../../utils/interfaces'

const INITIAL_STATE: UserReducer = {
	accessToken: null,
}

export default (state: UserReducer = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case 'USER_LOGGED_IN':
			return { ...state, accessToken: action.payload }
		case 'USER_LOGGED_OUT':
			return { ...state, accessToken: null }
		default:
			return state
	}
}
