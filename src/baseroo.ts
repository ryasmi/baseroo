import { BaseError } from 'make-error'

export class InvalidDigitError extends BaseError {
	constructor(public digit: string, public base: number) {
		super(`Invalid digit '${digit}' for base ${base}.`)
	}
}

export class InvalidBaseError extends BaseError {
	constructor(public ref: string, public base: number, public maxBase: number) {
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

function convertToBase10Value(value: string, fromAlphabet: string[]): bigint {
	const [integerPart, fractionalPart = ''] = value.split('.')
	const base10Integer = convertToBase10Integer(integerPart, fromAlphabet)
	const base10Fractional = convertToBase10Fractional(fractionalPart, fromAlphabet)
	return base10Integer + BigInt(base10Fractional)
}

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

export function convertBase(value: string, fromBase: number, toBase: number, options?: {
	increment?: number
}): string {
	const range = defaultAlphabetRange
	const increment = options?.increment ?? 0

	if (fromBase < 2 || fromBase > range.length) {
		throw new InvalidBaseError('fromBase', fromBase, range.length)
	}
	if (toBase < 2 || toBase > range.length) {
		throw new InvalidBaseError('toBase', toBase, range.length)
	}

	const base10Value = convertToBase10Value(value, range.slice(0, fromBase)) + increment

	const toBaseInteger = convertFromBase10Integer(base10Integer, range.slice(0, toBase))

	if (fractionalPart !== '') {
		const toBaseFractional = convertFromBase10Fractional(base10Fractional, range.slice(0, toBase))
		console.log({ value, base10Fractional, toBaseFractional })
		return toBaseInteger + '.' + toBaseFractional
	}

	return toBaseInteger
}
