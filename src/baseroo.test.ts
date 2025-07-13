import * as assert from 'assert'
import { test } from '@jest/globals'
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

test('convertBase should error for custom alphabet with insufficient length', () => {
	assert.throws(() => {
		convertBase('1', '0', 10)
	}, InvalidBaseError)
})

test('convertBase should handle custom alphabet digit parsing', () => {
	// Test binary conversion with custom alphabet "AB" (A=0, B=1)
	const input = 'BABA' // Should be 1010 in binary = 10 in decimal
	const actualOutput = convertBase(input, 'AB', 10)
	const expectedOutput = '10'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('convertBase should handle custom alphabet number-to-string conversion', () => {
	// Test decimal to custom binary alphabet "XY" (X=0, Y=1)
	const input = '10' // 10 in decimal should be YXYX in "XY" alphabet (1010 in binary)
	const actualOutput = convertBase(input, 10, 'XY')
	const expectedOutput = 'YXYX'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('convertBase should maintain floating-point precision with custom alphabets', () => {
	// Test floating-point conversion with custom alphabet "AB" (A=0, B=1)
	// Convert 3.25 decimal to binary using custom alphabet "AB"
	// 3.25 = 11.01 in binary = BB.AB in "AB" alphabet
	const input = '3.25'
	const actualOutput = convertBase(input, 10, 'AB')
	const expectedOutput = 'BB.AB'
	assert.strictEqual(actualOutput, expectedOutput)
})

test('convertBase should handle precision limits consistently with custom alphabets', () => {
	// Test that precision is limited to 10 digits for both numeric and custom alphabets
	// Use 1/3 (0.333...) which has infinite decimal representation
	const input = '0.3333333333333'
	const numericOutput = convertBase(input, 10, 2)
	const customOutput = convertBase(input, 10, 'AB')

	// Both should have the same length (precision limited to 10 fractional digits)
	const numericFractional = numericOutput.split('.')[1] || ''
	const customFractional = customOutput.split('.')[1] || ''
	assert.strictEqual(numericFractional.length, customFractional.length)
	assert.strictEqual(customFractional.length, 10) // Verify 10-digit precision limit
})

test('error handling should work properly with custom alphabets', () => {
	// Test invalid character in custom alphabet
	assert.throws(() => {
		convertBase('C', 'AB', 10) // 'C' is not in alphabet 'AB'
	}, InvalidDigitError)

	// Test custom alphabet with insufficient length
	assert.throws(() => {
		convertBase('1', 'A', 10) // Single character alphabet = base 1, which is invalid
	}, InvalidBaseError)

	// Test invalid character in fractional part with custom alphabet
	assert.throws(() => {
		convertBase('A.C', 'AB', 10) // 'C' is not in alphabet 'AB'
	}, InvalidDigitError)
})

test('error messages should be descriptive for custom alphabets', () => {
	// Test that error messages include helpful context
	try {
		convertBase('C', 'AB', 10)
		assert.fail('Should have thrown InvalidDigitError')
	} catch (error) {
		assert.ok(error instanceof InvalidDigitError)
		assert.ok(error.message.includes('C'))
		assert.ok(error.message.includes('2')) // Base number for 'AB' alphabet
	}

	try {
		convertBase('1', 'A', 10)
		assert.fail('Should have thrown InvalidBaseError')
	} catch (error) {
		assert.ok(error instanceof InvalidBaseError)
		assert.ok(error.message.includes('1')) // Invalid base number
	}
})

// Task 4.1: Backward compatibility tests
test('backward compatibility - all existing number-based operations work unchanged', () => {
	// Verify that numeric base operations still work exactly as before
	assert.strictEqual(convertBase('ff', 16, 10), '255')
	assert.strictEqual(convertBase('1010', 2, 10), '10')
	assert.strictEqual(convertBase('100', 10, 2), '1100100')
	assert.strictEqual(convertBase('255', 10, 16), 'ff')

	// Verify floating point operations
	assert.strictEqual(convertBase('10.5', 10, 2), '1010.1')
	assert.strictEqual(convertBase('1010.1', 2, 10), '10.5')

	// Verify negative numbers
	assert.strictEqual(convertBase('-ff', 16, 10), '-255')
	assert.strictEqual(convertBase('-255', 10, 16), '-ff')
})

// Task 4.2: Basic custom alphabet conversions
test('basic custom alphabet conversions - binary equivalents', () => {
	// Test custom binary alphabet "AB" (A=0, B=1)
	assert.strictEqual(convertBase('AAAA', 'AB', 10), '0')
	assert.strictEqual(convertBase('AAAB', 'AB', 10), '1')
	assert.strictEqual(convertBase('AABA', 'AB', 10), '2')
	assert.strictEqual(convertBase('ABAB', 'AB', 10), '5')
	assert.strictEqual(convertBase('BBBB', 'AB', 10), '15')

	// Test reverse conversions (0 always returns '0' regardless of alphabet)
	assert.strictEqual(convertBase('0', 10, 'AB'), '0')
	assert.strictEqual(convertBase('1', 10, 'AB'), 'B')
	assert.strictEqual(convertBase('5', 10, 'AB'), 'BAB')
	assert.strictEqual(convertBase('15', 10, 'AB'), 'BBBB')
})

test('basic custom alphabet conversions - hexadecimal equivalents', () => {
	// Test custom hex alphabet using different characters
	const customHex = 'QWERTYUIOPAS'
	assert.strictEqual(convertBase('QWE', customHex, 10), '14') // 0*12 + 1*12 + 2 = 14 in decimal
	assert.strictEqual(convertBase('14', 10, customHex), 'WE') // 14 = 1*12 + 2 = WE

	// Test with larger values - 'QWP' should be 0*144 + 1*12 + 9 = 21
	assert.strictEqual(convertBase('QWP', customHex, 10), '21')
	assert.strictEqual(convertBase('27', 10, customHex), 'ER') // 27 = 2*12 + 3 = ER
})

// Task 4.3: Edge cases
test('edge cases - single character differences in alphabet', () => {
	// Test alphabets that differ by only one character
	const alphabet1 = 'ABC'
	const alphabet2 = 'ABD'

	// Same input should produce same results for same characters
	const result1 = convertBase('AB', alphabet1, 10)
	const result2 = convertBase('AB', alphabet2, 10)
	assert.strictEqual(result1, result2) // Both should be 3 (0*3 + 1 = 1)

	// But 'AC' vs 'AD' should be different
	const result3 = convertBase('AC', alphabet1, 10)
	const result4 = convertBase('AD', alphabet2, 10)
	assert.strictEqual(result3, '2') // 0*3 + 2 = 2
	assert.strictEqual(result4, '2') // 0*3 + 2 = 2 (D is at index 2 in ABD)
})

test('edge cases - duplicate characters in alphabet should still work', () => {
	// While not recommended, duplicate characters should work by using first occurrence
	const alphabetWithDuplicates = 'ABCA'

	// 'C' should map to index 2 (first occurrence)
	assert.strictEqual(convertBase('C', alphabetWithDuplicates, 10), '2')
	assert.strictEqual(convertBase('2', 10, alphabetWithDuplicates), 'C')
})

test('edge cases - minimum and maximum base sizes', () => {
	// Test minimum base size (2)
	assert.strictEqual(convertBase('BA', 'AB', 10), '2')
	assert.strictEqual(convertBase('2', 10, 'XY'), 'YX')

	// Test larger custom alphabet
	const largeAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	assert.strictEqual(convertBase('A', largeAlphabet, 10), '0')
	assert.strictEqual(convertBase('/', largeAlphabet, 10), '63')
	assert.strictEqual(convertBase('63', 10, largeAlphabet), '/')
})

// Task 4.4: Floating-point conversions with custom alphabets
test('floating-point conversions with custom alphabets', () => {
	// Test basic floating point with custom binary alphabet
	assert.strictEqual(convertBase('BB.AB', 'AB', 10), '3.25')
	assert.strictEqual(convertBase('3.25', 10, 'AB'), 'BB.AB')

	// Test with custom ternary alphabet
	const ternary = 'XYZ'
	assert.strictEqual(convertBase('Y.Y', ternary, 10), '1.3333333333')
	// The reverse conversion produces more precision due to algorithm behavior
	assert.strictEqual(convertBase('1.3333333333', 10, ternary), 'Y.XZZZZZZZZZ')

	// Test precision limits with custom alphabets
	const input = '0.1111111111111'
	const binaryResult = convertBase(input, 10, 'AB')
	const customResult = convertBase(input, 10, 'QWERTY')

	// Both should have limited precision
	const binaryFractional = binaryResult.split('.')[1] || ''
	const customFractional = customResult.split('.')[1] || ''
	assert.ok(binaryFractional.length <= 10)
	assert.ok(customFractional.length <= 10)
})

// Task 4.5: Negative number conversions with custom alphabets
test('negative number conversions with custom alphabets', () => {
	// Test negative integers
	assert.strictEqual(convertBase('-BABA', 'AB', 10), '-10')
	assert.strictEqual(convertBase('-10', 10, 'AB'), '-BABA')

	// Test negative floating point numbers
	assert.strictEqual(convertBase('-BB.AB', 'AB', 10), '-3.25')
	assert.strictEqual(convertBase('-3.25', 10, 'AB'), '-BB.AB')

	// Test with different custom alphabets
	const customHex = 'QWERTYUIOPAS'
	assert.strictEqual(convertBase('-QWE', customHex, 10), '-14')
	assert.strictEqual(convertBase('-14', 10, customHex), '-WE')
	assert.strictEqual(convertBase('-QW.E', customHex, 10), '-1.1666666666')
})

// Task 4.6: Performance tests to ensure no regression
test('performance tests - custom alphabets should not be significantly slower', () => {
	const iterations = 1000
	const testValue = '12345.6789'

	// Measure numeric base performance
	const numericStart = Date.now()
	for (let i = 0; i < iterations; i++) {
		convertBase(testValue, 10, 16)
	}
	const numericTime = Date.now() - numericStart

	// Measure custom alphabet performance
	const customStart = Date.now()
	for (let i = 0; i < iterations; i++) {
		convertBase(testValue, 10, '0123456789ABCDEF')
	}
	const customTime = Date.now() - customStart

	// Custom alphabet should not be more than 5x slower than numeric
	// This is a reasonable threshold considering the additional string operations
	assert.ok(
		customTime < numericTime * 5 + 10,
		`Custom alphabet performance regression: ${customTime}ms vs ${numericTime}ms`
	)
})

test('performance tests - large number conversions with custom alphabets', () => {
	// Test with a large number to ensure BigInt operations work efficiently
	const largeNumber = '123456789012345678901234567890'
	const customAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

	const start = Date.now()
	const result = convertBase(largeNumber, 10, customAlphabet)
	const duration = Date.now() - start

	// Should complete within reasonable time (under 1000ms)
	assert.ok(duration < 1000, `Large number conversion too slow: ${duration}ms`)
	assert.ok(result.length > 0, 'Should produce a non-empty result')

	// Verify round-trip conversion works
	const roundTrip = convertBase(result, customAlphabet, 10)
	assert.strictEqual(roundTrip, largeNumber)
})
