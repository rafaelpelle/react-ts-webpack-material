import * as React from 'react'
import axios from 'axios'
import { validCPF, validEmail, validPassword } from '../utils/validators'
import {
	removeNonNumericCharacters,
	handleCellphone,
	removePhoneMask,
	handleCPF,
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
				setError('This is not a valid CPF')
			}
		}
	}
	return {
		onChange: handleChange,
		maxLength: cpfMaxLength,
		value: cpf,
		error,
		rawValue,
	}
}

export function usePasswordInput(initialValue: string) {
	const [password, setPassword] = useState(initialValue)
	const [error, setError] = useState('')
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target
		setPassword(value)
		setError('')
	}
	function checkPassword(e: React.FocusEvent<HTMLInputElement>) {
		const { value } = e.target
		if (!validPassword(value)) {
			setError('The password must be 8 digits long')
		}
	}
	return {
		onChange: handleChange,
		onBlur: checkPassword,
		value: password,
		type: 'password',
		error,
	}
}

export function useEmailInput(initialValue: string) {
	const [email, setEmail] = useState(initialValue)
	const [error, setError] = useState('')
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target
		setError('')
		setEmail(value)
	}
	function checkEmail(e: React.FocusEvent<HTMLInputElement>) {
		const { value } = e.target
		if (!validEmail(value)) {
			setError('This is not a valid e-mail')
		}
	}
	return {
		onChange: handleChange,
		value: email,
		error,
		onBlur: checkEmail,
	}
}

export function useAddress() {
	const [loading, setLoading] = useState(false)
	const [zipcode, setZip] = useState('')
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
		setZipError('')
		if (value.length === 8) {
			try {
				setLoading(true)
				const request = await axios.get(`https://viacep.com.br/ws/${value}/json/`, {
					headers: { 'x-access-token': null },
				})
				if (request.data.erro === true) {
					setZipError('This is not a valid CEP')
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
	return {
		zip: {
			onChange: handleZip,
			value: zipcode,
			type: 'tel',
			error: zipError,
			maxLength: 8,
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
