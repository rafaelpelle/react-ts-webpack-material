import * as React from 'react'
import { Redirect, Route } from 'react-router'

const Suspense = React.Suspense
const Page1 = React.lazy(() => import('../pages/Page1'))
const Page2 = React.lazy(() => import('../pages/Page2'))
const Page3 = React.lazy(() => import('../pages/Page3'))
const Page4 = React.lazy(() => import('../pages/Page4'))

const MyRoutes: React.FC<Props> = (props) => {
	return (
		<div style={ divStyle }>
			<Suspense fallback={ <div>Loading...</div> }>
				<Route exact={ true } path='/' render={ () => <Redirect to='/page1' /> } />
				<Route exact={ true } path='/page1' render={ () => <Page1 /> } />
				<Route exact={ true } path='/page2' render={ () => <Page2 /> } />
				<Route exact={ true } path='/page3' render={ () => <Page3 /> } />
				<Route exact={ true } path='/page4' render={ () => <Page4 /> } />
			</Suspense>
		</div>
	)
}
export default MyRoutes

/////////////////////////////////////////////////////////////////
//////////////////////////// STYLES /////////////////////////////
/////////////////////////////////////////////////////////////////
const divStyle = {}
/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
