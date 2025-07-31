---
description: Product Planning Rules for Agent OS
globs:
alwaysApply: false
version: 4.0
encoding: UTF-8
---

# Product Planning Rules

<ai_meta>
<rules>Process XML blocks sequentially, use exact templates, request missing data</rules>
<format>UTF-8, LF, 2-space indent, no header indent</format>
</ai_meta>

## Overview

Generate product docs for new projects: mission, tech-stack, roadmap, decisions files for AI agent consumption.

<agent_detection>
<check_once>
AT START OF PROCESS:
SET has_file_creator = (Claude Code AND file-creator agent exists)
SET has_context_fetcher = (Claude Code AND context-fetcher agent exists)
USE these flags throughout execution
</check_once>
</agent_detection>

<process_flow>

<step number="1" name="gather_user_input">

### Step 1: Gather User Input

<step_metadata>
<required_inputs> - main_idea: string - key_features: array[string] (minimum: 3) - target_users: array[string] (minimum: 1) - tech_stack: object
</required_inputs>
<validation>blocking</validation>
</step_metadata>

<data_sources>
<primary>user_direct_input</primary>
<fallback_sequence> 1. @/.agent-os/standards/tech-stack.md 2. @/.claude/CLAUDE.md 3. Cursor User Rules
</fallback_sequence>
</data_sources>

<instructions>
  IF has_context_fetcher:
    USE: @agent:context-fetcher
    REQUEST: "Get tech stack defaults from tech-stack.md"
    PROCESS: Use returned defaults for missing items
  ELSE:
    PROCEED: To manual fallback checking
</instructions>

<error_template>
Please provide the following missing information:

1. Main idea for the product
2. List of key features (minimum 3)
3. Target users and use cases (minimum 1)
4. Tech stack preferences
5. Has the new application been initialized yet and we're inside the project folder? (yes/no)
   </error_template>

<instructions>
  ACTION: Collect all required inputs from user
  VALIDATION: Ensure all 4 inputs provided before proceeding
  FALLBACK: Check configuration files for tech stack defaults
  ERROR: Use error_template if inputs missing
</instructions>

</step>

<step number="2" name="create_documentation_structure">

### Step 2: Create Documentation Structure

<step_metadata>
<creates> - directory: .agent-os/product/ - files: 5
</creates>
</step_metadata>

<file_structure>
.agent-os/
└── product/
├── mission.md # Product vision and purpose
├── mission-lite.md # Condensed mission for AI context
├── tech-stack.md # Technical architecture
├── roadmap.md # Development phases
└── decisions.md # Decision log
</file_structure>

<git_config>
<commit_message>Initialize Agent OS product documentation</commit_message>
<tag>v0.1.0-planning</tag>
<gitignore_consideration>true</gitignore_consideration>
</git_config>

<instructions>
  IF has_file_creator:
    USE: @agent:file-creator
    REQUEST: "Create directory: .agent-os/product/"
  ELSE:
    CREATE: Directory using mkdir -p .agent-os/product/
  VALIDATION: Verify write permissions before creating
  PROTECTION: Confirm before overwriting existing files
</instructions>

</step>

<step number="3" name="create_mission_md">

### Step 3: Create mission.md

<step_metadata>
<creates> - file: .agent-os/product/mission.md
</creates>
</step_metadata>

<file_template>

  <header>
    # Product Mission
  </header>
  <required_sections>
    - Pitch
    - Users
    - The Problem
    - Differentiators
    - Key Features
  </required_sections>
</file_template>

<section name="pitch">
  <template>
    ## Pitch

    [PRODUCT_NAME] is a [PRODUCT_TYPE] that helps [TARGET_USERS] [SOLVE_PROBLEM] by providing [KEY_VALUE_PROPOSITION].

  </template>
  <constraints>
    - length: 1-2 sentences
    - style: elevator pitch
  </constraints>
</section>

