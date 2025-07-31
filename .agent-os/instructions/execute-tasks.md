---
description: Rules to initiate execution of a set of tasks using Agent OS
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Task Execution Rules

<ai_meta>
<rules>Process XML blocks sequentially, use exact templates, request missing data</rules>
<format>UTF-8, LF, 2-space indent, no header indent</format>
</ai_meta>

## Overview

Initiate execution of one or more tasks for a given spec.

<agent_detection>
<check_once>
AT START OF PROCESS:
SET has_git_workflow = (Claude Code AND git-workflow agent exists)
SET has_test_runner = (Claude Code AND test-runner agent exists)
SET has_context_fetcher = (Claude Code AND context-fetcher agent exists)
USE these flags throughout execution
</check_once>
</agent_detection>

<process_flow>

<step number="1" name="task_assignment">

### Step 1: Task Assignment

<step_metadata>
<inputs> - spec_srd_reference: file path - specific_tasks: array[string] (optional)
</inputs>
<default>next uncompleted parent task</default>
</step_metadata>

<task_selection>
<explicit>user specifies exact task(s)</explicit>
<implicit>find next uncompleted task in tasks.md</implicit>
</task_selection>

<instructions>
  ACTION: Identify task(s) to execute
  DEFAULT: Select next uncompleted parent task if not specified
  CONFIRM: Task selection with user
</instructions>

</step>

<step number="2" name="context_analysis">

### Step 2: Context Analysis

<step_metadata>
<reads_always> - spec tasks.md
</reads_always>
<reads_conditionally> - @.agent-os/product/mission-lite.md (if not already in context) - spec-lite.md (if not already in context) - sub-specs/technical-spec.md (if not already in context)
</reads_conditionally>
<purpose>minimal context for task understanding</purpose>
</step_metadata>

<instructions>
  IF has_context_fetcher:
    USE: @agent:context-fetcher for each file not in context:
    - REQUEST: "Get product pitch from mission-lite.md"
    - REQUEST: "Get spec summary from spec-lite.md" 
    - REQUEST: "Get technical approach from technical-spec.md"
    PROCESS: Returned information
  ELSE:
    PROCEED: To conditional loading below
</instructions>

<conditional-block context-check="fallback-context-loading">
IF NOT using context-fetcher agent:
  READ: The following fallback context loading

<conditional_loading>
<mission_lite>
IF NOT already in context:
READ @.agent-os/product/mission-lite.md
</mission_lite>
<spec_lite>
IF NOT already in context:
READ spec-lite.md from spec folder
</spec_lite>
<technical_spec>
IF NOT already in context:
READ sub-specs/technical-spec.md
</technical_spec>
</conditional_loading>
</conditional-block>

<context_gathering>
<essential_docs> - tasks.md for task breakdown
</essential_docs>
<conditional_docs> - mission-lite.md for product alignment - spec-lite.md for feature summary - technical-spec.md for implementation details
</conditional_docs>
</context_gathering>

<instructions>
  ACTION: Always read tasks.md
  CHECK: Which files are already in context
  USE: Context-fetcher if Claude Code, else fallback
  LOAD: Only files not already in context
  SKIP: Other sub-specs files and best practices for now
  ANALYZE: Requirements specific to current task
</instructions>

</step>

<step number="3" name="development_server_check">

### Step 3: Check for Development Server

<step_metadata>
<checks>running development server</checks>
<prevents>port conflicts</prevents>
</step_metadata>

<server_check_flow>
<if_running>
ASK user to shut down
WAIT for response
</if_running>
<if_not_running>
PROCEED immediately
</if_not_running>
</server_check_flow>

<user_prompt>
A development server is currently running.
Should I shut it down before proceeding? (yes/no)
</user_prompt>

<instructions>
  ACTION: Check for running local development server
  CONDITIONAL: Ask permission only if server is running
  PROCEED: Immediately if no server detected
</instructions>

</step>

<step number="4" name="git_branch_management">

### Step 4: Git Branch Management

<step_metadata>
<manages>git branches</manages>
<ensures>proper isolation</ensures>
</step_metadata>

<instructions>
  IF has_git_workflow:
    USE: @agent:git-workflow
    REQUEST: "Check and manage branch for spec: [SPEC_FOLDER]
              - Create branch if needed
              - Switch to correct branch
              - Handle any uncommitted changes"
    WAIT: For branch setup completion
  ELSE:
    PROCEED: To manual branch management below
