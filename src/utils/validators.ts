import { removeNonNumericCharacters, removePhoneMask } from './stringParser'
import { intRegex, emailRegex } from './regex'

export const validCPF = (cpf: string): boolean => {
	cpf = removeNonNumericCharacters(cpf)
	let sum
	let remainder
	sum = 0
	if (/^(.)\1+$/.test(cpf)) {
		return false
	}
	for (let i = 1; i <= 9; i++) {
		sum = sum + parseInt(cpf.substring(i - 1, i), undefined) * (11 - i)
	}
	remainder = (sum * 10) % 11

	if (remainder === 10 || remainder === 11) {
		remainder = 0
	}
	if (remainder !== parseInt(cpf.substring(9, 10), undefined)) {
		return false
	}

	sum = 0
	for (let i = 1; i <= 10; i++) {
		sum = sum + parseInt(cpf.substring(i - 1, i), undefined) * (12 - i)
	}
	remainder = (sum * 10) % 11

	if (remainder === 10 || remainder === 11) {
		remainder = 0
	}
	if (remainder !== parseInt(cpf.substring(10, 11), undefined)) {
		return false
	}
	return true
}

function ValidarCEP(ObjCEP: string) {
	const cep = ObjCEP
	alert(cep)
	if (cep.length === 0) {
		return null
	}
	if (cep.length === 8) {
		return (
			cep.charAt(0) +
			cep.charAt(1) +
			'.' +
			cep.charAt(2) +
			cep.charAt(3) +
			cep.charAt(4) +
			'-' +
			cep.charAt(5) +
			cep.charAt(6) +
			cep.charAt(7)
		)
	} else {
		return null
	}
}

export const validCNPJ = (cnpj: string) => {
	cnpj = removeNonNumericCharacters(cnpj)
	cnpj = cnpj.replace(/[^\d]+/g, '')

	if (cnpj === '') {
		return false
	}

	if (cnpj.length !== 14) {
		return false
	}
	// Elimina CNPJs invalidos conhecidos
	if (/^(.)\1+$/.test(cnpj)) {
		return false
	}
	let size = cnpj.length - 2
	let numbers = cnpj.substring(0, size)
	const digits = cnpj.substring(size)
	let sum = 0
	let pos = size - 7
	for (let i = size; i >= 1; i--) {
		sum += (numbers.charAt(size - i) as any) * pos--
		if (pos < 2) {
			pos = 9
		}
	}
	let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
	if (result !== Number(digits.charAt(0))) {
		return false
	}

	size = size + 1
	numbers = cnpj.substring(0, size)
	sum = 0
	pos = size - 7
	for (let i = size; i >= 1; i--) {
		sum += (numbers.charAt(size - i) as any) * pos--
		if (pos < 2) {
			pos = 9
		}
	}
	result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
	if (result !== Number(digits.charAt(1))) {
		return false
	}
	return true
}

export const validPhone = (text: string) => {
	return intRegex.test(removePhoneMask(text))
}

export const validEmail = (email: string) => {
	return emailRegex.test(email)
}

export const validPassword = (password: string): boolean => {
	return password.length >= 8
}
