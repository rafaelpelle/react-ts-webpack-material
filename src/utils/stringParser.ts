export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function handleCPF(cpf: string): string {
	cpf = removeNonNumericCharacters(cpf)
	const lastDigitsList = cpf.match(/..$/)
	if (!lastDigitsList) {
		return cpf
	}
	const lastDigits = lastDigitsList[0]
	return cpf.replace(/..$/, '-' + lastDigits).replace(/(\d)(?=(\d{3})+\-)/g, '$1.')
}

export function removeNonNumericCharacters(text: string) {
	return text.replace(/\D/g, '')
}

export function removeNonAlphaNumericCharacters(text: string) {
	return text.replace(/[!"\[\]{}%^&*:@~#';/.<>\\|`]/g, '')
}

export function handleCellphone(v: string): string {
	v = v.replace(/\D/g, '')
	v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
	v = v.replace(/(\d)(\d{4})$/, '$1-$2')
	return v
}

export function handleZipCode(zipCode: string): string {
	zipCode = zipCode.replace(/\D/g, '')
	return zipCode.replace(/(\d)(\d{3})$/, '$1-$2')
}

export function removePhoneMask(text: string): string {
	let parsedText = text.replace(/\s/g, '')
	parsedText = parsedText.replace('(', '')
	parsedText = parsedText.replace(')', '')
	parsedText = parsedText.replace('-', '')
	return parsedText
}

export function handleCNPJ(v: string): string {
	// Remove tudo o que não é dígito
	v = v.replace(/\D/g, '')
	// Coloca ponto entre o segundo e o terceiro dígitos
	v = v.replace(/^(\d{2})(\d)/, '$1.$2')
	// Coloca ponto entre o quinto e o sexto dígitos
	v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
	// Coloca uma barra entre o oitavo e o nono dígitos
	v = v.replace(/\.(\d{3})(\d)/, '.$1/$2')
	// Coloca um hífen depois do bloco de quatro dígitos
	return v.replace(/(\d{4})(\d)/, '$1-$2')
}

export function removeLeftZeros(text: string) {
	return text !== '' ? Number(text).toString() : ''
}

export const parserDate = (text: string) => {
	const dateArr = text.split('/')
	return {
		day: Number(dateArr[0]),
		month: Number(dateArr[1]),
		year: Number(dateArr[2]),
	}
}
