---
description: Review Renovate Pull Request Rules for Agent OS
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Renovate Pull Request Review Rules

<ai_meta>
<rules>Process XML blocks sequentially, use exact templates, request missing data</rules>
<format>UTF-8, LF, 2-space indent, no header indent</format>
</ai_meta>

## Overview

Systematically review Renovate bot pull requests for dependency updates, assess safety, and provide merge recommendations.

<agent_detection>
<check_once>
AT START OF PROCESS:
SET has_github_pr = (github-pull-request agent exists)
SET has_terminal = (run_in_terminal tool available)
SET has_copilot_review = (GitHub Copilot review functionality available)
USE these flags throughout execution
</check_once>
</agent_detection>

## GitHub Copilot Review Integration

<copilot_review_commands>
<primary_commands>
USE GitHub Copilot's native PR review functionality when available:

- Ask Copilot to analyze the specific PR number
- Request Copilot to explain the changes in the PR
- Use Copilot's built-in understanding of PR context
- Leverage Copilot's ability to assess risk and compatibility
  </primary_commands>
  <command_patterns>
  EFFECTIVE prompts for Copilot PR review:
- "Review PR [number] for safety and compatibility"
- "Analyze the dependency changes in PR [number]"
- "What are the risks of merging PR [number]?"
- "Check if PR [number] has any breaking changes"
- "Assess the test coverage impact of PR [number]"
  </command_patterns>
  <integration_workflow>
  COMBINE Copilot insights with structured analysis:

1. Use Copilot for initial assessment and context
2. Apply Agent OS systematic review process
3. Cross-validate Copilot findings with CI data
4. Generate final recommendation using both inputs
   </integration_workflow>
   </copilot_review_commands>

<process_flow>

<step number="1" name="pr_identification">

### Step 1: Pull Request Identification

<step_metadata>
<trigger_patterns> - "PR [number]" - "pull request [number]" - "renovate PR" - "dependency update"
</trigger_patterns>
<required_inputs> - pr_number: integer
</required_inputs>
</step_metadata>

<pr_detection>
<active_pr>use github-pull-request_activePullRequest if no number specified</active_pr>
<specific_pr>use provided PR number with GitHub Copilot review commands</specific_pr>
<copilot_commands>leverage GitHub Copilot's built-in PR review functionality</copilot_commands>
<fallback>search terminal output for PR listings via gh CLI</fallback>
</pr_detection>

<instructions>
  ACTION: Identify target PR for review
  PREFER: GitHub Copilot's native PR review commands and functionality
  CHECK: Active PR context first, then specific number
  VALIDATE: PR exists and is from Renovate bot
  PROCEED: Only if valid Renovate PR found
</instructions>

</step>

<step number="2" name="pr_data_collection">

### Step 2: Pull Request Data Collection

<step_metadata>
<data_sources> - PR metadata (title, description, files changed) - CI/CD status checks - Package manager lock files - Release notes and changelogs
</data_sources>
<collection_methods> - GitHub Copilot PR review tools - github-pull-request agent functions - gh CLI commands - git diff analysis
</collection_methods>
</step_metadata>

<data_collection_sequence>
<pr_metadata>
COLLECT: Title, body, state, mergeable status
EXTRACT: Updated packages and version changes
IDENTIFY: Update type (major, minor, patch)
</pr_metadata>
<status_checks>
VERIFY: All CI/CD checks passing
CHECK: Test results across supported Node versions
CONFIRM: Build and lint processes successful
</status_checks>
<file_analysis>
EXAMINE: package.json changes
REVIEW: lock file modifications
ASSESS: Scope of dependency updates
</file_analysis>
</data_collection_sequence>

<instructions>
  ACTION: Gather comprehensive PR data
  VERIFY: All status checks completed successfully
  ANALYZE: Scope and impact of changes
  DOCUMENT: Key findings for assessment
</instructions>

</step>

<step number="3" name="dependency_analysis">

### Step 3: Dependency Analysis

