# GitHub Copilot Instructions for Baseroo

## Project Overview

Baseroo is a TypeScript library that converts positive & negative float values from one base to another between bases 2-64. It's published as an npm package with comprehensive CI/CD, testing, and quality assurance processes. This is a public repository on Github (ryasmi/baseroo) and published on NPM as `baseroo`.

_Update this `.github/copilot-instructions.md` file if you think other things should be included in the overview._

## Purpose

This file directs Github Copilot to use your personal Agent OS standards for all development work. These global standards define your preferred way of building software across all projects.

## Global Standards

### Development Standards

- **Tech Stack Defaults:** @/.agent-os/standards/tech-stack.md
- **Code Style Preferences:** @/.agent-os/standards/code-style.md
- **Best Practices Philosophy:** @/.agent-os/standards/best-practices.md

### Agent OS Instructions

- **Initialize Products:** @/.agent-os/instructions/plan-product.md
- **Plan Features:** @/.agent-os/instructions/create-spec.md
- **Execute Tasks:** @/.agent-os/instructions/execute-tasks.md
- **Analyze Existing Code:** @/.agent-os/instructions/analyze-product.md
- **Review Renovate PR:** @/.agent-os/instructions/review-renovate-pr.md

## How These Work Together

1. **Standards** define your universal preferences that apply to all projects
2. **Instructions** guide the agent through Agent OS workflows
3. **Project-specific files** (if present) override these global defaults

## Using Agent OS Commands

You can invoke Agent OS commands directly:

- `/plan-product` - Start a new product
- `/create-spec` - Plan a new feature
- `/execute-tasks` - Build and ship code
- `/analyze-product` - Add Agent OS to existing code
- `/review-renovate-pull-request` - Review a Renovate bot pull request

## Important Notes

- These are YOUR standards - customize them to match your preferences
- Project-specific standards in `.agent-os/product/` override these globals
- Update these files as you discover new patterns and preferences

---

_Using Agent OS for structured AI-assisted development. Learn more at [buildermethods.com/agent-os](https://buildermethods.com/agent-os)_
