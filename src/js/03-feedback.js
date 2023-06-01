import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input'),
  messageTextarea: document.querySelector('textarea'),
};

fillInputSavedData();

refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput() {
  const email = refs.emailInput.value;
  const message = refs.messageTextarea.value;

  const currentFormState = {
    email: email,
    message: message,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(currentFormState));

  validateForm();
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.clear();
}

function fillInputSavedData() {
  const savedInputData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedInputData) {
    refs.emailInput.value = savedInputData.email;
    refs.messageTextarea.value = savedInputData.message;
  }

  validateForm();
}

function validateForm() {
    const email = refs.emailInput.value.trim();
    const message = refs.messageTextarea.value.trim();
    const submitButton = refs.form.querySelector('button');
  
    if (email !== '' && message !== '') {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
  
