---
description: Spec Creation Rules for Agent OS
globs:
alwaysApply: false
version: 1.1
encoding: UTF-8
---

# Spec Creation Rules

<ai_meta>
<rules>Process XML blocks sequentially, use exact templates, request missing data</rules>
<format>UTF-8, LF, 2-space indent, no header indent</format>
</ai_meta>

## Overview

Generate detailed feature specifications aligned with product roadmap and mission.

<agent_detection>
<check_once>
AT START OF PROCESS:
SET has_file_creator = (Claude Code AND file-creator agent exists)
SET has_context_fetcher = (Claude Code AND context-fetcher agent exists)
USE these flags throughout execution
</check_once>
</agent_detection>

<process_flow>

<step number="1" name="spec_initiation">

### Step 1: Spec Initiation

<step_metadata>
<trigger_options> - option_a: user_asks_whats_next - option_b: user_provides_specific_spec
</trigger_options>
</step_metadata>

<option_a_flow>
<trigger_phrases> - "what's next?"
</trigger_phrases>
<actions> 1. CHECK @.agent-os/product/roadmap.md 2. FIND next uncompleted item 3. SUGGEST item to user 4. WAIT for approval
</actions>
</option_a_flow>

<option_b_flow>
<trigger>user describes specific spec idea</trigger>
<accept>any format, length, or detail level</accept>
<proceed>to context gathering</proceed>
</option_b_flow>

<instructions>
  ACTION: Identify spec initiation method
  ROUTE: Follow appropriate flow based on trigger
  WAIT: Ensure user agreement before proceeding
</instructions>

</step>

<step number="2" name="context_gathering">

### Step 2: Context Gathering (Conditional)

<step_metadata>
<condition>only if mission-lite.md AND tech-stack.md not already in context</condition>
<reads> - @.agent-os/product/mission-lite.md (conditional) - @.agent-os/product/tech-stack.md (conditional)
</reads>
<purpose>minimal context for spec alignment</purpose>
</step_metadata>

<conditional_logic>
IF both mission-lite.md AND tech-stack.md already read in current context:
SKIP this entire step
PROCEED to step 3
ELSE:
READ only files not already in context: - mission-lite.md (if not in context) - tech-stack.md (if not in context)
CONTINUE with context analysis
</conditional_logic>

<context_analysis>
<mission_lite>core product purpose and value</mission_lite>
<tech_stack>technical requirements</tech_stack>
</context_analysis>

<instructions>
  ACTION: Check if both files already in context
  SKIP: Entire step if both already read
  READ: Only files not already in context
  ANALYZE: Minimal alignment requirements
</instructions>

</step>

<step number="3" name="requirements_clarification">

### Step 3: Requirements Clarification

<step_metadata>
<required_clarifications> - scope_boundaries: string - technical_considerations: array[string]
</required_clarifications>
</step_metadata>

<clarification_areas>
<scope> - in_scope: what is included - out_of_scope: what is excluded (optional)
</scope>
<technical> - functionality specifics - UI/UX requirements - integration points
</technical>
</clarification_areas>

<decision_tree>
IF clarification_needed:
ASK numbered_questions
WAIT for_user_response
ELSE:
PROCEED to_date_determination
</decision_tree>

<instructions>
  ACTION: Evaluate need for clarification
  ASK: Numbered questions if needed
  PROCEED: Only with clear requirements
</instructions>

</step>

<step number="4" name="date_determination">

### Step 4: Date Determination

<step_metadata>
<purpose>Ensure accurate date for folder naming</purpose>
<priority>high</priority>
<creates>temporary file for timestamp</creates>
</step_metadata>

<date_determination_process>
<primary_method>
<name>File System Timestamp</name>
<process> 1. CREATE directory if not exists: .agent-os/specs/ 2. CREATE temporary file: .agent-os/specs/.date-check 3. READ file creation timestamp from filesystem 4. EXTRACT date in YYYY-MM-DD format 5. DELETE temporary file 6. STORE date in variable for folder naming
</process>
</primary_method>

