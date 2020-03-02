import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '../../components/Button'
import { history } from '../../router/history'

const Page1: React.FC<Props> = (props) => {
	return (
		<div style={ { textAlign: 'center' } }>
			<Typography variant='h3' align='center' style={ textStyle }>
				Page1
			</Typography>
			<Button
				content='Lazy Load Page 2'
				style={ buttonStyle }
				variant='contained'
				color='primary'
				onClick={ () => history.push('/page2') }
			/>
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
