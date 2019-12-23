import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as promise from 'redux-promise'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from './redux/reducers/reducers'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import RegisterSW from './utils/registerSW'
import App from './main/app'
import {appTheme} from './utils/theme'
import {SnackbarProvider} from 'notistack'

const composeEnhancers = composeWithDevTools({
	// options like actionSanitizer, stateSanitizer
})

const composedWithMiddleware = composeEnhancers(
	applyMiddleware(thunk, promise)
	// other store enhancers if any
)

const store = createStore(reducers, composedWithMiddleware)

ReactDOM.render(
	<Provider store={store as any}>
		<MuiThemeProvider theme={appTheme}>
			<SnackbarProvider maxSnack={3} autoHideDuration={3000}>
				<App />
			</SnackbarProvider>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
)

RegisterSW()