<fallback_method>
<trigger>if file system method fails</trigger>
<name>User Confirmation</name>
<process> 1. STATE: "I need to confirm today's date for the spec folder" 2. ASK: "What is today's date? (YYYY-MM-DD format)" 3. WAIT for user response 4. VALIDATE format matches YYYY-MM-DD 5. STORE date for folder naming
</process>
</fallback_method>
</date_determination_process>

<validation>
  <format_check>^\d{4}-\d{2}-\d{2}$</format_check>
  <reasonableness_check>
    - year: 2024-2030
    - month: 01-12
    - day: 01-31
  </reasonableness_check>
</validation>

<error_handling>
IF date_invalid:
USE fallback_method
IF both_methods_fail:
ERROR "Unable to determine current date"
</error_handling>

<instructions>
  ACTION: Determine accurate date using file system
  FALLBACK: Ask user if file system method fails
  VALIDATE: Ensure YYYY-MM-DD format
  STORE: Date for immediate use in next step
</instructions>

</step>

<step number="5" name="spec_folder_creation">

### Step 5: Spec Folder Creation

<step_metadata>
<creates> - directory: .agent-os/specs/YYYY-MM-DD-spec-name/
</creates>
<uses>date from step 4</uses>
</step_metadata>

<folder_naming>
<format>YYYY-MM-DD-spec-name</format>
<date>use stored date from step 4</date>
<name_constraints> - max_words: 5 - style: kebab-case - descriptive: true
</name_constraints>
</folder_naming>

<example_names>

- 2025-03-15-password-reset-flow
- 2025-03-16-user-profile-dashboard
- 2025-03-17-api-rate-limiting
  </example_names>

<instructions>
  IF has_file_creator:
    USE: @agent:file-creator
    REQUEST: "Create directory: .agent-os/specs/[DATE]-[SPEC-NAME]/"
  ELSE:
    CREATE: Directory using mkdir -p
  FORMAT: Use kebab-case for spec name
  LIMIT: Maximum 5 words in name
  VERIFY: Folder created successfully
</instructions>

</step>

<step number="6" name="create_spec_md">

### Step 6: Create spec.md

<step_metadata>
<creates> - file: .agent-os/specs/YYYY-MM-DD-spec-name/spec.md
</creates>
</step_metadata>

<file_template>

  <header>
    # Spec Requirements Document

    > Spec: [SPEC_NAME]
    > Created: [CURRENT_DATE]
    > Status: Planning

  </header>
  <required_sections>
    - Overview
    - User Stories
    - Spec Scope
    - Out of Scope
    - Expected Deliverable
  </required_sections>
</file_template>

<section name="overview">
  <template>
    ## Overview

    [1-2_SENTENCE_GOAL_AND_OBJECTIVE]

  </template>
  <constraints>
    - length: 1-2 sentences
    - content: goal and objective
  </constraints>
  <example>
    Implement a secure password reset functionality that allows users to regain account access through email verification. This feature will reduce support ticket volume and improve user experience by providing self-service account recovery.
  </example>
</section>

<section name="user_stories">
  <template>
    ## User Stories

    ### [STORY_TITLE]

    As a [USER_TYPE], I want to [ACTION], so that [BENEFIT].

    [DETAILED_WORKFLOW_DESCRIPTION]

  </template>
  <constraints>
    - count: 1-3 stories
    - include: workflow and problem solved
    - format: title + story + details
  </constraints>
</section>

<section name="spec_scope">
  <template>
    ## Spec Scope

    1. **[FEATURE_NAME]** - [ONE_SENTENCE_DESCRIPTION]
    2. **[FEATURE_NAME]** - [ONE_SENTENCE_DESCRIPTION]

  </template>
  <constraints>
    - count: 1-5 features
    - format: numbered list
    - description: one sentence each
  </constraints>
</section>

<section name="out_of_scope">
  <template>
    ## Out of Scope

    - [EXCLUDED_FUNCTIONALITY_1]
    - [EXCLUDED_FUNCTIONALITY_2]

  </template>
  <purpose>explicitly exclude functionalities</purpose>
</section>

<section name="expected_deliverable">
  <template>
    ## Expected Deliverable

    1. [TESTABLE_OUTCOME_1]
    2. [TESTABLE_OUTCOME_2]

  </template>
  <constraints>
    - count: 1-3 expectations
    - focus: browser-testable outcomes
  </constraints>