</instructions>

<conditional-block context-check="manual-branch-management">
IF NOT using git-workflow agent:
  READ: The following manual branch management

<branch_naming>

  <source>spec folder name</source>
  <format>exclude date prefix</format>
  <example>
    - folder: 2025-03-15-password-reset
    - branch: password-reset
  </example>
</branch_naming>

<branch_logic>
<case_a>
<condition>current branch matches spec name</condition>
<action>PROCEED immediately</action>
</case_a>
<case_b>
<condition>current branch is main/staging/review</condition>
<action>CREATE new branch and PROCEED</action>
</case_b>
<case_c>
<condition>current branch is different feature</condition>
<action>ASK permission to create new branch</action>
</case_c>
</branch_logic>

<case_c_prompt>
Current branch: [CURRENT_BRANCH]
This spec needs branch: [SPEC_BRANCH]

May I create a new branch for this spec? (yes/no)
</case_c_prompt>

<instructions>
  ACTION: Check current git branch
  EVALUATE: Which case applies
  EXECUTE: Appropriate branch action
  WAIT: Only for case C approval
</instructions>
</conditional-block>

</step>

<step number="5" name="task_execution_loop">

### Step 5: Task Execution Loop

<step_metadata>
<executes>parent tasks and subtasks</executes>
<uses>@/.agent-os/instructions/execute-task.md</uses>
<continues>until all tasks complete</continues>
</step_metadata>

<execution_flow>
LOAD @/.agent-os/instructions/execute-task.md ONCE

FOR each parent_task assigned in Step 1:
EXECUTE instructions from execute-task.md with: - parent_task_number - all associated subtasks
WAIT for task completion
UPDATE tasks.md status
END FOR
</execution_flow>

<loop_logic>
<continue_conditions> - More unfinished parent tasks exist - User has not requested stop
</continue_conditions>
<exit_conditions> - All assigned tasks marked complete - User requests early termination - Blocking issue prevents continuation
</exit_conditions>
</loop_logic>

<task_status_check>
AFTER each task execution:
CHECK tasks.md for remaining tasks
IF all assigned tasks complete:
PROCEED to next step
ELSE:
CONTINUE with next task
</task_status_check>

<instructions>
  ACTION: Load execute-task.md instructions once at start
  REUSE: Same instructions for each parent task iteration
  LOOP: Through all assigned parent tasks
  UPDATE: Task status after each completion
  VERIFY: All tasks complete before proceeding
  HANDLE: Blocking issues appropriately
</instructions>

</step>

<step number="6" name="test_suite_verification">

### Step 6: Run All Tests

<step_metadata>
<runs>entire test suite</runs>
<ensures>no regressions</ensures>
</step_metadata>

<instructions>
  IF has_test_runner:
    USE: @agent:test-runner
    REQUEST: "Run the full test suite"
    WAIT: For test-runner analysis
    PROCESS: Fix any reported failures
    REPEAT: Until all tests pass
  ELSE:
    PROCEED: To fallback test execution below
</instructions>

<conditional-block context-check="fallback-full-test-execution">
IF NOT using test-runner agent:
  READ: The following fallback test execution instructions

<fallback_test_execution>
<test_execution>
<order> 1. Run entire test suite 2. Fix any failures
</order>
<requirement>100% pass rate</requirement>
</test_execution>

<failure_handling>
<action>troubleshoot and fix</action>
<priority>before proceeding</priority>
</failure_handling>

  <instructions>
    ACTION: Run complete test suite
    VERIFY: All tests pass including new ones
    FIX: Any test failures before continuing
    BLOCK: Do not proceed with failing tests
  </instructions>
</fallback_test_execution>
</conditional-block>

</step>

<step number="7" name="git_workflow">

### Step 7: Git Workflow

<step_metadata>
<creates> - git commit - github push - pull request
</creates>
</step_metadata>

<instructions>
  IF has_git_workflow:
    USE: @agent:git-workflow
    REQUEST: "Complete git workflow for [SPEC_NAME] feature:
              - Spec: [SPEC_FOLDER_PATH]
              - Changes: All modified files
              - Target: main branch
              - Description: [SUMMARY_OF_IMPLEMENTED_FEATURES]"
    WAIT: For workflow completion
    PROCESS: Save PR URL for summary
  ELSE:
    PROCEED: To manual git workflow below
</instructions>

<conditional-block context-check="manual-git-workflow">
IF NOT using git-workflow agent:
  READ: The following manual git workflow

