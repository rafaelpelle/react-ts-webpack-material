import * as React from 'react'
import axios from 'axios'
import { validCPF, validEmail, validBirthDate, validZipCode, validPassword } from '../utils/validators'
import {
	handleMoney,
	handleCPF,
	handleCellphone,
	removePhoneMask,
	handleZipCode,
	handleDateMask,
	removeWhiteSpaces,
	removeNonNumericCharacters,
} from '../utils/stringParser'

const useState = React.useState

export function useInput(initialValue: string) {
	const [value, setValue] = useState(initialValue)
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value)
	}
	return {
		onChange: handleChange,
		value,
		error: '',
		empty: value.length < 1,
	}
}

export function useMoneyInput(initialValue: string) {
	const [value, setValue] = useState(initialValue)
	function handleChange(newValue: string) {
		setValue(removeNonNumericCharacters(newValue))
	}
	return {
		onChange: handleChange,
		value: `R$ ${handleMoney(value)}`,
		placeholder: 'R$ 0,00',
		type: 'tel',
	}
}

export function usePhoneInput(initialValue: string) {
	const [phone, setPhone] = useState(initialValue)
	const [rawValue, setRawValue] = useState(initialValue)
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPhone(handleCellphone(e.target.value))
		setRawValue(removePhoneMask(e.target.value))
	}
	return {
		onChange: handleChange,
		value: phone,
		maxLength: 15,
		rawValue,
		type: 'tel',
		empty: rawValue.length < 1,
	}
}

export function useCPFInput(initialValue: string) {
	const cpfMaxLength = 14
	const [cpf, setCpf] = useState(initialValue)
	const [rawValue, setRawValue] = useState(initialValue)
	const [error, setError] = useState('')
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target
		setError('')
		setCpf(handleCPF(value))
		setRawValue(removeNonNumericCharacters(value))
		if (value.length === cpfMaxLength) {
			if (!validCPF(value)) {
				setError('Este CPF não é válido.')
			}
		}
	}
	function checkCPF(e: React.FocusEvent<HTMLInputElement>) {
		const { value } = e.target
		if (!validCPF(value)) {
			setError('Este CPF não é válido.')
		}
	}
	return {
		onChange: handleChange,
		onBlur: checkCPF,
		maxLength: cpfMaxLength,
		value: cpf,
		error,
		rawValue,
		empty: rawValue.length < 1,
	}
}

export function usePasswordInput(initialValue: string) {
	const [password, setPassword] = useState(initialValue)
	const [passwordVisible, setPasswordVisible] = React.useState(false)
	const [error, setError] = useState('')
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target
		setPassword(removeWhiteSpaces(value))
		setError('')
	}
	function checkPassword(e: React.FocusEvent<HTMLInputElement>) {
		const { value } = e.target
		if (!validPassword(value)) {
			setError('A senha deve ter 8 dígitos ou mais.')
		}
	}
	function toggleVisibility() {
		setPasswordVisible(!passwordVisible)
	}
	return {
		onChange: handleChange,
		onBlur: checkPassword,
		value: password,
		type: passwordVisible ? 'text' : 'password',
		empty: password.length < 1,
		error,
		passwordVisible,
		toggleVisibility,
	}
}

export function useEmailInput(initialValue: string) {
	const [email, setEmail] = useState(initialValue)
	const [error, setError] = useState('')
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target
		setError('')
		setEmail(removeWhiteSpaces(value))
	}
	function checkEmail(e: React.FocusEvent<HTMLInputElement>) {
		const { value } = e.target
		if (!validEmail(value)) {
			setError('Este e-mail é inválido.')
		}
	}
	return {
		onChange: handleChange,
		value: email,
		error,
		onBlur: checkEmail,
		empty: email.length < 1,
	}
}

export function useAddress() {
	const [loading, setLoading] = useState(false)
	const [zipcode, setZip] = useState('')
	const [zipcodeMask, setZipMask] = useState('')
	const [zipError, setZipError] = useState('')
	const [street, setStreet] = useState('')
	const [district, setDistrict] = useState('')
	const [city, setCity] = useState('')
	const [number, setNumber] = useState('')
	const [complement, setComplement] = useState('')
	const [state, setState] = useState('')
	async function handleZip(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target
		setZip(removeNonNumericCharacters(value))
		setZipMask(handleZipCode(value))
		setZipError('')
		if (removeNonNumericCharacters(value).length === 8) {
			try {
				setLoading(true)
				const request = await axios.get(
					`https://viacep.com.br/ws/${removeNonNumericCharacters(value)}/json/`
				)
				if (request.data.erro === true) {
					setZipError('Este CEP não é válido')
				}
				setLoading(false)
				setStreet(request.data.logradouro)
				setDistrict(request.data.bairro)
				setCity(request.data.localidade)
				setState(request.data.uf)
			} catch (error) {
				console.error(error)
				setLoading(false)
				setZipError('Server error')
			}
		}
	}
	function handleChange(set: React.Dispatch<React.SetStateAction<string>>) {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			set(e.target.value)
		}
	}
	function handleNumberChange(set: React.Dispatch<React.SetStateAction<string>>) {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			set(removeNonNumericCharacters(e.target.value))
		}
	}
	function checkZip() {
		!validZipCode(zipcode) && setZipError('Este CEP não é válido')
	}
	return {
		zip: {
			empty: !zipcodeMask,
			onChange: handleZip,
			rawValue: zipcode,
			value: zipcodeMask,
			type: 'tel',
			error: zipError,
			onBlur: checkZip,
			maxLength: 9,
			loading,
		},
		street: {
			onChange: handleChange(setStreet),
			value: street,
		},
		number: {
			onChange: handleNumberChange(setNumber),
			value: number,
			type: 'tel',
		},
		complement: {
			onChange: handleChange(setComplement),
			value: complement,
		},
		district: {
			onChange: handleChange(setDistrict),
			value: district,
		},
		city: {
			onChange: handleChange(setCity),
			value: city,
		},
		state: {
			onChange: handleChange(setState),
			value: state,
		},
	}
}

export function useDateInput(initialValue: string) {
	const [rawDate, setRawDate] = useState(initialValue)
	const [date, setDate] = useState(initialValue)
	const [error, setError] = useState('')
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		const raw = removeNonNumericCharacters(value)
		setError('')
		setRawDate(raw)
		setDate(handleDateMask(raw))
	}
	const validateDate = () => {
		if (!validBirthDate(date) || date.length < 10) {
			setError('Esta data é inválida.')
		}
	}

	return {
		onChange: handleChange,
		onBlur: validateDate,
		value: date,
		rawValue: rawDate,
		error,
		empty: !date,
		maxLength: 10,
	}
}
