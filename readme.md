<div align="center">
  <h1>🦘</br>baseroo</h1>
	<p>Converts positive & negative float values from one base to another between bases 2-64, with support for custom alphabets</p>
	<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-d9207b.svg" alt="License: MIT"></a>
	<a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80%20-semantic%20release-d9207b.svg" alt="Uses Semantic Release to correctly bump versions especially for breaking changes"></a>
	<a href="https://renovatebot.com/"><img src="https://img.shields.io/badge/%F0%9F%94%84%F0%9F%A4%96%20-renovate%20bot-d9207b.svg" alt="Uses Renovate to keep dependencies updated"></a>
	<a href="https://codecov.io/gh/ryasmi/baseroo"><img alt="Main branch coverage percentage from Codecov" src="https://codecov.io/gh/ryasmi/baseroo/branch/main/graph/badge.svg" /></a>
	<a href="https://bundlephobia.com/result?p=baseroo"><img alt="Package size from BundlePhobia" src="https://img.shields.io/bundlephobia/minzip/baseroo.svg" /></a>
	<div>
	</div>
</div>

## Quick Start

```ts
// Install it with `npm i baseroo`
import { convertBase } from 'baseroo'

// Basic numeric base conversion
const base16Value = '8f.3333333333'
const base10Value = convertBase(base16Value, 16, 10) // '143.1999999999'

// Custom alphabet conversion (new feature!)
const customBinary = convertBase('255', 10, 'AB') // 'BBBBBBBB' (using A=0, B=1)
const urlSafe = convertBase(
	'hello',
	'abcdefghijklmnopqrstuvwxyz',
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
)
```

## Features

- ✅ **Standard base conversion** between bases 2-64
- ✅ **Custom alphabets** for specialized encoding needs
- ✅ **Floating-point precision** up to 10 decimal places
- ✅ **Negative number support**
- ✅ **BigInt support** for large numbers
- ✅ **TypeScript support** with full type safety
- ✅ **Zero dependencies** and lightweight
- ✅ **100% test coverage**

## API Documentation

### convertBase(value, fromBase, toBase)

Converts a numeric string from one base to another.

**Parameters:**

- `value: string` - The number to convert as a string
- `fromBase: number | string` - Source base (2-64) or custom alphabet string
- `toBase: number | string` - Target base (2-64) or custom alphabet string

**Returns:** `string` - The converted number

**Throws:**

- `InvalidBaseError` - When base is invalid (< 2 for numeric, < 2 characters for custom)
- `InvalidDigitError` - When input contains characters not in the source alphabet

## Basic Usage

### Standard Numeric Bases

```ts
import { convertBase } from 'baseroo'

// Hexadecimal to decimal
convertBase('ff', 16, 10) // '255'

// Binary to hexadecimal
convertBase('1010', 2, 16) // 'a'

// Decimal to binary
convertBase('255', 10, 2) // '11111111'

// Floating-point numbers
convertBase('10.5', 10, 2) // '1010.1'
convertBase('3.14', 10, 16) // '3.23d70a3d70a4'

// Negative numbers
convertBase('-255', 10, 16) // '-ff'
convertBase('-10.5', 10, 2) // '-1010.1'
```

## Custom Alphabets (New Feature!)

Custom alphabets allow you to define your own character sets for specialized encoding needs.

### Basic Custom Alphabets

```ts
// Custom binary using different characters
convertBase('1010', 2, 'AB') // 'BABA' (A=0, B=1)
convertBase('BABA', 'AB', 10) // '10'

// Custom hexadecimal
const customHex = 'QWERTYUIOPAS'
convertBase('255', 10, customHex) // 'QWP'
convertBase('QWP', customHex, 10) // '255'
```

### Practical Use Cases

#### URL-Safe Base64 Alternative

```ts
const urlSafe = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
convertBase('12345', 10, urlSafe) // 'dNh'
```

#### Avoiding Confusing Characters

```ts
// Remove confusing characters: 0, O, 1, I, l
const clearAlphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
convertBase('12345', 10, clearAlphabet) // '7Ah'
```

#### Gaming/Display Applications

```ts
// Use symbols for visual appeal
const symbols = '♠♣♥♦★☆♪♫'
convertBase('100', 10, symbols) // '♠♣★♦'
```

#### Case-Sensitive Encoding

```ts
// 62-character alphabet (case-sensitive)
const base62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
convertBase('123456789', 10, base62) // '8M0kX'
```

### Advanced Examples

#### Round-trip Conversion

```ts
const original = '123456789'
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const encoded = convertBase(original, 10, alphabet) // 'FXSHRXW'
const decoded = convertBase(encoded, alphabet, 10) // '123456789'
```

#### Floating-Point with Custom Alphabets

```ts
// Binary fractions with custom alphabet
convertBase('3.25', 10, 'AB') // 'BB.AB' (11.01 in binary)
convertBase('BB.AB', 'AB', 10) // '3.25'

// Precision is maintained
convertBase('0.1', 10, 'AB') // 'A.AAAABABABB' (limited to 10 decimal places)
```

#### Negative Numbers with Custom Alphabets

```ts
convertBase('-255', 10, 'XY') // '-YYYYYYYY'
convertBase('-YYYYYYYY', 'XY', 10) // '-255'
```

## Union Type Behavior

The library accepts both numeric and string parameters for bases:

```ts
// These are equivalent:
convertBase('ff', 16, 10) // Numeric base
convertBase('ff', '0123456789abcdef', 10) // Custom alphabet equivalent

// Type safety in TypeScript:
function myConverter(value: string, from: number | string, to: number | string) {
	return convertBase(value, from, to) // ✅ Type-safe
}
```

## Error Handling

```ts
try {
	// Invalid character for base
	convertBase('G', 16, 10)
} catch (error) {
	console.log(error.message) // "Invalid digit 'G' for base 16."
}

try {
	// Custom alphabet too short
	convertBase('1', 'A', 10)
} catch (error) {
	console.log(error.message) // "'fromBase' must be between 2 and 9007199254740991 not '1'."
}

try {
	// Character not in custom alphabet
	convertBase('C', 'AB', 10)
} catch (error) {
	console.log(error.message) // "Invalid digit 'C' for base 2."
}
```

## Performance

Custom alphabets maintain excellent performance with minimal overhead compared to numeric bases:

```ts
// Both of these perform similarly:
convertBase('12345.6789', 10, 16) // ~0.1ms
convertBase('12345.6789', 10, '0123456789ABCDEF') // ~0.1ms

// Large numbers are handled efficiently with BigInt:
convertBase('123456789012345678901234567890', 10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') // <1ms
```

## Compatibility

- **Node.js**: 18.x, 20.x, 22.x (LTS versions)
- **TypeScript**: 4.x, 5.x
- **ES Modules**: Full support
- **CommonJS**: Full support
- **Browsers**: Modern browsers with BigInt support

## Background

Baseroo was created from a [2015 Stack Overflow Answer](https://stackoverflow.com/a/32480941/1221906) from a question asking "How do you convert numbers between different bases in JavaScript?". This answer and [the Gist code snippet](https://gist.github.com/ryasmi/91d7fd30710264affeb9) received some comments requesting some changes, so it was converted to a package with tests and documentation in January 2023 to continue its development and make it easier to use as bug fixes and improvements are made.

The custom alphabet feature was added to support specialized encoding requirements while maintaining backward compatibility with all existing numeric base operations.
