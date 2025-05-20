import validate from 'validate.js';
import FormValidation from '@form-validation/core';
import PluginPure from '@form-validation/plugin-pure';
import { zipCode } from '@form-validation/validator-zip-code';

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
    alert(result.email[0]); // show first error encountered
  } else {
    alert("Email is valid!");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    validateEmail();

    if (countryInput.value === "") {
      alert("Please select a country.");
      return; 
    }
  });
});
