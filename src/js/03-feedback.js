import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

fillInputSavedData();

refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput() {
  const email = refs.form.querySelector('input').value;
  const message = refs.form.querySelector('textarea').value;

  const CurrentFormState = {
    email: email,
    message: message,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(CurrentFormState));
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.clear();
}

function fillInputSavedData() {
  const savedInputData = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );
  if (savedInputData) {
    refs.form.querySelector('input').value = savedInputData.email;
    refs.form.querySelector('textarea').value = savedInputData.message;
  }
}