</section>

<instructions>
  ACTION: Create spec.md with all sections
  FILL: Use spec details from steps 1-3
  MAINTAIN: Clear, concise descriptions
</instructions>

</step>

<step number="7" name="create_spec_lite_md">

### Step 7: Create spec-lite.md

<step_metadata>
<creates> - file: .agent-os/specs/YYYY-MM-DD-spec-name/spec-lite.md
</creates>
<purpose>condensed spec for efficient AI context usage</purpose>
</step_metadata>

<file_template>

  <header>
    # Spec Summary (Lite)
  </header>
</file_template>

<content_structure>
<spec_summary> - source: Step 6 spec.md overview section - length: 1-3 sentences - content: core goal and objective of the feature
</spec_summary>
</content_structure>

<content_template>
[1-3_SENTENCES_SUMMARIZING_SPEC_GOAL_AND_OBJECTIVE]
</content_template>

<example>
  Implement secure password reset via email verification to reduce support tickets and enable self-service account recovery. Users can request a reset link, receive a time-limited token via email, and set a new password following security best practices.
</example>

<instructions>
  ACTION: Create spec-lite.md from spec.md overview
  EXTRACT: Core goal and objective from spec.md
  CONDENSE: Into 1-3 sentences maximum
  FOCUS: Essential feature purpose only
</instructions>

</step>

<step number="8" name="create_technical_spec">

### Step 8: Create Technical Specification

<step_metadata>
<creates> - directory: sub-specs/ - file: sub-specs/technical-spec.md
</creates>
</step_metadata>

<file_template>

  <header>
    # Technical Specification

    This is the technical specification for the spec detailed in @.agent-os/specs/YYYY-MM-DD-spec-name/spec.md

  </header>
</file_template>

<spec_sections>
<technical_requirements> - functionality details - UI/UX specifications - integration requirements - performance criteria
</technical_requirements>
<external_dependencies_conditional> - only include if new dependencies needed - new libraries/packages - justification for each - version requirements
</external_dependencies_conditional>
</spec_sections>

<example_template>

## Technical Requirements

- [SPECIFIC_TECHNICAL_REQUIREMENT]
- [SPECIFIC_TECHNICAL_REQUIREMENT]

## External Dependencies (Conditional)

[ONLY_IF_NEW_DEPENDENCIES_NEEDED]

- **[LIBRARY_NAME]** - [PURPOSE]
- **Justification:** [REASON_FOR_INCLUSION]
  </example_template>

<conditional_logic>
IF spec_requires_new_external_dependencies:
INCLUDE "External Dependencies" section
ELSE:
OMIT section entirely
</conditional_logic>

<instructions>
  ACTION: Create sub-specs folder and technical-spec.md
  DOCUMENT: Technical requirements only
  INCLUDE: External dependencies section ONLY if new libraries needed
  OMIT: Multiple approach options and rationale
</instructions>

</step>

<step number="9" name="create_database_schema">

### Step 9: Create Database Schema (Conditional)

<step_metadata>
<creates> - file: sub-specs/database-schema.md
</creates>
<condition>only if database changes needed</condition>
</step_metadata>

<decision_tree>
IF spec_requires_database_changes:
CREATE sub-specs/database-schema.md
ELSE:
SKIP this_step
</decision_tree>

<file_template>

  <header>
    # Database Schema

    This is the database schema implementation for the spec detailed in @.agent-os/specs/YYYY-MM-DD-spec-name/spec.md

  </header>
</file_template>

<schema_sections>
<changes> - new tables - new columns - modifications - migrations
</changes>
<specifications> - exact SQL or migration syntax - indexes and constraints - foreign key relationships
</specifications>
<rationale> - reason for each change - performance considerations - data integrity rules
</rationale>
</schema_sections>

<instructions>
  ACTION: Check if database changes needed
  CREATE: database-schema.md only if required
  INCLUDE: Complete SQL/migration specifications
</instructions>

</step>

<step number="10" name="create_api_spec">

### Step 10: Create API Specification (Conditional)

<step_metadata>
<creates> - file: sub-specs/api-spec.md
</creates>
<condition>only if API changes needed</condition>
</step_metadata>

