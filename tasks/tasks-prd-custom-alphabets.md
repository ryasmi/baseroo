## Relevant Files

- `src/baseroo.ts` - Main source file containing the base conversion functions that need to be modified to support custom alphabets
- `src/baseroo.test.ts` - Unit tests for baseroo.ts that need to be extended with custom alphabet test cases
- `readme.md` - Documentation that needs to be updated with custom alphabet usage examples

### Notes

- Unit tests should be placed alongside the code files they are testing (following existing pattern)
- Use `npm test` to run tests. The project requires 100% code coverage
- All existing tests must continue to pass to ensure backward compatibility

## Tasks

- [x] 1.0 Update TypeScript types and function signatures to support custom alphabets
  - [x] 1.1 Modify function parameter types to accept `number | string` for `fromBase` and `toBase`
  - [x] 1.2 Update TypeScript interface definitions to reflect union types
  - [x] 1.3 Ensure type exports are updated for external consumers
- [x] 2.0 Implement custom alphabet detection and base determination logic
  - [x] 2.1 Create helper function to determine if a parameter is a number or string
  - [x] 2.2 Implement logic to calculate base from custom alphabet string length
  - [x] 2.3 Add validation for minimum alphabet length (base 2 requires at least 2 characters)
  - [x] 2.4 Create character-to-index mapping functions for custom alphabets
- [x] 3.0 Modify core conversion algorithms to work with custom alphabets
  - [x] 3.1 Update digit parsing logic to handle custom alphabet characters
  - [x] 3.2 Modify number-to-string conversion to use custom alphabet characters
  - [x] 3.3 Ensure floating-point precision is maintained with custom alphabets
  - [x] 3.4 Update error handling to work with both numeric and string bases
- [x] 4.0 Add comprehensive test coverage for custom alphabet functionality
  - [x] 4.1 Write tests for backward compatibility (all existing number-based tests still pass)
  - [x] 4.2 Add tests for basic custom alphabet conversions (binary, hexadecimal equivalents)
  - [x] 4.3 Test edge cases: single character differences, duplicate characters in alphabet
  - [x] 4.4 Test floating-point conversions with custom alphabets
  - [x] 4.5 Test negative number conversions with custom alphabets
  - [x] 4.6 Add performance tests to ensure no regression
- [x] 5.0 Update documentation and examples for the new feature
  - [x] 5.1 Add custom alphabet examples to README.md
  - [x] 5.2 Document the union type behavior (number vs string parameters)
  - [x] 5.3 Provide common use case examples (URL-safe alphabet, avoiding confusing characters)
  - [x] 5.4 Update API documentation with parameter descriptions
