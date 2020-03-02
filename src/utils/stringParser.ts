export function handleMoney(money: string) {
	money = removeNonNumericCharacters(money)
	money = removeLeftZeros(money)
	if (money.length === 0) {
		money = '000'
	}
	if (money.length === 1) {
		money = '00' + money
	}
	if (money.length === 2) {
		money = '0' + money
	}
	const lastDigitsList = money.match(/..$/)
	if (!lastDigitsList) {
		return money
	}

	const lastDigits = lastDigitsList[0]
	return money.replace(/..$/, ',' + lastDigits).replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
}

export const handleCPF = (CPF: string): string => {
	CPF = removeNonNumericCharacters(CPF)
	const lastDigitsList = CPF.match(/..$/)
	if (!lastDigitsList) {
		return CPF
	}
	const lastDigits = lastDigitsList[0]
	return CPF.replace(/..$/, '-' + lastDigits).replace(/(\d)(?=(\d{3})+\-)/g, '$1.')
}

export const removeNonNumericCharacters = (text: string) => {
	if (text) {
		return text.replace(/\D/g, '')
	} else {
		return ''
	}
}

export const removeWhiteSpaces = (text: string) => text.replace(/\s/g, '')

export const removeNonAlphaNumericCharacters = (text: string) => text.replace(/[!"\[\]{}%^&*:@~#';/.<>\\|`]/g, '')

export const handleCellphone = (v: string): string => {
	v = v.replace(/\D/g, '')
	v = v.replace(/^(\d{2})(\d)/g, '($1) $2')
	v = v.replace(/(\d)(\d{4})$/, '$1-$2')
	return v
}

export const handleZipCode = (zipCode: string): string => {
	zipCode = zipCode.replace(/\D/g, '')
	return zipCode.replace(/(\d)(\d{3})$/, '$1-$2')
}

export const removePhoneMask = (text: string): string => {
	let parsedText = text.replace(/\s/g, '')
	parsedText = parsedText.replace('(', '')
	parsedText = parsedText.replace(')', '')
	parsedText = parsedText.replace('-', '')
	return parsedText
}

export const handleCNPJ = (v: string): string => {
	v = v.replace(/\D/g, '')
	v = v.replace(/^(\d{2})(\d)/, '$1.$2')
	v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
	v = v.replace(/\.(\d{3})(\d)/, '.$1/$2')
	return v.replace(/(\d{4})(\d)/, '$1-$2')
}

export const removeLeftZeros = (text: string) => (text !== '' ? Number(text).toString() : '')

export const parserDate = (text: string) => {
	const dateArr = text.split('/')
	return {
		day: Number(dateArr[0]),
		month: Number(dateArr[1]),
		year: Number(dateArr[2]),
	}
}

export const handleDateFormat = (timestamp: string | Date) => {
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
	return new Date(timestamp).toLocaleDateString('pt-BR', options)
}

export const handleDateMask = (date: string) => {
	date = date.replace(/\D/g, '')
	date = date.replace(/^(\d{2})(\d)/, '$1/$2')
	return date.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
}
