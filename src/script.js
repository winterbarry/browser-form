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

  const pattern = postalCodePatterns[country]; // retrieve pattern for selected country
  if (!pattern) return true; // if pattern not defined for selected country, skip validation

  return pattern.test(postalCode.trim());
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    validateEmail();

    const selectedCountry = countryInput.value;
    const postalCode = postalInput.value;

    if (selectedCountry === "") {
      alert("Please select a country.");
      return;
    } else {
      alert('country is valid!')
    }

    if (!validatePostalCode(selectedCountry, postalCode)) {
      alert("Please enter a valid postal code for the selected country.");
      return;
    } else{
      alert('postal code is valid!')
    }
  });
});
