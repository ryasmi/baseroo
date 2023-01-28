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

function bigIntPow(x: bigint, y: bigint): bigint {
	const ZERO = BigInt(0)
	if (y === ZERO) return BigInt(1)
	const TWO = BigInt(2)
	const p2 = bigIntPow(x, y / TWO)
	if (y % TWO === ZERO) return p2 * p2
	return x * p2 * p2
}

export const defaultAlphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'
const defaultAlphabetRange = defaultAlphabet.split('')

function convertToBase10(value: string, fromAlphabet: string[]): bigint {
	const fromBase = BigInt(fromAlphabet.length)

	return value
		.split('')
		.reverse()
		.reduce(function (carry: bigint, digit: string, index: number): bigint {
			const fromIndex = fromAlphabet.indexOf(digit)
			if (fromIndex === -1) {
				throw new InvalidDigitError(digit, fromAlphabet.length)
			}
			return carry + BigInt(fromIndex) * bigIntPow(fromBase, BigInt(index))
		}, BigInt(0))
}

function convertFromBase10(base10Value: bigint, toAlphabet: string[]): string {
	const toBase = BigInt(toAlphabet.length)

	let newValue = ''
	while (base10Value > 0) {
		newValue = toAlphabet[Number(base10Value % toBase)] + newValue
		base10Value = (base10Value - (base10Value % toBase)) / toBase
	}
	return newValue || '0'
}

export function convertBase(value: string, fromBase: number, toBase: number): string {
	const range = defaultAlphabetRange

	if (fromBase < 2 || fromBase > range.length) {
		throw new InvalidBaseError('fromBase', fromBase, range.length)
	}
	if (toBase < 2 || toBase > range.length) {
		throw new InvalidBaseError('toBase', toBase, range.length)
	}

	const base10Value = convertToBase10(value, range.slice(0, fromBase))
	return convertFromBase10(base10Value, range.slice(0, toBase))
}