<step_metadata>
<analysis_categories> - update_type: major | minor | patch - dependency_scope: runtime | development | peer - breaking_changes: boolean - node_compatibility: version_ranges
</analysis_categories>
<risk_factors> - major version bumps - runtime dependency changes - new peer dependencies - deprecated package warnings
</risk_factors>
</step_metadata>

<update_classification>
<major_updates>
ASSESS: Breaking change potential
CHECK: Migration guides and release notes
VERIFY: Compatibility with current codebase
EVALUATE: Node.js version requirements
</major_updates>
<minor_patch_updates>
CONFIRM: Backward compatibility maintained
CHECK: No new breaking changes
VERIFY: Security fixes included
</minor_patch_updates>
<dev_dependencies>
PRIORITY: Lower risk assessment
FOCUS: Build tool compatibility
CHECK: Test framework changes
</dev_dependencies>
</update_classification>

<compatibility_check>
<node_versions>
COMPARE: Current project requirements vs new package requirements
VERIFY: CI pipeline supports required versions
CHECK: Runtime compatibility matrix
</node_versions>
<framework_compatibility>
ASSESS: Framework version compatibility
CHECK: Plugin and extension support
VERIFY: API compatibility maintained
</framework_compatibility>
</compatibility_check>

<instructions>
  ACTION: Classify update type and scope
  ASSESS: Breaking change potential
  VERIFY: Compatibility requirements
  IDENTIFY: Risk factors and mitigation needs
</instructions>

</step>

<step number="4" name="testing_validation">

### Step 4: Testing Validation

<step_metadata>
<validation_areas> - automated_tests: CI pipeline results - manual_verification: spot checks if needed - regression_testing: existing functionality - build_verification: package compilation
</validation_areas>
<success_criteria> - all_tests_passing: boolean - build_successful: boolean - coverage_maintained: boolean
</success_criteria>
</step_metadata>

<test_verification>
<ci_pipeline>
CONFIRM: All test suites passing
CHECK: Coverage thresholds maintained
VERIFY: Multiple Node.js versions tested
VALIDATE: Build artifacts generated successfully
</ci_pipeline>
<manual_checks>
IF major_update AND high_risk:
RECOMMEND: Local testing verification
SUGGEST: Staging environment validation
ELSE:
RELY: On automated test results
</manual_checks>
</test_verification>

<quality_gates>
<required_passing>

- Unit tests
- Integration tests
- Linting and formatting
- Type checking
- Security scans
- Code coverage
  </required_passing>
  <blocking_failures>
  ANY failure in required checks = BLOCK merge recommendation
  </blocking_failures>
  </quality_gates>

<instructions>
  ACTION: Validate all testing completed successfully
  VERIFY: Quality gates passed
  ASSESS: Need for additional manual testing
  CONFIRM: No regressions introduced
</instructions>

</step>

<step number="5" name="security_assessment">

### Step 5: Security Assessment

<step_metadata>
<security_checks> - vulnerability_scans: automated security checks - dependency_audit: known security issues - supply_chain: package authenticity - license_compliance: legal compatibility
</security_checks>
<assessment_tools> - CI security scans - Package manager audit tools - Vulnerability databases
</assessment_tools>
</step_metadata>

<security_validation>
<vulnerability_check>
VERIFY: No new security vulnerabilities introduced
CHECK: Security patches included in updates
CONFIRM: Vulnerability scans passing
</vulnerability_check>
<supply_chain>
VALIDATE: Packages from trusted sources
CHECK: Package integrity and signatures
VERIFY: No suspicious dependency additions
</supply_chain>
<license_review>
CONFIRM: License compatibility maintained
CHECK: No restrictive license introductions
VERIFY: Open source compliance
</license_review>
</security_validation>

<instructions>
  ACTION: Assess security implications of updates
  VERIFY: No new vulnerabilities introduced
  CONFIRM: Supply chain integrity maintained
  VALIDATE: License compliance preserved
</instructions>

</step>

<step number="6" name="risk_assessment">

### Step 6: Risk Assessment & Decision Matrix

