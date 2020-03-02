import * as React from 'react'
import { Input, TextField, FormHelperText } from '@material-ui/core'
import MaskedInput from 'react-text-mask'
import { cnpjMask, cpfMask, phoneMask, cellphoneMask } from '../../utils/mask'

function TextMaskCPF(props: any) {
	const { inputRef, ...other } = props
	return (
		<MaskedInput
			{ ...other }
			mask={ cpfMask }
			placeholderChar='_'
			ref={ (ref: any) => {
				inputRef(ref ? ref.inputElement : null)
			} }
		/>
	)
}

function TextMaskCNPJ(props: any) {
	const { inputRef, ...other } = props
	return (
		<MaskedInput
			{ ...other }
			mask={ cnpjMask }
			placeholderChar='_'
			ref={ (ref: any) => {
				inputRef(ref ? ref.inputElement : null)
			} }
		/>
	)
}

function TextMaskPhone(props: any) {
	const { inputRef, ...other } = props

	const getMask = (rawValue) => {
		const numbers = rawValue.match(/\d/g)
		let numberLength = 0
		if (numbers) {
			numberLength = numbers.join('').length
		}
		return numberLength > 10 ? cellphoneMask : phoneMask
	}

	return (
		<MaskedInput
			{ ...other }
			mask={ getMask }
			placeholderChar='_'
			ref={ (ref: any) => {
				inputRef(ref ? ref.inputElement : null)
			} }
		/>
	)
}

export default function FormInput({
	name,
	variant,
	placeholder,
	label,
	style,
	type,
	maxLength,
	autoFocus,
	disabled,
	fullWidth,
	readOnly,
	onClick,
	onKeyUp,
	onKeyPress,
	ref,
	required,
	mask,
	touched,
	errors,
	values,
	handleChange: onChange,
	handleBlur: onBlur,
}: Props) {
	const getInputComponent = () => {
		switch (mask) {
			case 'CPF':
				return TextMaskCPF as any
			case 'CNPJ':
				return TextMaskCNPJ as any
			case 'PHONE':
				return TextMaskPhone as any
			default:
				return Input
		}
	}

	return (
		<div>
			<TextField
				autoFocus={ autoFocus }
				variant={ variant || 'outlined' }
				label={ label }
				fullWidth={ fullWidth }
				name={ name }
				disabled={ disabled }
				placeholder={ placeholder }
				value={ values[name] }
				helperText={ touched[name] ? <FormHelperText>{ errors[name] }</FormHelperText> : '' }
				onChange={ onChange }
				onBlur={ onBlur }
				style={ style }
				type={ type }
				required={ required }
				inputProps={ {
					type,
					maxLength,
					onChange,
					onClick,
					onKeyUp,
					onKeyPress,
					onBlur,
					ref,
					readOnly,
				} }
				InputProps={ {
					inputComponent: getInputComponent(),
				} }
			/>
		</div>
	)
}

//////////////////////////////////////////////////////////////////////////////
///////////////////////////////// INTERFACES /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
interface FormikObject {
	[key: string]: string | boolean
}

interface OwnState {}

interface OwnProps {
	name?: string
	empty?: boolean
	variant?: 'standard' | 'outlined' | 'filled'
	rawValue?: string
	placeholder?: string
	label?: string
	type?: string
	style?: any
	maxLength?: number
	autoFocus?: boolean
	required?: boolean
	disabled?: boolean
	fullWidth?: boolean
	readOnly?: boolean
	onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
	onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
	onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
	ref?: any

	errors: FormikObject
	values: FormikObject
	touched: FormikObject
	handleChange: any
	handleBlur: any
	mask?: 'CPF' | 'CNPJ' | 'PHONE'
}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
