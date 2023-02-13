import * as assert from 'assert'
import { convertBase, defaultAlphabet, InvalidBaseError, InvalidDigitError } from './baseroo'

test('convertBase should convert base 16 to 10', () => {
	const input = '8f'
	const actualOutput = convertBase(input, 16, 10)
	const expectedOutput = '143'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('convertBase should convert base 16 to 2', () => {
	const base16Input = 'a'
	const actualOutput = convertBase(base16Input, 16, 2)
	const expectedOutput = '1010'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('constrain should error for invalid digits in interger', () => {
	const input = '8F'
	assert.throws(() => {
		convertBase(input, 16, 10)
	}, InvalidDigitError)
})

test('constrain should error for invalid digits in fractional', () => {
	const input = '8f.F'
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

test('convertBase should convert base 16 float to 10', () => {
	const base16Input = '8f.8'
	const actualOutput = convertBase(base16Input, 16, 10)
	const expectedOutput = '143.5'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('convertBase should convert base 16 float to 2', () => {
	const base16Input = 'a.8'
	const actualOutput = convertBase(base16Input, 16, 2)
	const expectedOutput = '1010.1'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('convertBase should convert base 16 float to 10 upto a precision of 10', () => {
	const base16Input = '8f.3333333333'
	const actualOutput = convertBase(base16Input, 16, 10)
	const expectedOutput = '143.1999999999'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('convertBase should convert negative base 16 to 10', () => {
	const input = '-8f'
	const actualOutput = convertBase(input, 16, 10)
	const expectedOutput = '-143'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('convertBase should convert negative float base 16 to 10', () => {
	const input = '-8f.8'
	const actualOutput = convertBase(input, 16, 10)
	const expectedOutput = '-143.5'
	assert.strictEqual(actualOutput, expectedOutput)
})