<step_metadata>
<risk_factors> - update_magnitude: scope of changes - dependency_criticality: importance to project - test_coverage: confidence level - rollback_difficulty: reversion complexity
</risk_factors>
<decision_criteria> - low_risk: patch updates, dev dependencies, full test coverage - medium_risk: minor updates, some breaking changes, good coverage - high_risk: major updates, runtime dependencies, limited coverage
</decision_criteria>
</step_metadata>

<risk_matrix>
<low_risk_indicators>

- Patch or minor version updates
- Development dependencies only
- All tests passing with good coverage
- No breaking changes documented
- Active maintenance and good reputation
  </low_risk_indicators>
  <medium_risk_indicators>
- Minor version with some API changes
- Mixed runtime and dev dependencies
- Some test failures or coverage gaps
- Minor breaking changes with migration path
- Adequate documentation and support
  </medium_risk_indicators>
  <high_risk_indicators>
- Major version updates
- Core runtime dependencies
- Test failures or inadequate coverage
- Significant breaking changes
- Poor documentation or maintenance
  </high_risk_indicators>
  </risk_matrix>

<decision_framework>
<merge_immediately>
IF low_risk AND all_checks_passing:
RECOMMEND: Immediate merge
RATIONALE: Minimal risk, validated changes
</merge_immediately>
<merge_with_caution>
IF medium_risk AND critical_checks_passing:
RECOMMEND: Merge after review
SUGGEST: Monitor post-merge for issues
</merge_with_caution>
<defer_or_reject>
IF high_risk OR critical_failures:
RECOMMEND: Defer or reject
REQUIRE: Additional validation or investigation
</defer_or_reject>
</decision_framework>

<instructions>
  ACTION: Calculate overall risk level
  APPLY: Decision framework based on risk assessment
  PROVIDE: Clear recommendation with rationale
  INCLUDE: Specific action items if needed
</instructions>

</step>

<step number="7" name="recommendation_generation">

### Step 7: Recommendation Generation

<step_metadata>
<output_format> - recommendation: merge | defer | reject - confidence_level: high | medium | low - rationale: detailed explanation - action_items: next steps if needed
</output_format>
<communication_style> - clear and actionable - risk-aware but not overly cautious - evidence-based reasoning
</communication_style>
</step_metadata>

<recommendation_template>

<header>
## PR [NUMBER] Analysis & Recommendation
**[RECOMMENDATION]: [CONFIDENCE_LEVEL] confidence**
</header>
<summary>
### What's Being Updated
- **[Package]**: `[old_version]` → `[new_version]` ([update_type])
[Additional packages as needed]
</summary>
<findings>
### Key Findings
**✅ All CI Checks Pass**
- ✅ [Check 1]: [Status]
- ✅ [Check 2]: [Status]
[Continue for all checks]

**✅ [Compatibility Category]**

- [Specific finding 1]
- [Specific finding 2]
  [Continue for all categories]
  </findings>
  <risk_assessment>

### Risk Assessment: [LEVEL]

- [Risk factor 1 with explanation]
- [Risk factor 2 with explanation]
  [Include mitigation strategies if needed]
  </risk_assessment>
  <verdict>

### Final Verdict

[Detailed rationale for recommendation]
[Specific action items if not immediate merge]
[Confidence level justification]
</verdict>
</recommendation_template>

<instructions>
  ACTION: Generate comprehensive recommendation
  FORMAT: Use standard template structure
  INCLUDE: All relevant findings and rationale
  PROVIDE: Clear next steps for user
</instructions>

</step>

</process_flow>

## Standard Checks Reference

<standard_checks>
<always_verify>

- All CI/CD pipeline checks passing
- Test coverage maintained or improved
- No security vulnerabilities introduced
- Package authenticity and integrity
- License compatibility preserved
- Node.js version compatibility
  </always_verify>
  <major_update_additional>
- Breaking change documentation review
- Migration guide availability
- Backward compatibility assessment
- Runtime behavior impact analysis
- Performance implications review
  </major_update_additional>
  <critical_blocking_issues>
