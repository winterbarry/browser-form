import validate from 'validate.js';

const emailInput = document.getElementById('email');
const countryInput = document.getElementById('country');
const postalInput = document.getElementById('postal');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

function markInvalid(inputElement, message) {
  inputElement.style.border = '2px solid red';
  inputElement.value = '';
  inputElement.placeholder = message;
}

function clearInvalid(inputElement) {
  inputElement.style.border = '';
  inputElement.placeholder = '';
}

function validateEmail() {
  clearInvalid(emailInput);

  const constraints = {
    email: {
      presence: { allowEmpty: false, message: "is required" },
      email: { message: "is not a valid email address" }
    }
  };

  const result = validate({ email: emailInput.value }, constraints);

  if (result) {
    markInvalid(emailInput, result.email[0]);
    return false;
  }

  return true;
}

// defining postal code patterns
function validatePostalCode(country, postalCode) {
  const postalCodePatterns = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/,
    GB: /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/i,
    AU: /^\d{4}$/,
    CN: /^\d{6}$/,
    IN: /^\d{6}$/,
    JP: /^\d{3}-\d{4}$/
  };

  const pattern = postalCodePatterns[country];
  if (!pattern) return true;

  return pattern.test(postalCode.trim());
}

function validateCountry() {
  clearInvalid(countryInput);

  if (countryInput.value === "") {
    markInvalid(countryInput, "Country is required");
    return false;
  }

  return true;
}

// validating postal code patterns
function validatePostal() {
  clearInvalid(postalInput);

  const selectedCountry = countryInput.value;
  const postalCode = postalInput.value;

  if (!validatePostalCode(selectedCountry, postalCode)) {
    markInvalid(postalInput, "Invalid postal code");
    return false;
  }

  return true;
}

function validatePasswords() {
  clearInvalid(passwordInput);
  clearInvalid(confirmPasswordInput);

  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password === '') {
    markInvalid(passwordInput, "Password is required");
    return false;
  }

  if (confirmPassword === '') {
    markInvalid(confirmPasswordInput, "Confirm Password is required");
    return false;
  }

  if (password.length < 8) {
    markInvalid(passwordInput, "Minimum 8 characters");
    return false;
  }

  if (password !== confirmPassword) {
    markInvalid(confirmPasswordInput, "Passwords do not match");
    return false;
  }

  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  // Progressive validation as the user blurs from each field
  emailInput.addEventListener('blur', validateEmail);
  countryInput.addEventListener('blur', validateCountry);
  postalInput.addEventListener('blur', validatePostal);
  passwordInput.addEventListener('blur', validatePasswords);
  confirmPasswordInput.addEventListener('blur', validatePasswords);

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isCountryValid = validateCountry();
    const isPostalValid = validatePostal();
    const isPasswordValid = validatePasswords();

    if (isEmailValid && isCountryValid && isPostalValid && isPasswordValid) {
      alert("Form submitted successfully!");
    }
  });
});
