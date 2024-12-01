// Валидация формы
function showError(formElement, formInput, errorMessage, settings) {
  const inputError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(settings.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(settings.errorClass);
};

function hideError(formElement, formInput, settings) {
  const inputError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(settings.inputErrorClass);
  inputError.classList.remove(settings.errorClass);
  inputError.textContent = '';
};

function checkInputValidity(formElement, formInput, settings) {
  if (!formInput.validity.valid) {
    showError(formElement, formInput, formInput.validationMessage, settings);
  } else {
    hideError(formElement, formInput, settings);
  }
};

function validateFormFields(formElement, settings) {
  const formInputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  formInputs.forEach((input) => {
    checkInputValidity(formElement, input, settings);
  });
  toggleButtonState(formInputs, buttonElement, settings);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(formInputs, buttonElement, settings) {
  if (hasInvalidInput(formInputs)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, settings) {
  const formInputs = Array.from(formElement.querySelectorAll(settings.inputSelector));

  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(formInputs, buttonElement, settings);

  formInputs.forEach((formInput) => {
    formInput.addEventListener('input', (evt) => {
      const input = evt.target;
      checkInputValidity(formElement, input, settings);
      toggleButtonState(formInputs, buttonElement, settings);
    });
  });
}

function enableValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
}

export { enableValidation, validateFormFields }