# Product Mission

## Pitch

Baseroo is a TypeScript library that helps developers reliably convert numbers between different bases (2-64) by providing comprehensive base conversion with custom alphabet support, floating-point precision, and zero dependencies.

## Users

### Primary Customers

- **URL Shortener Developers**: Teams building URL shortening services requiring efficient base conversion for compact IDs
- **Data Processing Engineers**: Developers working with encoded data, hash representations, and custom encoding schemes
- **API Developers**: Backend engineers needing reliable number format conversion for various client requirements
- **Cryptography Implementers**: Developers working with custom encoding schemes for security applications

### User Personas

**Backend Developer** (25-40 years old)

- **Role:** Senior Software Engineer
- **Context:** Building scalable web applications with custom ID generation systems
- **Pain Points:** Unreliable base conversion libraries, lack of custom alphabet support, poor BigInt handling
- **Goals:** Implement robust URL shortening, maintain data integrity, minimize dependencies

**Data Engineer** (28-45 years old)

- **Role:** Data Processing Specialist
- **Context:** Processing and transforming large datasets with various encoding requirements
- **Pain Points:** Limited precision in floating-point conversions, lack of negative number support
- **Goals:** Accurate data transformation, consistent encoding across systems, performance optimization

## The Problem

### Inadequate Base Conversion Libraries

Existing JavaScript base conversion solutions lack comprehensive support for custom alphabets, floating-point precision, and negative numbers. This forces developers to implement error-prone conversion logic or use multiple libraries.

**Our Solution:** Baseroo provides a complete, battle-tested solution with 100% test coverage and support for all conversion scenarios.

### Limited Precision and BigInt Support

Most libraries fail when handling large numbers or require specific precision for floating-point conversions, creating data integrity issues in production systems.

**Our Solution:** Built-in BigInt support and configurable precision ensure accurate conversions for any scale of data.

### Unsafe Character Handling

Base conversion libraries often don't validate input characters or provide clear error messages, leading to silent failures or cryptic errors in production.

**Our Solution:** Comprehensive error handling with specific InvalidDigitError and InvalidBaseError exceptions for clear debugging.

## Differentiators

### Battle-Tested Reliability

Unlike newer base conversion libraries, Baseroo originated from a highly-rated Stack Overflow answer with years of community feedback and real-world usage. This results in proven stability and edge case handling.

### Zero Dependencies Architecture

Unlike conversion libraries that bundle heavy dependencies, Baseroo uses only a single lightweight error handling dependency (make-error). This results in minimal bundle size and reduced security surface area.

### Custom Alphabet Innovation

Unlike standard base conversion tools limited to numeric bases, Baseroo enables custom character sets for specialized encoding needs (URL-safe characters, visual symbols, case-sensitive encoding). This results in flexible solutions for unique business requirements.

## Key Features

### Core Features

- **Standard Base Conversion:** Convert between any bases 2-64 using the default alphabet with full precision
- **Custom Alphabet Support:** Define custom character sets for specialized encoding requirements
- **Floating-Point Precision:** Handle decimal numbers with up to 10 decimal places accuracy
- **BigInt Integration:** Process arbitrarily large integers without precision loss
- **Negative Number Support:** Handle positive and negative values seamlessly
- **TypeScript Definitions:** Full type safety with comprehensive TypeScript support
- **Zero Dependencies:** Minimal footprint with only essential error handling dependency
- **Error Validation:** Comprehensive input validation with specific error types for debugging

### Quality Assurance Features

- **100% Test Coverage:** Every code path tested with comprehensive edge case coverage
- **Automated CI/CD:** Multi-version Node.js testing with semantic release automation
- **Performance Optimized:** Efficient algorithms for both small and large number conversions
- **Documentation Complete:** Full API documentation with practical examples and use cases
