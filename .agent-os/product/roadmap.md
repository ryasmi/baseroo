# Product Roadmap

## Phase 0: Already Completed

The following features have been implemented and are production-ready:

- [x] **Core Base Conversion** - Convert between bases 2-64 using default alphabet `S`
- [x] **Custom Alphabet Support** - User-defined character sets for specialized encoding `M`
- [x] **Floating-Point Precision** - Decimal numbers with up to 10 decimal places `M`
- [x] **Negative Number Support** - Handle positive and negative values seamlessly `S`
- [x] **BigInt Integration** - Process arbitrarily large integers without precision loss `L`
- [x] **TypeScript Definitions** - Full type safety with comprehensive TypeScript support `S`
- [x] **Error Handling** - InvalidDigitError and InvalidBaseError for input validation `S`
- [x] **Zero Dependencies** - Minimal footprint with only make-error dependency `XS`
- [x] **Comprehensive Testing** - 100% test coverage with edge case validation `L`
- [x] **CI/CD Pipeline** - Multi-Node testing, semantic release, automated publishing `M`
- [x] **Documentation** - Complete API docs with examples and use cases `M`
- [x] **NPM Publishing** - Public package with proper export configurations `S`

## Phase 1: Precision & Control Enhancements

**Goal:** Extend precision capabilities and provide fine-grained conversion control
**Success Criteria:** Configurable precision settings, increment/decrement operations working reliably

### Features

- [ ] **Configurable Precision Limits** - Allow users to specify precision beyond 10 decimal places `M`
- [ ] **Increment/Decrement During Conversion** - Pass through values to modify during base 10 step `L`
- [ ] **Precision Configuration API** - Programmatic control over conversion precision `S`
- [ ] **Performance Optimization** - Optimize algorithms for high-precision calculations `M`

### Dependencies

- Research optimal algorithms for extended precision floating-point conversion
- Ensure backward compatibility with existing API

## Future Phases

Want to keep this project small and focused, so future developments will be driven by Github Issues.