<decision_tree>
IF spec_requires_api_changes:
CREATE sub-specs/api-spec.md
ELSE:
SKIP this_step
</decision_tree>

<file_template>

  <header>
    # API Specification

    This is the API specification for the spec detailed in @.agent-os/specs/YYYY-MM-DD-spec-name/spec.md

  </header>
</file_template>

<api_sections>
<routes> - HTTP method - endpoint path - parameters - response format
</routes>
<controllers> - action names - business logic - error handling
</controllers>
<purpose> - endpoint rationale - integration with features
</purpose>
</api_sections>

<endpoint_template>

## Endpoints

### [HTTP_METHOD] [ENDPOINT_PATH]

**Purpose:** [DESCRIPTION]
**Parameters:** [LIST]
**Response:** [FORMAT]
**Errors:** [POSSIBLE_ERRORS]
</endpoint_template>

<instructions>
  ACTION: Check if API changes needed
  CREATE: api-spec.md only if required
  DOCUMENT: All endpoints and controllers
</instructions>

</step>

<step number="11" name="user_review">

### Step 11: User Review

<step_metadata>
<action>request user review</action>
<reviews> - spec.md - all sub-specs files
</reviews>
</step_metadata>

<review_request>
I've created the spec documentation:

- Spec Requirements: @.agent-os/specs/YYYY-MM-DD-spec-name/spec.md
- Spec Summary: @.agent-os/specs/YYYY-MM-DD-spec-name/spec-lite.md
- Technical Spec: @.agent-os/specs/YYYY-MM-DD-spec-name/sub-specs/technical-spec.md
  [LIST_OTHER_CREATED_SPECS]

Please review and let me know if any changes are needed before I create the task breakdown.
</review_request>

<instructions>
  ACTION: Request user review of all documents
  WAIT: For approval or revision requests
  REVISE: Make requested changes if any
</instructions>

</step>

<step number="12" name="create_tasks">

### Step 12: Create tasks.md

<step_metadata>
<creates> - file: tasks.md
</creates>
<depends_on>user approval from step 11</depends_on>
</step_metadata>

<file_template>

  <header>
    # Spec Tasks
  </header>
</file_template>

<task_structure>
<major_tasks> - count: 1-5 - format: numbered checklist - grouping: by feature or component
</major_tasks>
<subtasks> - count: up to 8 per major task - format: decimal notation (1.1, 1.2) - first_subtask: typically write tests - last_subtask: verify all tests pass
</subtasks>
</task_structure>

<task_template>

## Tasks

- [ ] 1. [MAJOR_TASK_DESCRIPTION]

  - [ ] 1.1 Write tests for [COMPONENT]
  - [ ] 1.2 [IMPLEMENTATION_STEP]
  - [ ] 1.3 [IMPLEMENTATION_STEP]
  - [ ] 1.4 Verify all tests pass

- [ ] 2. [MAJOR_TASK_DESCRIPTION] - [ ] 2.1 Write tests for [COMPONENT] - [ ] 2.2 [IMPLEMENTATION_STEP]
     </task_template>

<ordering_principles>

- Consider technical dependencies
- Follow TDD approach
- Group related functionality
- Build incrementally
  </ordering_principles>

<instructions>
  ACTION: Create task breakdown following TDD
  STRUCTURE: Major tasks with subtasks
  ORDER: Consider dependencies
</instructions>

</step>

<step number="13" name="decision_documentation">

### Step 13: Decision Documentation (Conditional)

<step_metadata>
<evaluates>strategic impact without loading decisions.md</evaluates>
<updates>decisions.md only if significant deviation and user approves</updates>
</step_metadata>

<conditional_reads>
IF has_context_fetcher:
IF mission-lite.md NOT in context:
USE: @agent:context-fetcher
REQUEST: "Get product pitch from mission-lite.md"
IF roadmap.md NOT in context:
USE: @agent:context-fetcher
REQUEST: "Get current development phase from roadmap.md"
ELSE:
PROCEED: To manual reading below

