import * as React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

const FormInput: React.FC<Props> = (props) => {
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
		readOnly,
		onChange,
		onClick,
		onKeyUp,
		onKeyPress,
		onBlur,
		ref,
	} = props
	return (
		<FormControl
			variant={variant}
			style={style}
			fullWidth={fullWidth}
			error={!!error}
			disabled={disabled}
		>
			<InputLabel>{label}</InputLabel>
			<Input
				name={name || label}
				placeholder={placeholder}
				type={type}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				autoFocus={autoFocus}
				readOnly={readOnly}
				inputProps={{
					type,
					maxLength,
					onChange,
					onClick,
					onKeyUp,
					onKeyPress,
					onBlur,
					ref,
				}}
			/>
			{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
	)
}
export default FormInput

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// STYLES ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INTERFACES /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
interface OwnState {}

interface OwnProps {
	name?: string
	empty?: boolean
	variant?: 'standard' | 'outlined' | 'filled'
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
	readOnly?: boolean
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
