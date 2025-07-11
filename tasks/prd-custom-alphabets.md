# PRD: Custom Alphabets for Base Conversion

## Introduction/Overview

This feature adds support for custom alphabets in the Baseroo library's base conversion functions. Currently, Baseroo uses a standard alphabet for bases 2-64, but users need the ability to specify custom character sets for their conversions. This is particularly useful for avoiding confusing characters (like 0 vs O), creating URL-friendly outputs for compression/shortening services, and integrating with legacy systems that use non-standard alphabets.

The goal is to extend the existing API with optional alphabet parameters while maintaining full backward compatibility.

## Goals

1. Enable users to specify custom alphabets for both source (`from`) and target (`to`) bases
2. Maintain 100% backward compatibility with existing API
3. Automatically determine base from alphabet length when custom alphabet is provided
4. Keep the API simple and intuitive for general developers
5. Support use cases like URL shorteners, legacy system integration, and avoiding ambiguous characters

## User Stories

1. **As a developer creating a URL shortener**, I want to pass a custom alphabet string as the `toBase` parameter so that I can avoid confusing characters (0, O, I, l) without needing additional parameters.

2. **As a developer integrating with a legacy system**, I want to specify the exact alphabet as a string for both `fromBase` and `toBase` so that my converted values match the legacy system's format.

3. **As a developer working on compression algorithms**, I want to pass a URL-safe alphabet string as the base parameter so that I can optimize character sets without changing my function calls.

4. **As a general developer**, I want to use either numbers (current behavior) or strings (custom alphabets) for base parameters so that I have flexibility without learning a new API.

## Functional Requirements

1. **FR1:** The `fromBase` parameter must accept either a number (existing behavior) or a string (custom alphabet) to maintain backward compatibility while enabling custom alphabets.

2. **FR2:** The `toBase` parameter must accept either a number (existing behavior) or a string (custom alphabet) to maintain backward compatibility while enabling custom alphabets.

3. **FR3:** When a string is provided for `fromBase` or `toBase`, the system must treat it as a custom alphabet and automatically determine the base from the string length (number of characters).

4. **FR4:** When a number is provided for `fromBase` or `toBase`, the system must use the existing default alphabet and behavior (full backward compatibility).

5. **FR5:** Custom alphabets (string parameters) must be treated as ordered character sets, where each character in the string represents a digit in that base.

6. **FR6:** The system must support custom alphabets for any base between 2 and the length of the provided alphabet string.

7. **FR7:** Duplicate characters in custom alphabets are acceptable - the system should use characters in the order they appear in the string.

8. **FR8:** The system must handle both positive and negative float values when using custom alphabets, maintaining the existing precision capabilities.

9. **FR9:** Error handling should be minimal - the system should not validate for duplicate characters or perform complex alphabet validation.

10. **FR10:** TypeScript type definitions must support union types (`number | string`) for the base parameters to provide proper type safety and IDE support.

## Non-Goals (Out of Scope)

1. **Automatic alphabet detection** from input strings
2. **Predefined alphabet constants** (e.g., DNA_ALPHABET, URL_SAFE_ALPHABET)
3. **Unicode normalization** or complex character handling
4. **Alphabet validation** beyond basic length checks
5. **Breaking changes** to existing function signatures
6. **Additional parameters** beyond the existing `fromBase` and `toBase` parameters
7. **Complex error handling** for alphabet edge cases

## Design Considerations

- Modify existing function signatures to accept union types (`number | string`) for base parameters
- When a number is provided, use existing default alphabet behavior
- When a string is provided, treat it as a custom alphabet with base determined by string length
- Default behavior when numbers are used must remain identical to current implementation
- Custom alphabets should follow the same character-to-value mapping logic as the default alphabet
- TypeScript types should clearly indicate the dual nature of base parameters

## Technical Considerations

- Must integrate with existing `BigInt` precision handling
- Should work with current floating-point conversion algorithms
- Must maintain compatibility with existing error classes that extend `BaseError` from `make-error` package
- Should follow existing TypeScript configuration and linting rules
- Must support all currently supported Node.js versions (maintenance, current, and active)

## Success Metrics

1. **100% backward compatibility** - All existing tests continue to pass without modification
2. **Feature adoption** - New optional parameters are used in real-world scenarios
3. **No performance regression** - Custom alphabet conversions perform comparably to default alphabet conversions
4. **Test coverage maintained** - 100% code coverage requirement is maintained
5. **Documentation clarity** - Users can successfully implement custom alphabets from documentation alone

## Open Questions

1. Should there be any length limits on custom alphabets beyond the current base 2-64 constraint?
2. How should the library handle empty alphabet strings?
3. Should there be any performance optimizations for commonly used custom alphabets?
4. Would it be beneficial to provide examples of common custom alphabets in the documentation?

---

_This PRD targets junior developers and provides explicit requirements for implementing custom alphabet support in the Baseroo TypeScript library while maintaining the project's high standards for testing, backward compatibility, and code quality._
