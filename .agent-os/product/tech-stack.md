# Technical Stack

## Application Framework

TypeScript 5.7.3

## Database System

n/a

## JavaScript Framework

n/a (Library package)

## Import Strategy

node

## CSS Framework

n/a

## UI Component Library

n/a

## Fonts Provider

n/a

## Icon Library

n/a

## Application Hosting

npm (published package)

## Database Hosting

n/a

## Asset Hosting

n/a

## Deployment Solution

GitHub Actions + Semantic Release

## Code Repository URL

https://github.com/ryasmi/baseroo.git

## Build Tools

- **Bundler**: Microbundle 0.15.1
- **Testing**: Jest 29.7.0 with ts-jest preset
- **Type Checking**: TypeScript compiler with strict mode
- **Linting**: ESLint 9.31.0 with TypeScript parser
- **Formatting**: Prettier 3.6.2 with standardized config

## Quality Assurance

- **Test Coverage**: 100% coverage requirement with threshold enforcement
- **Pre-commit Hooks**: Husky + lint-staged for code quality
- **Commit Standards**: Conventional commits with commitlint
- **CI/CD**: GitHub Actions testing on Node.js 18.x, 20.x, 22.x
- **Release**: Semantic Release for automated versioning and publishing
- **Dependencies**: Renovate bot for automated dependency updates

## Package Configuration

- **Module System**: ES modules with CommonJS compatibility
- **Distribution**: Multiple export formats (CJS, ESM, UMD)
- **Type Definitions**: Full TypeScript declarations included
- **Dependencies**: Minimal - only make-error for custom error classes
