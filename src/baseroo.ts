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
			const fromIndex = getCharacterIndex(digit, fromAlphabet)
			return carry + BigInt(fromIndex) * bigIntPow(fromBase, BigInt(index))
		}, BigInt(0))
}

function convertToBase10Fractional(fractionalValue: string, fromAlphabet: string[]): number {
	const fromBase = fromAlphabet.length
	return fractionalValue.split('').reduce((carry, digit, index) => {
		const fromIndex = getCharacterIndex(digit, fromAlphabet)
		return carry + fromIndex / fromBase ** (index + 1)
	}, 0)
}

function convertFromBase10Integer(base10Integer: bigint, toAlphabet: string[]): string {
	const toBase = BigInt(toAlphabet.length)

	let value = ''
	while (base10Integer > 0) {
		const digitIndex = Number(base10Integer % toBase)
		value = getCharacterAtIndex(digitIndex, toAlphabet) + value
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
		value += getCharacterAtIndex(fractDigit, toAlphabet)
		base10Fractional = base10Fractional * toBase - fractDigit
	}
	return value
}

function isCustomAlphabet(base: BaseInput): base is string {
	return typeof base === 'string'
}

function getBaseNumber(base: BaseInput): number {
	return isCustomAlphabet(base) ? base.length : base
}

function validateBase(base: BaseInput, baseName: string): void {
	const baseNumber = getBaseNumber(base)
	const isCustom = isCustomAlphabet(base)

	if (baseNumber < 2) {
		if (isCustom) {
			throw new InvalidBaseError(baseName, baseNumber, Number.MAX_SAFE_INTEGER)
		} else {
			throw new InvalidBaseError(baseName, baseNumber, defaultAlphabetRange.length)
		}
	}

	if (!isCustom && baseNumber > defaultAlphabetRange.length) {
		throw new InvalidBaseError(baseName, baseNumber, defaultAlphabetRange.length)
	}
}

function getCharacterIndex(character: string, alphabet: string[]): number {
	const index = alphabet.indexOf(character)
	if (index === -1) {
		throw new InvalidDigitError(character, alphabet.length)
	}
	return index
}

function getCharacterAtIndex(index: number, alphabet: string[]): string {
	return alphabet[index]
}

export function convertBase(value: string, fromBase: BaseInput, toBase: BaseInput): string {
	// Determine if bases are numbers or custom alphabets
	const fromIsCustom = isCustomAlphabet(fromBase)
	const toIsCustom = isCustomAlphabet(toBase)

	// Get alphabets and numeric bases
	const fromAlphabet = fromIsCustom
		? fromBase.split('')
		: defaultAlphabetRange.slice(0, fromBase as number)
	const toAlphabet = toIsCustom ? toBase.split('') : defaultAlphabetRange.slice(0, toBase as number)

	// Validate bases
	validateBase(fromBase, 'fromBase')
	validateBase(toBase, 'toBase')

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
