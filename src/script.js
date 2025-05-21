import validate from 'validate.js';

const emailInput = document.getElementById('email');
const countryInput = document.getElementById('country');
const postalInput = document.getElementById('postal');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

function validateEmail() {
  const constraints = {
    email: {
      presence: { allowEmpty: false, message: "is required" },
      email: {
        message: "is not a valid email address"
      }
    }
  };

  const result = validate({ email: emailInput.value }, constraints);

  if (result) {
    alert(result.email[0]);
    return false;
  }
  return true;
}

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
  if (countryInput.value === "") {
    alert("Please select a country.");
    return false;
  }
  return true;
}

function validatePostal() {
  const selectedCountry = countryInput.value;
  const postalCode = postalInput.value;

  if (!validatePostalCode(selectedCountry, postalCode)) {
    alert("Please enter a valid postal code for the selected country.");
    return false;
  }
  return true;
}

function validatePasswords() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password === '') {
    alert("Password field is required.");
    return false;
  }

  if (confirmPassword === '') {
    alert("Confirm Password field is required.");
    return false;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
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
