import FormValidation from '@form-validation/core';
import PluginPure from '@form-validation/plugin-pure';
import validate from 'validate.js';

const emailInput = document.getElementById('email');
const countryInput = document.getElementById('country');
const postalInput = document.getElementById('postal');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    validateEmailInput();
  });
});