<manual_reads>
<mission_lite> - IF NOT already in context: READ @.agent-os/product/mission-lite.md - IF already in context: SKIP reading
</mission_lite>
<roadmap> - IF NOT already in context: READ @.agent-os/product/roadmap.md - IF already in context: SKIP reading
</roadmap>
<decisions> - NEVER load decisions.md into context
</decisions>
</manual_reads>
</conditional_reads>

<decision_analysis>
<review_against> - @.agent-os/product/mission-lite.md (conditional) - @.agent-os/product/roadmap.md (conditional)
</review_against>
<criteria> - significantly deviates from mission in mission-lite.md - significantly changes or conflicts with roadmap.md
</criteria>
</decision_analysis>

<decision_tree>
IF spec_does_NOT_significantly_deviate:
SKIP this entire step
STATE "Spec aligns with mission and roadmap"
PROCEED to step 13
ELSE IF spec_significantly_deviates:
EXPLAIN the significant deviation
ASK user: "This spec significantly deviates from our mission/roadmap. Should I draft a decision entry?"
IF user_approves:
DRAFT decision entry
UPDATE decisions.md
ELSE:
SKIP updating decisions.md
PROCEED to step 13
</decision_tree>

<decision_template>

## [CURRENT_DATE]: [DECISION_TITLE]

**ID:** DEC-[NEXT_NUMBER]
**Status:** Accepted
**Category:** [technical/product/business/process]
**Related Spec:** @.agent-os/specs/YYYY-MM-DD-spec-name/

### Decision

[DECISION_SUMMARY]

### Context

[WHY_THIS_DECISION_WAS_NEEDED]

### Deviation

[SPECIFIC_DEVIATION_FROM_MISSION_OR_ROADMAP]
</decision_template>

<instructions>
  ACTION: Check if mission-lite.md and roadmap.md already in context
  READ: Only files not already in context
  NEVER: Load decisions.md
  EVALUATE: Only significant deviations warrant decision entry
  ASK: User permission before drafting any decision
  UPDATE: decisions.md only with explicit user approval
</instructions>

</step>

<step number="14" name="execution_readiness">

### Step 14: Execution Readiness Check

<step_metadata>
<evaluates>readiness to begin implementation</evaluates>
<depends_on>completion of all previous steps</depends_on>
</step_metadata>

<readiness_summary>
<present_to_user> - Spec name and description - First task summary from tasks.md - Estimated complexity/scope - Key deliverables for task 1
</present_to_user>
</readiness_summary>

<execution_prompt>
PROMPT: "The spec planning is complete. The first task is:

**Task 1:** [FIRST_TASK_TITLE]
[BRIEF_DESCRIPTION_OF_TASK_1_AND_SUBTASKS]

Would you like me to proceed with implementing Task 1? I will focus only on this first task and its subtasks unless you specify otherwise.

Type 'yes' to proceed with Task 1, or let me know if you'd like to review or modify the plan first."
</execution_prompt>

<execution_flow>
IF user_confirms_yes:
REFERENCE: @/.agent-os/instructions/execute-tasks.md
FOCUS: Only Task 1 and its subtasks
CONSTRAINT: Do not proceed to additional tasks without explicit user request
ELSE:
WAIT: For user clarification or modifications
</execution_flow>

<instructions>
  ACTION: Summarize first task and request user confirmation
  REFERENCE: Use execute-tasks.md for implementation
  SCOPE: Limit to Task 1 only unless user specifies otherwise
</instructions>

</step>

</process_flow>

## Execution Standards

<standards>
  <follow>
    - @.agent-os/product/code-style.md
    - @.agent-os/product/dev-best-practices.md
    - @.agent-os/product/tech-stack.md
  </follow>
  <maintain>
    - Consistency with product mission
    - Alignment with roadmap
    - Technical coherence
  </maintain>
  <create>
    - Comprehensive documentation
    - Clear implementation path
    - Testable outcomes
  </create>
</standards>

<final_checklist>
<verify> - [ ] Accurate date determined via file system - [ ] Spec folder created with correct date prefix - [ ] spec.md contains all required sections - [ ] All applicable sub-specs created - [ ] User approved documentation - [ ] tasks.md created with TDD approach - [ ] Cross-references added to spec.md - [ ] Strategic decisions evaluated
</verify>
</final_checklist>
