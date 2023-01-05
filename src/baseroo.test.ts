import * as assert from 'assert'
import { convertBase, InvalidDigitError } from './baseroo'

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