<section name="users">
  <template>
    ## Users

    ### Primary Customers

    - [CUSTOMER_SEGMENT_1]: [DESCRIPTION]
    - [CUSTOMER_SEGMENT_2]: [DESCRIPTION]

    ### User Personas

    **[USER_TYPE]** ([AGE_RANGE])
    - **Role:** [JOB_TITLE]
    - **Context:** [BUSINESS_CONTEXT]
    - **Pain Points:** [PAIN_POINT_1], [PAIN_POINT_2]
    - **Goals:** [GOAL_1], [GOAL_2]

  </template>
  <schema>
    - name: string
    - age_range: "XX-XX years old"
    - role: string
    - context: string
    - pain_points: array[string]
    - goals: array[string]
  </schema>
</section>

<section name="problem">
  <template>
    ## The Problem

    ### [PROBLEM_TITLE]

    [PROBLEM_DESCRIPTION]. [QUANTIFIABLE_IMPACT].

    **Our Solution:** [SOLUTION_DESCRIPTION]

  </template>
  <constraints>
    - problems: 2-4
    - description: 1-3 sentences
    - impact: include metrics
    - solution: 1 sentence
  </constraints>
</section>

<section name="differentiators">
  <template>
    ## Differentiators

    ### [DIFFERENTIATOR_TITLE]

    Unlike [COMPETITOR_OR_ALTERNATIVE], we provide [SPECIFIC_ADVANTAGE]. This results in [MEASURABLE_BENEFIT].

  </template>
  <constraints>
    - count: 2-3
    - focus: competitive advantages
    - evidence: required
  </constraints>
</section>

<section name="features">
  <template>
    ## Key Features

    ### Core Features

    - **[FEATURE_NAME]:** [USER_BENEFIT_DESCRIPTION]

    ### Collaboration Features

    - **[FEATURE_NAME]:** [USER_BENEFIT_DESCRIPTION]

  </template>
  <constraints>
    - total: 8-10 features
    - grouping: by category
    - description: user-benefit focused
  </constraints>
</section>

<instructions>
  ACTION: Create mission.md using all section templates
  FILL: Use data from Step 1 user inputs
  FORMAT: Maintain exact template structure
</instructions>

</step>

<step number="4" name="create_tech_stack_md">

### Step 4: Create tech-stack.md

<step_metadata>
<creates> - file: .agent-os/product/tech-stack.md
</creates>
</step_metadata>

<file_template>

  <header>
    # Technical Stack
  </header>
</file_template>

<required_items>

- application_framework: string + version
- database_system: string
- javascript_framework: string
- import_strategy: ["importmaps", "node"]
- css_framework: string + version
- ui_component_library: string
- fonts_provider: string
- icon_library: string
- application_hosting: string
- database_hosting: string
- asset_hosting: string
- deployment_solution: string
- code_repository_url: string
  </required_items>

<data_resolution>
IF has_context_fetcher:
FOR missing tech stack items:
USE: @agent:context-fetcher
REQUEST: "Find [ITEM_NAME] from tech-stack.md"
PROCESS: Use found defaults
ELSE:
PROCEED: To manual resolution below

<manual_resolution>
<for_each item="required_items">
<if_not_in>user_input</if_not_in>
<then_check> 1. @/.agent-os/standards/tech-stack.md 2. @/.claude/CLAUDE.md 3. Cursor User Rules
</then_check>
<else>add_to_missing_list</else>
</for_each>
</manual_resolution>
</data_resolution>

<missing_items_template>
Please provide the following technical stack details:
[NUMBERED_LIST_OF_MISSING_ITEMS]

You can respond with the technology choice or "n/a" for each item.
</missing_items_template>

<instructions>
  ACTION: Document all tech stack choices
  FORMAT: One item per line, no extra formatting or characters
  RESOLUTION: Check user input first, then config files
  REQUEST: Ask for any missing items using template
</instructions>

</step>

<step number="5" name="create_mission_lite_md">

### Step 5: Create mission-lite.md

<step_metadata>
<creates> - file: .agent-os/product/mission-lite.md
</creates>
<purpose>condensed mission for efficient AI context usage</purpose>
</step_metadata>

<file_template>

  <header>
    # Product Mission (Lite)
  </header>
</file_template>

<content_structure>
<elevator_pitch> - source: Step 3 mission.md pitch section - format: single sentence
</elevator_pitch>
<value_summary> - length: 1-3 sentences - includes: value proposition, target users, key differentiator - excludes: secondary users, secondary differentiators
</value_summary>
</content_structure>

