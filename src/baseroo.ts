import { BaseError } from 'make-error'

export type BaseInput = number | string

export class InvalidDigitError extends BaseError {
	constructor(
		public digit: string,
		public base: number
	) {
		super(`Invalid digit '${digit}' for base ${base}.`)
	}
}

export class InvalidBaseError extends BaseError {
	constructor(
		public ref: string,
		public base: number,
		public maxBase: number
	) {
		super(`'${ref}' must be between 2 and ${maxBase} not '${base}'.`)
	}
}

const ZERO = BigInt(0)
const ONE = BigInt(1)
const TWO = BigInt(2)

function bigIntPow(x: bigint, y: bigint): bigint {
	if (y === ZERO) return ONE
	const p2 = bigIntPow(x, y / TWO)
	if (y % TWO === ZERO) return p2 * p2
	return x * p2 * p2
}

export const defaultAlphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'
const defaultAlphabetRange = defaultAlphabet.split('')

function convertToBase10Integer(integerValue: string, fromAlphabet: string[]): bigint {
	const fromBase = BigInt(fromAlphabet.length)

	return integerValue
		.split('')
		.reverse()
		.reduce((carry, digit, index) => {
			const fromIndex = fromAlphabet.indexOf(digit)
			if (fromIndex === -1) {
				throw new InvalidDigitError(digit, fromAlphabet.length)
			}
			return carry + BigInt(fromIndex) * bigIntPow(fromBase, BigInt(index))
		}, BigInt(0))
}

function convertToBase10Fractional(fractionalValue: string, fromAlphabet: string[]): number {
	const fromBase = fromAlphabet.length
	return fractionalValue.split('').reduce((carry, digit, index) => {
		const fromIndex = fromAlphabet.indexOf(digit)
		if (fromIndex === -1) {
			throw new InvalidDigitError(digit, fromAlphabet.length)
		}
		return carry + fromIndex / fromBase ** (index + 1)
	}, 0)
}

function convertFromBase10Integer(base10Integer: bigint, toAlphabet: string[]): string {
	const toBase = BigInt(toAlphabet.length)

	let value = ''
	while (base10Integer > 0) {
		value = toAlphabet[Number(base10Integer % toBase)] + value
		base10Integer = (base10Integer - (base10Integer % toBase)) / toBase
	}

	return value || '0'
}

function convertFromBase10Fractional(base10Fractional: number, toAlphabet: string[]): string {
	const precision = 10
	const toBase = toAlphabet.length
	let value = ''
	for (let i = 0; i < precision && base10Fractional !== 0; i++) {
		const fractDigit = Math.floor(base10Fractional * toBase)
		value += toAlphabet[fractDigit]
		base10Fractional = base10Fractional * toBase - fractDigit
	}
	return value
}

export function convertBase(value: string, fromBase: BaseInput, toBase: BaseInput): string {
	// Determine if bases are numbers or custom alphabets
	const fromIsCustom = typeof fromBase === 'string'
	const toIsCustom = typeof toBase === 'string'

	// Get alphabets and numeric bases
	const fromAlphabet = fromIsCustom
		? fromBase.split('')
		: defaultAlphabetRange.slice(0, fromBase as number)
	const toAlphabet = toIsCustom ? toBase.split('') : defaultAlphabetRange.slice(0, toBase as number)
	const fromBaseNumber = fromIsCustom ? fromBase.length : (fromBase as number)
	const toBaseNumber = toIsCustom ? toBase.length : (toBase as number)

	// Validate bases
	if (fromBaseNumber < 2 || (!fromIsCustom && fromBaseNumber > defaultAlphabetRange.length)) {
		throw new InvalidBaseError('fromBase', fromBaseNumber, defaultAlphabetRange.length)
	}
	if (toBaseNumber < 2 || (!toIsCustom && toBaseNumber > defaultAlphabetRange.length)) {
		throw new InvalidBaseError('toBase', toBaseNumber, defaultAlphabetRange.length)
	}

	const isNegative = value[0] === '-'
	const toBaseSign = isNegative ? '-' : ''
	const absoluteValue = isNegative ? value.substring(1) : value
	const [integerPart, fractionalPart = ''] = absoluteValue.split('.')

	const base10Integer = convertToBase10Integer(integerPart, fromAlphabet)
	const toBaseInteger = convertFromBase10Integer(base10Integer, toAlphabet)

	if (fractionalPart !== '') {
		const base10Fractional = convertToBase10Fractional(fractionalPart, fromAlphabet)
		const toBaseFractional = convertFromBase10Fractional(base10Fractional, toAlphabet)
		return toBaseSign + toBaseInteger + '.' + toBaseFractional
	}

	return toBaseSign + toBaseInteger
}
