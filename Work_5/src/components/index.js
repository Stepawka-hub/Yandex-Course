import '../pages/index.css';

import { enableValidation, validateFormFields } from './validate.js';
import { createCard } from './card.js';
import { openModal, closeModal } from './modal.js';



// Добавляем обработчики и стили для popup`ов
// Добавляем обработчики и стили для popup`ов
const popups = document.querySelectorAll('.popup');

function addCloseButtonListener(popup) {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popup));
}

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  addCloseButtonListener(popup);

  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});



// Включаем валидацию форм
// Включаем валидацию форм
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

enableValidation(validationSettings);



// Обработчик клика по изображению карточки
// Обработчик клика по изображению карточки
const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');

function handleCardImageClick(title, link) {
  image.src = link;
  image.alt = title;
  caption.textContent = title;

  openModal(imagePopup);
}



// Отрисовываем карточки
// Отрисовываем карточки
const placesList = document.querySelector('.places__list');
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

function renderCards(cards) {
  cards.forEach((element) => {
    const card = createCard(element.name, element.link);

    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', () => handleCardImageClick(element.name, element.link));

    placesList.appendChild(card);
  });
}

renderCards(initialCards);


// Настраиваем попап (и подтверждение формы) для редактирования профиля
// Настраиваем попап (и подтверждение формы) для редактирования профиля
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const editButton = document.querySelector('.profile__edit-button');

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  validateFormFields(profileFormElement, validationSettings);

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

editButton.addEventListener('click', fillProfileForm);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);



// Добавление новых карточек
// Добавление новых карточек
const cardPopup = document.querySelector('.popup_type_new-card');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');
const addButton = document.querySelector('.profile__add-button');

function clearNewCardForm() {
  cardNameInput.value = '';
  cardLinkInput.value = '';

  validateFormFields(cardFormElement, validationSettings);

  openModal(cardPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardNameValue = cardNameInput.value;
  const cardLinkValue = cardLinkInput.value;

  const card = createCard(cardNameValue, cardLinkValue);
  
  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click', () => handleCardImageClick(cardNameValue, cardLinkValue));

  placesList.insertBefore(card, placesList.firstChild);

  closeModal(cardPopup);
}

addButton.addEventListener('click', clearNewCardForm);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

