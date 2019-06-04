// import * as createHistory from 'history/createHashHistory'
const createHistory = require('history').createHashHistory

export const history = createHistory({
	basename: '',
})
