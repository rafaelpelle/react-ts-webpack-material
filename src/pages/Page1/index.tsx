import * as React from 'react'
import { history } from '../../router/history'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const Page1: React.FC<Props> = (props) => {
	return (
		<div style={ { textAlign: 'center' } }>
			<Typography variant='h3' align='center' style={ textStyle }>
				Page1
			</Typography>
			<Button
				color='primary'
				variant='contained'
				style={ buttonStyle }
				onClick={ () => history.push('/page2') }
			>
				Lazy load Page2
			</Button>
		</div>
	)
}
export default Page1

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// STYLES ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const textStyle = {
	marginTop: '30vh',
}
const buttonStyle = {
	marginTop: '50px',
}
//////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INTERFACES /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
interface OwnState {}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