- Failed security scans
- Test suite failures
- Build compilation errors
- Incompatible Node.js requirements
- License conflicts
- Known critical vulnerabilities
  </critical_blocking_issues>
  </standard_checks>

## Decision Guidelines

<decision_guidelines>
<immediate_merge>
CONDITIONS:

- Patch/minor updates only
- All checks passing
- Development dependencies
- No breaking changes
- Good package reputation
  CONFIDENCE: High
  </immediate_merge>
  <careful_merge>
  CONDITIONS:
- Minor updates with small changes
- All critical checks passing
- Some non-critical warnings
- Good test coverage
- Active package maintenance
  CONFIDENCE: Medium to High
  </careful_merge>
  <investigate_further>
  CONDITIONS:
- Major version updates
- Some check failures
- Limited test coverage
- Significant breaking changes
- Security concerns
  CONFIDENCE: Low to Medium
  ACTION: Defer pending investigation
  </investigate_further>
  <reject_merge>
  CONDITIONS:
- Critical security issues
- Major test failures
- Incompatible requirements
- Abandoned packages
- License conflicts
  CONFIDENCE: High
  ACTION: Reject and investigate alternatives
  </reject_merge>
  </decision_guidelines>

## Common Renovate Update Patterns

<common_patterns>
<jest_updates>
PATTERN: Jest major version updates
CONSIDERATIONS: Breaking changes in test APIs, Node.js requirement changes
TYPICAL_SAFETY: Medium to high (good backward compatibility)
</jest_updates>
<eslint_updates>
PATTERN: ESLint and plugin updates  
CONSIDERATIONS: New rules, changed defaults, peer dependency updates
TYPICAL_SAFETY: Medium (may require configuration changes)
</eslint_updates>
<typescript_updates>
PATTERN: TypeScript version updates
CONSIDERATIONS: Compiler behavior changes, new strictness levels
TYPICAL_SAFETY: Medium to high (generally backward compatible)
</typescript_updates>
<node_types_updates>
PATTERN: @types/node updates
CONSIDERATIONS: API signature changes, new type definitions
TYPICAL_SAFETY: High (type-only changes)
</node_types_updates>
</common_patterns>

## Error Handling

<error_handling>
<pr_not_found>
IF PR number not found:
ACTION: Request clarification from user
SUGGEST: Check available PRs with "gh pr list" or ask Copilot to list open PRs
FALLBACK: Use GitHub Copilot to help identify the correct PR
</pr_not_found>
<copilot_limitations>
IF GitHub Copilot review functionality unavailable:
ACTION: Fall back to manual analysis using available tools
USE: github-pull-request agent functions and gh CLI
MAINTAIN: Same structured analysis approach
</copilot_limitations>
<access_issues>
IF GitHub API access fails:
ACTION: Use terminal-based fallbacks
FALLBACK: Manual PR review process with git commands
REQUEST: User assistance for missing data
</access_issues>
<incomplete_data>
IF critical data missing:
ACTION: Ask GitHub Copilot to help gather missing information
REQUEST: User assistance for context Copilot cannot provide
PROCEED: With available information and note limitations clearly
</incomplete_data>
</error_handling>

## GitHub Copilot Best Practices

<copilot_best_practices>
<effective_usage>

- Start with Copilot's natural language PR analysis
- Ask specific questions about security, compatibility, and breaking changes
- Use Copilot to explain complex dependency relationships
- Leverage Copilot's knowledge of common package update patterns
- Cross-reference Copilot insights with automated CI results
  </effective_usage>
  <verification_approach>
- Trust but verify Copilot's analysis with objective data
- Use CI pipeline results as authoritative source for test status
- Validate Copilot's risk assessments against historical patterns
- Combine Copilot's contextual understanding with systematic checks
  </verification_approach>
  <command_examples>
  Example effective Copilot interactions:
- "What changed between Jest 29 and 30 that might affect our tests?"
- "Are there any breaking changes in this TypeScript update?"
- "How risky is this major version bump for our Node.js compatibility?"
- "What should I watch out for when merging this Renovate PR?"
  </command_examples>
  </copilot_best_practices>
