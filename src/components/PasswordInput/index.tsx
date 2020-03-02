import * as React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const PasswordInput: React.FC<Props> = (props) => {
	const {
		name,
		variant,
		value,
		placeholder,
		label,
		error,
		style,
		type,
		maxLength,
		autoFocus,
		disabled,
		fullWidth,
		onChange,
		onClick,
		onKeyUp,
		onKeyPress,
		onBlur,
		ref,
		toggleVisibility,
		passwordVisible,
	} = props
	return (
		<FormControl
			variant={ variant }
			style={ style }
			fullWidth={ fullWidth }
			error={ !!error }
			disabled={ disabled }
		>
			<InputLabel>{ label }</InputLabel>
			<Input
				name={ name || label }
				placeholder={ placeholder }
				type={ type }
				value={ value }
				onChange={ onChange }
				onBlur={ onBlur }
				autoFocus={ autoFocus }
				inputProps={ {
					type,
					maxLength,
					onChange,
					onClick,
					onKeyUp,
					onKeyPress,
					onBlur,
					ref,
				} }
				endAdornment={
					<InputAdornment position='end'>
						<IconButton onClick={ toggleVisibility }>
							{ passwordVisible ? <Visibility /> : <VisibilityOff /> }
						</IconButton>
					</InputAdornment>
				}
			/>
			{ error && <FormHelperText>{ error }</FormHelperText> }
		</FormControl>
	)
}
export default PasswordInput

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// STYLES ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INTERFACES /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
interface OwnState {}

interface OwnProps {
	toggleVisibility?: () => void
	passwordVisible?: boolean
	name?: string
	empty?: boolean
	variant?: any
	rawValue?: string
	value?: string
	placeholder?: string
	label?: string
	error?: string
	type?: string
	style?: any
	maxLength?: number
	autoFocus?: boolean
	disabled?: boolean
	fullWidth?: boolean
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
	onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
	onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
	ref?: any
}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