<commit_process>
<commit>
<message>descriptive summary of changes</message>
<format>conventional commits if applicable</format>
</commit>
<push>
<target>spec branch</target>
<remote>origin</remote>
</push>
<pull_request>
<title>descriptive PR title</title>
<description>functionality recap</description>
</pull_request>
</commit_process>

<pr_template>

## Summary

[BRIEF_DESCRIPTION_OF_CHANGES]

## Changes Made

- [CHANGE_1]
- [CHANGE_2]

## Testing

- [TEST_COVERAGE]
- All tests passing ✓
  </pr_template>

<instructions>
  ACTION: Commit all changes with descriptive message
  PUSH: To GitHub on spec branch
  CREATE: Pull request with detailed description
</instructions>
</conditional-block>

</step>

<step number="8" name="roadmap_progress_check">

### Step 8: Roadmap Progress Check (Conditional)

<step_metadata>
<condition>only if tasks may have completed roadmap item</condition>
<checks>@.agent-os/product/roadmap.md (if not in context)</checks>
<updates>if spec completes roadmap item</updates>
</step_metadata>

<conditional_execution>
<preliminary_check>
EVALUATE: Did executed tasks potentially complete a roadmap item?
IF NO:
SKIP this entire step
PROCEED to step 9
IF YES:
CONTINUE with roadmap check
</preliminary_check>
</conditional_execution>

<conditional_loading>
IF roadmap.md NOT already in context:
LOAD @.agent-os/product/roadmap.md
ELSE:
SKIP loading (use existing context)
</conditional_loading>

<roadmap_criteria>
<update_when> - spec fully implements roadmap feature - all related tasks completed - tests passing
</update_when>
<caution>only mark complete if absolutely certain</caution>
</roadmap_criteria>

<instructions>
  ACTION: First evaluate if roadmap check is needed
  SKIP: If tasks clearly don't complete roadmap items
  CHECK: If roadmap.md already in context
  LOAD: Only if needed and not in context
  EVALUATE: If current spec completes roadmap goals
  UPDATE: Mark roadmap items complete if applicable
  VERIFY: Certainty before marking complete
</instructions>

</step>

<step number="9" name="completion_notification">

### Step 9: Task Completion Notification

<step_metadata>
<plays>system sound</plays>
<alerts>user of completion</alerts>
</step_metadata>

<notification_command>
afplay /System/Library/Sounds/Glass.aiff
</notification_command>

<instructions>
  ACTION: Play completion sound
  PURPOSE: Alert user that task is complete
</instructions>

</step>

<step number="10" name="completion_summary">

### Step 10: Completion Summary

<step_metadata>
<creates>summary message</creates>
<format>structured with emojis</format>
</step_metadata>

<summary_template>

## ✅ What's been done

1. **[FEATURE_1]** - [ONE_SENTENCE_DESCRIPTION]
2. **[FEATURE_2]** - [ONE_SENTENCE_DESCRIPTION]

## ⚠️ Issues encountered

[ONLY_IF_APPLICABLE]

- **[ISSUE_1]** - [DESCRIPTION_AND_REASON]

## 👀 Ready to test in browser

[ONLY_IF_APPLICABLE]

1. [STEP_1_TO_TEST]
2. [STEP_2_TO_TEST]

## 📦 Pull Request

View PR: [GITHUB_PR_URL]
</summary_template>

<summary_sections>
<required> - functionality recap - pull request info
</required>
<conditional> - issues encountered (if any) - testing instructions (if testable in browser)
</conditional>
</summary_sections>

<instructions>
  ACTION: Create comprehensive summary
  INCLUDE: All required sections
  ADD: Conditional sections if applicable
  FORMAT: Use emoji headers for scannability
</instructions>

</step>

</process_flow>

## Error Handling

<error_protocols>
<blocking_issues> - document in tasks.md - mark with ⚠️ emoji - include in summary
</blocking_issues>
<test_failures> - fix before proceeding - never commit broken tests
</test_failures>
<technical_roadblocks> - attempt 3 approaches - document if unresolved - seek user input
</technical_roadblocks>
</error_protocols>

<final_checklist>
<verify> - [ ] Task implementation complete - [ ] All tests passing - [ ] tasks.md updated - [ ] Code committed and pushed - [ ] Pull request created - [ ] Roadmap checked/updated - [ ] Summary provided to user
</verify>
</final_checklist>
