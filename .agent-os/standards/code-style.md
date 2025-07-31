# Code Style Guide

## Context

Global code style rules for Agent OS projects.

<conditional-block context-check="general-preferences">
IF this General Preferences section already read in current context:
  SKIP: Re-reading this section
  NOTE: "Using General Preferences rules already in context"
ELSE:
  READ: The following Preferences rules

_Update this file if you learn about new preferences or changes to these preferences._

### Project-Specific Preferences

- Before committing code changes, run commands that Github Actions will use to verify your changes pass CI checks
- Use `BigInt` for large number operations to maintain precision
- Consider floating point precision implications when modifying math operations
- Use custom error classes that extend `BaseError` from the `make-error` package
- Keep the public API minimal and focused as this is a utility library
- Ensure changes work across maintenance, current, and active Node.js versions
- Update documentation in Readme if changing public APIs

### General Preferences

- Write tests first (TDD approach)
- Follow Conventional Commits format with `@commitlint/config-conventional`
- Follow existing compiler and linter formatting rules
- Where unsure of a preference, check similar files in the project and follow their patterns where applicable
- Avoid breaking changes to provide backward compatibility

Format below is “Alternatives vs Alternatives”. While we may occasionally use the alternatives on the right, we prefer to use the alternative(s) on the left more.

- Immutabaility vs mutation (exceptions: strong performance benefits)
- Functions vs classes (exceptions: Error classes)
- One options object vs lots of parameters
- Essential values vs entire objects in parameters
- If statements vs nested ternaries
- Named vs default exports
- Switch cases vs if blocks
- Allowlists vs blocklists
- Throwing errors vs returning null/undefined
- Named vs literal constants & magic numbers
- Skip/Limit pagination vs Cursor pagination (exceptions: explicit need for extracting data into 3rd parties at scale without duplicate records)
- Import required exports vs importing all exports
- Atomic operations vs locks
- End-to-end testing vs unit testing (exceptions: reused logic in end-to-end scenarios can be tested once with a unit test)
- Self-contained tests vs database seeds
- Awaits and queues vs unawaited promises

### Testing Preferences

- **100% code coverage required** - this is enforced and builds will fail if coverage drops
- Test files should mirror the source structure
- Use descriptive test names that explain the behavior being tested
- Test both positive and negative cases
- Test edge cases and error conditions
- Test floating point precision limits

### Naming Conventions

- **Functions and Variables**: Use `lowerCamelCase`
  - Functions use a verb followed by a noun
  - Variables describe how the data is relevant to the code and indicate the unit/type of data stored (e.g. timeoutSeconds, userEmail, etc).
- **Types, Classes, Interfaces, and Enums)**: Use `UpperCamelCase`
- **Constants and Environment Varibles**: Use `UPPER_SNAKE_CASE`

### String Formatting

- Use single quotes for strings: `'Hello World'`
- Use double quotes only when interpolation is needed
- Use template literals for multi-line strings or complex interpolation

### Code Comment Preferences

- Add brief comments above non-obvious business logic
- Document complex algorithms or calculations
- Explain the "why" behind implementation choices
- Never remove existing comments unless removing the associated code
- Update comments when modifying code to maintain accuracy
- Keep comments concise and relevant
  </conditional-block>

<conditional-block task-condition="javascript" context-check="javascript-style">
IF current task involves writing or updating JavaScript:
  IF javascript-style.md already in context:
    SKIP: Re-reading this file
    NOTE: "Using JavaScript style guide already in context"
  ELSE:
    <context_fetcher_strategy>
      IF current agent is Claude Code AND context-fetcher agent exists:
        USE: @agent:context-fetcher
        REQUEST: "Get JavaScript style rules from code-style/javascript-style.md"
        PROCESS: Returned style rules
      ELSE:
        READ: @/.agent-os/standards/code-style/javascript-style.md
    </context_fetcher_strategy>
ELSE:
  SKIP: JavaScript style guide not relevant to current task
</conditional-block>
