import * as React from 'react'
import { Typography, CircularProgress } from '@material-ui/core'
require('./style.scss')

export default function PageLoader(props: Props) {
	return (
		<div className='loader-container'>
			<CircularProgress size={ 100 } thickness={ 5 } color='primary' />
			<Typography variant='h6' color='primary' align='center' style={ { marginTop: '15px' } }>
				Carregando...
			</Typography>
		</div>
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
