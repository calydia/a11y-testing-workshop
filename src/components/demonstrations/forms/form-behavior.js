// Run after inserting the selected stage's HTML. All values remain in the DOM.
// No request, storage, logging, or real account creation takes place.
export function connectForm(form, stage) {
  const email = form.querySelector('#forms-email');
  const password = form.querySelector('#forms-password');
  const feedback = form.querySelector('#forms-feedback');
  const fields = [email, password];

  function clearFeedback() {
    feedback.hidden = true;
    feedback.replaceChildren();
    fields.forEach((field) => {
      field.removeAttribute('aria-invalid');
      if (field === password && stage >= 4) {
        field.setAttribute('aria-describedby', 'forms-password-hint');
      } else {
        field.removeAttribute('aria-describedby');
      }
      const error = form.querySelector(`#${field.id}-error`);
      if (error) {
        error.hidden = true;
        error.textContent = '';
      }
    });
  }

  form.addEventListener('reset', clearFeedback);
  // Keep Stage 6 errors until the next submit; hide an outdated success message.
  form.addEventListener('input', () => {
    if (!form.querySelector('[aria-invalid]')) clearFeedback();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearFeedback();
    // Earlier stages retain native constraint validation where attributes exist.
    const errors = [];
    if (!email.value.trim()) {
      errors.push([email, 'Enter your email address.']);
    } else {
      // Use the browser's email syntax check even in the early text-input stages.
      const emailCheck = document.createElement('input');
      emailCheck.type = 'email';
      emailCheck.value = email.value;
      if (!emailCheck.validity.valid) {
        errors.push([email, 'Enter an email address such as learner@example.com.']);
      }
    }
    if (!password.value) {
      errors.push([password, 'Enter a password with at least 12 characters.']);
    } else if (password.value.length < 12) {
      errors.push([password, 'Use at least 12 characters for your password.']);
    }

    feedback.hidden = false;
    if (errors.length && stage < 6) {
      // Intentionally poor error handling for comparison. No focus or association.
      feedback.textContent = 'Invalid input.';
      return;
    }
    if (errors.length) {
      const heading = document.createElement('h4');
      heading.textContent = `Account not created: correct ${errors.length} ${errors.length === 1 ? 'error' : 'errors'}.`;
      const list = document.createElement('ul');
      errors.forEach(([field, message]) => {
        const error = form.querySelector(`#${field.id}-error`);
        error.textContent = message;
        error.hidden = false;
        field.setAttribute('aria-invalid', 'true');
        const description = field === password ? 'forms-password-hint ' : '';
        field.setAttribute('aria-describedby', description + error.id);
        const link = document.createElement('a');
        link.href = `#${field.id}`;
        link.textContent = message;
        link.addEventListener('click', (event) => {
          event.preventDefault();
          field.focus();
        });
        const item = document.createElement('li');
        item.append(link);
        list.append(item);
      });
      feedback.append(heading, list);
    } else {
      feedback.textContent = 'Demo complete. Your entries passed the checks. No account was created and nothing was sent.';
    }
    // One notification strategy: focus the summary or confirmation, no live region.
    feedback.focus();
  });
}
