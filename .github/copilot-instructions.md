# GitHub Copilot Instructions for Baseroo

## Project Overview

Baseroo is a TypeScript library that converts positive & negative float values from one base to another between bases 2-64. It's published as an npm package with comprehensive CI/CD, testing, and quality assurance processes. This is a public repository on Github (ryasmi/baseroo) and published on NPM as `baseroo`.

_Update this `.github/copilot-instructions.md` file if you think other things should be included in the overview._

## File Structure

```
.
├── src/
│   └── baseroo.ts          # Main source file
├── dist/                   # Built output (generated)
├── .husky/                 # Git hooks
│   ├── pre-commit
│   └── commit-msg
├── .github/
│   └── workflows/          # CI/CD workflows
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── .gitignore              # Git ignore rules
└── readme.md               # Project documentation
```

_Update this `.github/copilot-instructions.md` file if the file structure changes._

## Preferences

- Before committing code changes, run commands that Github Actions will use to verify your changes pass CI checks.
- Look for similar files in the project and follow their patterns where applicable
- Follow Prettier formatting rules
- Follow TypeScript config rules
- Use `BigInt` for large number operations to maintain precision
- Consider floating point precision implications when modifying math operations
- Use meaningful variable and function names
- Use custom error classes that extend `BaseError` from the `make-error` package
- Provide descriptive error messages with context (e.g. `InvalidDigitError`, `InvalidBaseError`)
- Follow Conventional Commits format with `@commitlint/config-conventional`
- Avoid breaking changes to provide backward compatibility
- JSDoc comments are not required - focus on clear, self-documenting code
- Keep the public API minimal and focused as this is a utility library
- Ensure changes work across maintenance, current, and active Node.js versions
- Update documentation in Readme if changing public APIs
- Write tests first (TDD approach)

_Update this `.github/copilot-instructions.md` file if you learn about new preferences or changes to these preferences._

## Test Structure

- **100% code coverage required** - this is enforced and builds will fail if coverage drops
- Test files should mirror the source structure
- Use descriptive test names that explain the behavior being tested
- Test both positive and negative cases
- Test edge cases and error conditions
- Test floating point precision limits

_Update this `.github/copilot-instructions.md` file if the testing requirements or structure changes._
