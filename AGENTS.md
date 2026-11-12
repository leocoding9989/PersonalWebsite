# Project overview

This is a personal website with an Express backend and a vanilla HTML, CSS, and JavaScript frontend.

## Approval and scope

- Default to discussion mode. In discussion mode, discuss ideas, summarize your understanding, propose plans, ask questions, and read or view project files. Tools or commands may be used solely to locate, read, or view those files. Get the user's explicit green light before editing files, implementing changes, running tests, or taking any other action outside discussion or file viewing.
- Treat approval as limited to the requested action or workflow step. Ask for clarification when a requirement or decision is unclear.
- Follow the workflow below and implement only the approved scope. Avoid drive-by feature changes and speculative additions. If implementation requires work outside the approved scope, raise it with the user and get approval before proceeding.

## Feature workflow

1. **Discuss and plan.** After the user describes a feature, summarize what you understood, discuss the relevant decisions, and propose an implementation plan. Ask clarifying questions about anything unclear or undecided. Iterate until the user approves moving to the specification step.
2. **Write the specification.** When the user asks, create a Markdown file in `Actual_Site/specs/` with the feature's date and time as the filename prefix. Capture all agreed requirements and decisions from the discussion, along with a phased implementation plan detailed enough to implement the feature exactly. Revise the specification with the user and wait for their explicit green light before implementing.
3. **Implement and review each phase.** Implement one approved phase at a time. After each phase, spawn the three verifier agents described below and review their findings. Then stop so the user can verify the phase and approve moving forward. If the user asks to one-shot the feature, still run the verifiers after every phase and continue without the intermediate user review stops. Once the entire feature is implemented, spawn the three verifiers again to review the feature as a whole.
4. **Assign one verifier to each review area.** Each verifier should read and apply any relevant skill documentation. Give them the approved specification and the phase or whole-feature scope they are reviewing.
   - **Bugs and correctness.** Confirm that the code runs without crashing and produces the expected behavior. Write and run test suites and use tools as needed to check correctness thoroughly.
   - **Code cleanliness and documentation.** Check that the implementation follows clean software design principles and that comments and docstrings accurately reflect the code.
   - **Specification adherence.** Check every applicable specification requirement for the phase, or the entire specification for the final review. Flag anything implemented outside the request. Carry any justified additions into the final summary.
5. **Summarize the completed feature.** Describe what was implemented, what the verifiers checked and found, any approved extra work needed to make the feature work, and any relevant quirks, issues, successes, or remaining limitations.
