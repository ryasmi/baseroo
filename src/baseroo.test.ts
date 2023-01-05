import * as assert from 'assert'
import { convertBase, defaultAlphabet, InvalidBaseError, InvalidDigitError } from './baseroo'

test('convertBase should convert base 16 to 10', () => {
	const input = '8f'
	const actualOutput = convertBase(input, 16, 10)
	const expectedOutput = '143'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('constrain should error for invalid digits', () => {
	const input = '8F'
	assert.throws(() => {
		convertBase(input, 16, 10)
	}, InvalidDigitError)
})

test('convertBase should convert an empty input string to 0', () => {
	const input = ''
	const actualOutput = convertBase(input, 16, 10)
	const expectedOutput = '0'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('convertBase should convert BigInts too', () => {
	const input =
		'4ef57aa335b86bce90cd99144be26fa47645c36624eeb54ae153bc67861f9a7ad96e23e0d200348bd6a442ef96bd04a2c'
	const interimOutput = convertBase(input, 16, 10)
	const actualOutput = convertBase(interimOutput, 10, 16)
	assert.strictEqual(actualOutput, input)
})

test('constrain should error for invalid fromBase', () => {
	const input = '8f'
	assert.throws(() => {
		convertBase(input, 1, 10)
	}, InvalidBaseError)
	assert.throws(() => {
		convertBase(input, defaultAlphabet.length + 1, 10)
	}, InvalidBaseError)
})

test('constrain should error for invalid toBase', () => {
	const input = '8f'
	assert.throws(() => {
		convertBase(input, 16, 1)
	}, InvalidBaseError)
	assert.throws(() => {
		convertBase(input, 16, defaultAlphabet.length + 1)
	}, InvalidBaseError)
})
