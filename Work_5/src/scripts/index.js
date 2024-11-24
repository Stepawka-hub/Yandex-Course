import '../pages/index.css';

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  addCloseButtonListener(popup);

  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});
renderCards();

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');       
    closeModal(openedPopup);      
  } 
}

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

function addCloseButtonListener(popup) {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popup));
}

// Редактирование профиля
const profileFormElement = profilePopup.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(profilePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(profilePopup);
}

// Кнопка для редактирование профиля
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', fillProfileForm);

// Обработка формы
profileFormElement.addEventListener('submit', handleProfileFormSubmit);



// Добавление карточек
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

function clearNewCardForm() {
  cardNameInput.value = '';
  cardLinkInput.value = '';

  openModal(cardPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardNameValue = cardNameInput.value;
  const cardLinkValue = cardLinkInput.value;

  const card = createCard(cardNameValue, cardLinkValue);
  placesList.insertBefore(card, placesList.firstChild);

  closeModal(cardPopup);
}

// Кнопка для добавления новых карточек
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', clearNewCardForm);

// Обработка формы
cardFormElement.addEventListener('submit', handleCardFormSubmit);



// Валидация формы
function showError(popupElement, popupInput, errorMessage) {
  const popupError = popupElement.querySelector(`.${popupInput.id}-error`);

  popupInput.classList.add('popup__input_type_error');
  popupError.textContent = errorMessage;
  popupError.classList.add('popup__input-error_active');
};

function hideError(popupElement, popupInput) {
  const popupError = popupElement.querySelector(`.${popupInput.id}-error`);

  popupInput.classList.remove('popup__input_type_error');
  popupError.classList.remove('popup__input-error_active');
  popupError.textContent = '';
};

function checkInputValidity(popupElement, popupInput) {
  if (!popupInput.validity.valid) {
    showError(popupElement, popupInput, popupInput.validationMessage);
  } else {
    hideError(popupElement, popupInput);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(popupInputs, buttonElement) {
  if (hasInvalidInput(popupInputs)) {
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
  }
}

function setEventListeners(popupElement) {
  const popupInputs = Array.from(popupElement.querySelectorAll('.popup__input'));

  const buttonElement = popupElement.querySelector('.popup__button');
  toggleButtonState(popupInputs, buttonElement);

  popupInputs.forEach((popupInput) => {
    popupInput.addEventListener('input', (evt) => {
      const input = evt.target;
      checkInputValidity(popupElement, input);
      toggleButtonState(popupInputs, buttonElement);
    });
  });
}

setEventListeners(profilePopup);
setEventListeners(cardPopup);

