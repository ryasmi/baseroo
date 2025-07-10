# GitHub Copilot Instructions for Baseroo

## Project Overview
Baseroo is a TypeScript library that converts positive & negative float values from one base to another between bases 2-64. It's published as an npm package with comprehensive CI/CD, testing, and quality assurance processes.

## Pre-Commit Requirements
**CRITICAL**: Before committing and pushing any code changes, you MUST run these commands and ensure they all pass:

```bash
# Run tests with coverage (must be 100%)
npm test

# Run build to ensure compilation works
npm run build

# Run ESLint to check code quality
npx eslint src

# Format code with Prettier
npx prettier --write .
```

If any of these commands fail, fix the issues before committing. The CI pipeline will reject changes that don't pass these checks.

## Code Style & Standards

### TypeScript
- Use strict TypeScript with all strict checks enabled
- Target ES5 for maximum compatibility
- Include explicit return types for public functions
- Use `BigInt` for large number operations to maintain precision
- Prefer `const` over `let`, avoid `var`
- Use meaningful variable and function names

### Code Quality
- ESLint configuration is defined in `package.json`
- Use `@typescript-eslint/eslint-plugin` rules
- Enable deprecation warnings with `eslint-plugin-deprecation`
- Follow Prettier formatting rules:
  - Use tabs (tabWidth: 2)
  - Single quotes
  - No semicolons
  - Trailing commas (ES5 style)
  - Print width: 100 characters
  - Arrow parentheses: always

### Error Handling
- Use custom error classes that extend `BaseError` from the `make-error` package
- Provide descriptive error messages with context
- Example error classes: `InvalidDigitError`, `InvalidBaseError`

## Testing Requirements

### Test Framework
- Use Jest with TypeScript support (`ts-jest`)
- Test environment: Node.js
- Bail on first test failure
- **100% code coverage required** - this is enforced and builds will fail if coverage drops

### Test Structure
- Test files should mirror the source structure
- Use descriptive test names that explain the behavior being tested
- Test both positive and negative cases
- Test edge cases and error conditions
- Test floating point precision limits

### Coverage
- Line coverage must be 100%
- Coverage reports are sent to Codecov
- Use `--onlyChanged` flag in pre-commit hooks for performance

## Build & Distribution

### Build System
- Use Microbundle for building the library
- Source entry point: `src/baseroo.ts`
- Output formats: CJS, ESM, UMD
- Generate TypeScript declarations
- Create source maps

### Package Configuration
- Type: "module" (ES modules)
- Export multiple formats for compatibility
- Include only `dist` and `readme.md` in published package
- Use semantic-release for automated versioning

## Git & CI/CD

### Commit Messages
- Follow Conventional Commits format
- Use commitlint with `@commitlint/config-conventional`
- Scope and subject case rules are relaxed (allow sentence-case)

### Husky Hooks
- **Pre-commit**: Runs Jest on changed files and lint-staged
- **Commit-msg**: Validates commit message format

### GitHub Actions
- **Node CI workflow** runs on push to main and PRs
- Tests on Node.js versions: 18.x, 20.x, 22.x
- Steps: npm ci, build, lint, test, coverage upload
- **Release workflow** runs semantic-release on main branch after successful tests
- **CodeQL analysis** for security scanning

### Lint-staged Configuration
- JavaScript files: `eslint --cache --fix`
- JS/CSS/MD files: `prettier --write`

## Dependencies

### Runtime Dependencies
- `make-error`: For custom error classes

### Development Dependencies
- Core tools: TypeScript, Jest, ESLint, Prettier, Husky
- TypeScript tooling: ts-jest, ts-node, @typescript-eslint/*
- Build: microbundle
- Release: semantic-release
- Quality: commitlint, lint-staged

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

## Key Algorithms & Logic
- Base conversion using alphabet strings for digit representation
- BigInt arithmetic for integer precision
- Floating point handling with configurable precision (10 decimal places)
- Supports bases 2-64 using default alphabet: `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/`

## Adaptive Learning Guidelines

When making changes to this project:

1. **Always preserve the 100% test coverage requirement**
2. **Maintain backward compatibility** unless making a breaking change (which triggers major version bump)
3. **Follow the existing error handling patterns** using custom error classes
4. **Keep the public API minimal and focused** - this is a utility library
5. **Ensure changes work across all supported Node.js versions**
6. **Update documentation if changing public APIs**
7. **Consider floating point precision implications** when modifying math operations

## Common Tasks

### Adding a new feature:
1. Write tests first (TDD approach)
2. Implement the feature
3. Ensure 100% coverage
4. Update TypeScript types if needed
5. Run all pre-commit checks

### Fixing a bug:
1. Write a failing test that reproduces the bug
2. Fix the bug
3. Ensure the test passes and coverage remains 100%
4. Run all pre-commit checks

### Updating dependencies:
1. Test thoroughly after updates
2. Check for breaking changes
3. Update any affected code
4. Ensure CI passes on all Node.js versions

Remember: This project values code quality, comprehensive testing, and automated processes. Always ensure changes maintain these standards.
