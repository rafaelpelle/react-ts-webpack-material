import * as React from 'react'
import { Redirect, Route, Router, Switch } from 'react-router'
// import PageLoader from '../components/PageLoader'
import { history } from './history'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'
import Page4 from '../pages/Page4'

// const Page1 = React.lazy(() => import('../pages/Page1'))
// const Page2 = React.lazy(() => import('../pages/Page2'))
// const Page3 = React.lazy(() => import('../pages/Page3'))
// const Page4 = React.lazy(() => import('../pages/Page4'))

export default function MyRouter(props: Props) {
	return (
		<Router history={ history }>
			<Switch>
				{ /*<React.Suspense fallback={ <PageLoader /> }>*/ }
				<Route exact path='/' render={ () => <Redirect to='/page1' /> } />
				<Route exact path='/page1' render={ () => <Page1 /> } />
				<Route exact path='/page2' render={ () => <Page2 /> } />
				<Route exact path='/page3' render={ () => <Page3 /> } />
				<Route exact path='/page4' render={ () => <Page4 /> } />
				{ /*</React.Suspense>*/ }
			</Switch>
		</Router>
	)
}

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