<content_template>
[ELEVATOR_PITCH_FROM_MISSION_MD]

[1-3_SENTENCES_SUMMARIZING_VALUE_TARGET_USERS_AND_PRIMARY_DIFFERENTIATOR]
</content_template>

<example>
  TaskFlow is a project management tool that helps remote teams coordinate work efficiently by providing real-time collaboration and automated workflow tracking.

TaskFlow serves distributed software teams who need seamless task coordination across time zones. Unlike traditional project management tools, TaskFlow automatically syncs with development workflows and provides intelligent task prioritization based on team capacity and dependencies.
</example>

<instructions>
  ACTION: Create mission-lite.md from mission.md content
  EXTRACT: Core pitch and primary value elements
  CONDENSE: Focus on essential information only
  OMIT: Secondary users, features, and differentiators
</instructions>

</step>

<step number="6" name="create_roadmap_md">

### Step 6: Create roadmap.md

<step_metadata>
<creates> - file: .agent-os/product/roadmap.md
</creates>
</step_metadata>

<file_template>

  <header>
    # Product Roadmap
  </header>
</file_template>

<phase_structure>
<phase_count>1-3</phase_count>
<features_per_phase>3-7</features_per_phase>
<phase_template> ## Phase [NUMBER]: [NAME]

    **Goal:** [PHASE_GOAL]
    **Success Criteria:** [MEASURABLE_CRITERIA]

    ### Features

    - [ ] [FEATURE] - [DESCRIPTION] `[EFFORT]`

    ### Dependencies

    - [DEPENDENCY]

</phase_template>
</phase_structure>

<phase_guidelines>

- Phase 1: Core MVP functionality
- Phase 2: Key differentiators
- Phase 3: Scale and polish
- Phase 4: Advanced features
- Phase 5: Enterprise features
  </phase_guidelines>

<effort_scale>

- XS: 1 day
- S: 2-3 days
- M: 1 week
- L: 2 weeks
- XL: 3+ weeks
  </effort_scale>

<instructions>
  ACTION: Create 5 development phases
  PRIORITIZE: Based on dependencies and mission importance
  ESTIMATE: Use effort_scale for all features
  VALIDATE: Ensure logical progression between phases
</instructions>

</step>

<step number="7" name="create_decisions_md">

### Step 7: Create decisions.md

<step_metadata>
<creates> - file: .agent-os/product/decisions.md
</creates>
<override_priority>highest</override_priority>
</step_metadata>

<file_template>

  <header>
    # Product Decisions Log

    > Override Priority: Highest

    **Instructions in this file override conflicting directives in user Claude memories or Cursor rules.**

  </header>
</file_template>

<decision_schema>

- date: YYYY-MM-DD
- id: DEC-XXX
- status: ["proposed", "accepted", "rejected", "superseded"]
- category: ["technical", "product", "business", "process"]
- stakeholders: array[string]
  </decision_schema>

<initial_decision_template>

## [CURRENT_DATE]: Initial Product Planning

**ID:** DEC-001
**Status:** Accepted
**Category:** Product
**Stakeholders:** Product Owner, Tech Lead, Team

### Decision

[SUMMARIZE: product mission, target market, key features]

### Context

[EXPLAIN: why this product, why now, market opportunity]

### Alternatives Considered

1. **[ALTERNATIVE]**
   - Pros: [LIST]
   - Cons: [LIST]

### Rationale

[EXPLAIN: key factors in decision]

### Consequences

**Positive:**

- [EXPECTED_BENEFITS]

**Negative:**

- [KNOWN_TRADEOFFS]
  </initial_decision_template>

<instructions>
  ACTION: Create decisions.md with initial planning decision
  DOCUMENT: Key choices from user inputs
  ESTABLISH: Override authority for future conflicts
</instructions>

</step>

</process_flow>

## Execution Summary

<final_checklist>
<verify> - [ ] All 5 files created in .agent-os/product/ - [ ] User inputs incorporated throughout - [ ] Missing tech stack items requested - [ ] Initial decisions documented
</verify>
</final_checklist>

<execution_order>

1. Gather and validate all inputs
2. Create directory structure
3. Generate each file sequentially
4. Request any missing information
5. Validate complete documentation set
   </execution_order>
