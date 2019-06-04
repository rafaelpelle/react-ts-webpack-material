import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Router, Switch } from 'react-router-dom'
import { IRootReducer } from '../utils/interfaces'
import { history } from '../router/history'
import MyRoutes from '../router/myRoutes'

require('./app.css')



const App: React.FC<Props> = (props) => {
	React.useEffect(() => {
		// listen to the service-worker registration.onupdatefound
		// event on /src/Utils/registerSW.ts.
		document.body.addEventListener('updateAvailable', () => {
			window.location.reload()
		})
	}, [])

	return (
		<Router history={ history }>
			<div>
				<Switch>
					<MyRoutes />
				</Switch>
			</div>
		</Router>
	)
}

const mapStateToProps = (state: IRootReducer) => ({})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch)
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(App)

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// STYLES ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INTERFACES /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
interface OwnState {
}

interface OwnProps {
}

interface StateProps {
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
