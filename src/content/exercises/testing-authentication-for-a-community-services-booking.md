---
title: Testing authentication for a community-services booking
summary: Investigate input purposes, paste, password reveal, verification, memory demands, errors, and recovery in a fictional sign-in flow.
description: Practise intermediate authentication and verification testing while managing a fictional community-services booking.
status: published
order: 67
category: interaction-and-tasks
topics: [authentication, verification, cognitive accessibility, passwords, autocomplete, forms, screen readers]
prerequisites:
  - Complete or understand Testing authentication and verification
  - Be able to test forms with a keyboard and screen reader
difficulty: intermediate
estimatedMinutes: 35
exerciseType: perform-test
fixture: community-services-authentication
objectives:
  - Test input purposes, password assistance, paste, and password-reveal behavior.
  - Identify unsupported memory and transcription requirements across authentication steps.
  - Evaluate verification errors, retained information, and recovery.
  - Record deterministic evidence separately from browser and password-manager variation.
methods: [testing-authentication-and-verification]
hints:
  - Try assistance instead of typing everything manually. Inspect the credential-field purposes, paste fictional values, and operate the password-reveal control in both directions.
  - Compare the sign-in and verification steps. Notice what information disappears, what must be re-entered, and which complete values can or cannot be pasted.
  - Inspect the email and password autocomplete values and the paste handlers. Then submit an incorrect verification attempt and assess what is cleared, what the message explains, and how the user can continue.
expectedFindings: 5
solution:
  summary: The community-services sign-in contains five deliberately created authentication and recovery problems.
  findings:
    - title: Credential input purposes are not identified appropriately
      explanation: The email field omits the username autocomplete purpose, while the existing-password field incorrectly uses new-password. This deterministic markup can prevent browsers, password managers, and adaptations from recognizing the intended fields reliably. Use the input purposes appropriate to an existing-account sign-in and verify behavior with relevant user agents without claiming one result is universal.
      method: testing-authentication-and-verification
    - title: Password paste is blocked
      explanation: The password field cancels paste, forcing manual entry and blocking a common mechanism that reduces memory and transcription demands. Permit paste and test the field with browser and third-party credential assistance as appropriate.
      method: testing-authentication-and-verification
    - title: The complete verification code cannot be pasted
      explanation: The simulated message makes the code selectable, but the verification field cancels paste and provides no automatic-fill or device-mediated mechanism. People must transcribe the code manually. Accept the complete pasted code or provide another supported way to complete verification without transcription.
      method: testing-authentication-and-verification
    - title: Verification requires an unsupported memory task
      explanation: The site-provided booking reference disappears before verification and must be recalled and re-entered. No non-cognitive authentication alternative or assistance mechanism is available. Keep necessary information available, permit a mechanism to transfer it, or provide another authentication path that does not require recall.
      method: testing-authentication-and-verification
    - title: Failed verification removes information and gives weak recovery guidance
      explanation: An incorrect attempt returns to sign-in, clears every entered value, and reports only that verification failed. The message does not identify what can be corrected or how to retry efficiently. Preserve information that does not need to be re-entered and provide specific, accessible recovery guidance. Evaluate this through the broader authentication and form-recovery procedure rather than treating it automatically as an Accessible Authentication failure.
      method: testing-authentication-and-verification
---

## Before you begin

This is a fictional practice sign-in. All account, password, booking, and verification details are fictional. Nothing you enter is submitted, stored, or retained, and reloading or resetting the workspace removes its current state.

Use fictional sample values only. **Do not enter a real email address, password, booking reference, verification code, or other personal information.**

Read [Testing authentication and verification](/methods/testing-authentication-and-verification/) before starting. Prepare a keyboard, screen reader, browser developer tools, and optionally browser autofill or a password manager that you can use safely with fictional data.

## Your task

Open the standalone workspace and test the complete sign-in and verification journey. The interface contains deliberate problems, but it does not identify how many or where they are.

1. Read the fictional booking summary and privacy boundary before starting.
2. Map the sign-in, verification, invalid-attempt, success, and reset states.
3. Inspect the credential fields and try safe browser or password-manager assistance with fictional values.
4. Copy and paste into each relevant field rather than typing every value manually.
5. Operate the password-reveal control with a keyboard and screen reader, then return it to its concealed state.
6. Continue to verification and note which earlier information remains available.
7. Try both an incorrect verification attempt and the documented fictional successful values.
8. Evaluate labels, input purposes, cognitive demands, paste, retained information, errors, focus, announcements, and recovery.
9. Record findings and passing checks with the tested environment, observed behavior, deterministic markup, user impact, remediation direction, and limitations.
10. Reset and repeat uncertain results from a stable state. Use another relevant browser or assistance mechanism when feasible.

Use **Return to the exercise** when you are ready to continue, need a hint, or want to compare your findings with the solution.

## Scope

Focus on the accessibility of existing-user sign-in and verification. Account creation, password recovery, real messaging, production lockouts, security testing, privacy compliance, and exhaustive password-manager interoperability are outside this exercise.
