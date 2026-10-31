export const stages = [
  {
    name: 'Start with the problems',
    changed: 'This starting form uses placeholders, has no required indicators or password instructions, and reports only “Invalid input.”',
    why: 'Placeholder text disappears when you type. It is not a persistent visible label, even when a browser uses it as a fallback accessible name. A generic, disconnected error does not explain which value to correct.',
    test: 'Type in both fields and notice the prompts disappear. Submit an empty form. Can you tell what went wrong or how long the password needs to be?',
    limitation: 'Intentionally problematic: missing visible labels, required status and instructions; generic errors have no association or notification strategy.',
  },
  {
    name: 'Add visible labels',
    changed: 'Visible label elements now use for and id to associate each label explicitly with its input.',
    why: 'A label supplies the accessible name: what the control is for. It stays visible while typing and gives people a larger target to click. A placeholder should not replace it.',
    test: 'Click “Email address” and “Password” to focus their controls. Inspect their accessible names, then type and check that the labels remain visible.',
    limitation: 'Still incomplete: required status, password instructions, input purposes and understandable error handling are missing.',
  },
  {
    name: 'Identify required fields',
    changed: 'Each label includes “(required)” and each control has the native required attribute.',
    why: 'Visible text communicates the requirement to sighted users; required exposes it programmatically and enables native constraint validation. Neither presentation alone serves everyone.',
    test: 'Inspect the required state in the accessibility tree. Submit empty fields and try the browser’s native validation feedback. Its wording varies by browser and language.',
    limitation: 'Still incomplete: the password rule is hidden, input purposes are missing, and the custom error remains generic.',
  },
  {
    name: 'Connect password instructions',
    changed: 'A visible password instruction says “Use at least 12 characters.” aria-describedby connects it to the password input.',
    why: 'The label supplies the name; the description adds information about completing the field. Keep instructions visible so everyone can use them. Native HTML handles labels and required status; ARIA adds this descriptive relationship.',
    test: 'Focus Password with a screen reader and inspect its accessible description. Compare the name “Password (required)” with the separate length instruction.',
    limitation: 'Still incomplete: appropriate input types and autocomplete are missing, and custom errors are not yet useful or associated.',
  },
  {
    name: 'Use native input features',
    changed: 'Email now uses type="email" and autocomplete="email". Password uses type="password" and autocomplete="new-password". The submit button is native, as it has been throughout.',
    why: 'Input types support suitable mobile keyboards and native validation. Autocomplete identifies input purposes for browsers and password managers. Password masking reduces casual exposure. These features do not replace understandable error handling.',
    test: 'Try a malformed email address and submit. Inspect the input types and autocomplete attributes. On mobile, compare the email keyboard. Submit a short password to find the remaining error-handling problem.',
    limitation: 'Still incomplete: native validation catches empty fields and email format, but a short password receives only a generic, disconnected custom error.',
  },
  {
    name: 'Help people correct errors',
    changed: 'Custom submit-time validation checks required fields, email format and password length. novalidate disables browser popups so one consistent correction flow handles all errors.',
    why: 'A focused error summary makes failure discoverable and links to each problem. Field-specific errors explain corrections, aria-invalid marks failed controls, and aria-describedby connects errors while retaining the password instruction. Values stay in place.',
    test: 'Submit empty fields, then an invalid email and a short password. Follow summary links using the keyboard. Correct the values and submit again to receive a focused confirmation.',
    limitation: 'Recommended pattern for this browser-only demo. Real account creation also needs server validation, security and network-error handling. This is not a production authentication system.',
  },
];

// One source for the live markup and displayed HTML. No entered values go here.
export function formHTML(stage: number): string {
  const required = stage >= 3 ? ' required' : '';
  const requiredText = stage >= 3 ? ' (required)' : '';
  return `<form id="forms-basics-form"${stage === 6 ? ' novalidate' : ''}>
  <div id="forms-feedback" tabindex="-1" hidden></div>
  <div class="form-field">
    ${stage >= 2 ? `<label for="forms-email">Email address${requiredText}</label>` : ''}
    <input id="forms-email" type="${stage >= 5 ? 'email' : 'text'}"${stage === 1 ? ' placeholder="Email address"' : ''}${required}${stage >= 5 ? ' autocomplete="email"' : ''}>
    ${stage === 6 ? '<p id="forms-email-error" class="field-error" hidden></p>' : ''}
  </div>
  <div class="form-field">
    ${stage >= 2 ? `<label for="forms-password">Password${requiredText}</label>` : ''}
    ${stage >= 4 ? '<p id="forms-password-hint">Use at least 12 characters.</p>' : ''}
    <input id="forms-password" type="${stage >= 5 ? 'password' : 'text'}"${stage === 1 ? ' placeholder="Password"' : ''}${required}${stage >= 4 ? ' aria-describedby="forms-password-hint"' : ''}${stage >= 5 ? ' autocomplete="new-password"' : ''}>
    ${stage === 6 ? '<p id="forms-password-error" class="field-error" hidden></p>' : ''}
  </div>
  <button class="button" type="submit">Try creating an account</button>
  <button class="button" type="reset">Reset form</button>
</form>`;
}
