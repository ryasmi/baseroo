import { BaseError } from 'make-error'

export class InvalidDigitError extends BaseError {
	constructor(public digit: string, public base: number) {
		super(`Invalid digit '${digit}' for base ${base}.`)
	}
}

export function convertBase(value: string, fromBase: number, toBase: number): string {
	const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('')
	const fromRange = range.slice(0, fromBase)
	const toRange = range.slice(0, toBase)

	let decValue = value
		.split('')
		.reverse()
		.reduce(function (carry: number, digit: string, index: number): number {
			if (fromRange.indexOf(digit) === -1) {
				throw new InvalidDigitError(digit, fromBase)
			}
			return (carry += fromRange.indexOf(digit) * Math.pow(fromBase, index))
		}, 0)

	let newValue = ''
	while (decValue > 0) {
		newValue = toRange[decValue % toBase] + newValue
		decValue = (decValue - (decValue % toBase)) / toBase
	}
	return newValue || '0'
}
