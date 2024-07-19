document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector<HTMLFormElement>('form');
  const nameInput = document.getElementById('name-input') as HTMLInputElement;
  const nameError = document.getElementById('name-error') as HTMLSpanElement;
  const emailInput = document.getElementById('email-input') as HTMLInputElement;
  const passwordInputs = document.querySelectorAll<HTMLInputElement>('input[type=password]');
  const signUpButton = document.querySelector<HTMLButtonElement>('button');
  const emailError = document.getElementById('email-error') as HTMLSpanElement;
  const passwordError = document.getElementById('password-error') as HTMLSpanElement;

  function validateForm(event: Event) {
      event.preventDefault(); 

      
      const isNameLongEnough = nameInput.value.trim().length >= 3;
      const isEmailEmpty = emailInput.value.trim() === '';
      const isEmailValid = emailInput.checkValidity() && !isEmailEmpty;
      const passwordValues = Array.from(passwordInputs, input => input.value.trim());
      const arePasswordsNotEmpty = passwordValues.every(value => value !== '');
      const arePasswordsMatching = passwordValues.length > 1 ? passwordValues[0] === passwordValues[1] : true;

      // Validación del nombre
      if (!isNameLongEnough) {
          nameInput.classList.add('border-red-500');
          nameError.textContent = 'Name must be at least 3 characters long';
          nameError.classList.remove('hidden');
      } else {
          nameInput.classList.remove('border-red-500');
          nameError.classList.add('hidden');
      }
      // Validación del email
      if (!isEmailValid) {
          emailInput.classList.add('border-red-500');
          emailError.textContent = isEmailEmpty ? 'Email cannot be empty' : 'Please enter a valid Email';
          emailError.classList.remove('hidden');
      } else {
          emailInput.classList.remove('border-red-500');
          emailError.classList.add('hidden');
      }

      // Validación de las contraseñas
      if (!arePasswordsNotEmpty) {
          passwordInputs.forEach(input => input.classList.add('border-red-500'));
          passwordError.textContent = 'Password(s) cannot be empty';
          passwordError.classList.remove('hidden');
      } else if (!arePasswordsMatching) {
          passwordInputs.forEach(input => input.classList.add('border-red-500'));
          passwordError.textContent = 'Passwords do not match';
          passwordError.classList.remove('hidden');
      } else {
          passwordInputs.forEach(input => input.classList.remove('border-red-500'));
          passwordError.classList.add('hidden');
      }

      // Decidir si el formulario debe enviarse
      if (isEmailValid && arePasswordsNotEmpty && arePasswordsMatching) {
          form.submit(); // Si todo es válido, enviar el formulario
      }
  }

  signUpButton?.addEventListener('click', validateForm);
});
