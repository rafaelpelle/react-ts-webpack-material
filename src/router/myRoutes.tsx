import * as React from 'react'
import { Redirect, Route } from 'react-router'

const Suspense = React.Suspense
const HomePage = React.lazy(() => import('../pages/homePage/homePage'))
const OtherPage = React.lazy(() => import('../pages/otherPage/otherPage'))


const MyRoutes: React.FC<Props> = (props) => {
	return (
		<div style={ divStyle }>
			<Suspense fallback={ <div/> }>
				<Route exact={ true } path='/home' render={ () => <Redirect to='/' /> } />
				<Route exact={ true } path='/' render={ () => <HomePage /> } />
				<Route exact={ true } path='/login' render={ () => <OtherPage /> } />
			</Suspense>
		</div>
	)
}
export default MyRoutes

/////////////////////////////////////////////////////////////////
//////////////////////////// STYLES /////////////////////////////
/////////////////////////////////////////////////////////////////
const divStyle = { }
/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
