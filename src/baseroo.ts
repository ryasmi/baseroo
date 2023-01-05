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

export function convertBase(value: string, fromBase: number, toBase: number): string {
	const range = defaultAlphabet.split('')

	if (fromBase < 2 || fromBase > range.length) {
		throw new InvalidBaseError('fromBase', fromBase, range.length)
	}
	if (toBase < 2 || toBase > range.length) {
		throw new InvalidBaseError('toBase', toBase, range.length)
	}

	const fromRange = range.slice(0, fromBase)
	const toRange = range.slice(0, toBase)

	const fromBaseBig = BigInt(fromBase)
	const toBaseBig = BigInt(toBase)

	let decValue = value
		.split('')
		.reverse()
		.reduce(function (carry: bigint, digit: string, index: number): bigint {
			const fromIndex = fromRange.indexOf(digit)
			if (fromIndex === -1) {
				throw new InvalidDigitError(digit, fromBase)
			}
			return carry + BigInt(fromIndex) * bigIntPow(fromBaseBig, BigInt(index))
		}, BigInt(0))

	let newValue = ''
	while (decValue > 0) {
		newValue = toRange[Number(decValue % toBaseBig)] + newValue
		decValue = (decValue - (decValue % toBaseBig)) / toBaseBig
	}
	return newValue || '0'
}
