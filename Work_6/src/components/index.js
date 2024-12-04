import '../pages/index.css';

import { enableValidation, resetFormFields } from './validate.js';
import { createCard, toggleLike, hideDeleteButton, changeCountLikes } from './card.js';
import { openModal, closeModal, setTextPopupButton } from './modal.js';
import { 
  getProfile, 
  updateProfile,
  updateAvatar,
  getInitialCards, 
  addNewCard, 
  deleteCard, 
  putLikeOnCard, 
  removeLikeFromCard 
} from './api.js';

let currentUserId;

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


// Отрисовываем карточки
// Отрисовываем карточки
const placesList = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');

function handleCardImageClick(title, link) {
  image.src = link;
  image.alt = title;
  caption.textContent = title;

  openModal(imagePopup);
}

function setDeleteButtonListener(deleteButton) {
  deleteButton.addEventListener('click', (evt) => {
    const card = evt.target.closest('.card');

    deleteCard(card.getAttribute('id')).
      then(() => {
        card.remove();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function hasLike(card) {
  return card.likes.some((like) => like._id === currentUserId)
}

function setLikeButtonListener(likeButton) {
  likeButton.addEventListener('click', (evt) => {
    const cardHTML = evt.target.closest('.card');
    const cardId = cardHTML.getAttribute('id');

    const isLiked = evt.target.classList.contains('card__like-button_is-active');
    const promise = isLiked ? removeLikeFromCard(cardId) : putLikeOnCard(cardId);

    promise
      .then((response) => {
        console.log(response);
        toggleLike(evt.target);
        changeCountLikes(cardHTML, response.likes.length);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

function setCardEventListener(card, cardHTML) {
  const cardImage = cardHTML.querySelector('.card__image');
  cardImage.addEventListener('click', () => handleCardImageClick(card.name, card.link));

  const likeButton = cardHTML.querySelector('.card__like-button');
  if (hasLike(card)) {
    toggleLike(likeButton);
  }
  setLikeButtonListener(likeButton);

  const deleteButton = cardHTML.querySelector('.card__delete-button');
  if (card.owner._id === currentUserId) {
    setDeleteButtonListener(deleteButton);
  } else {
    hideDeleteButton(deleteButton);
  }
}

function renderCards(cards) {
  cards.forEach((card) => {
    const cardHTML = createCard(card);
    setCardEventListener(card, cardHTML);
    placesList.appendChild(cardHTML);
  });
}

// Настраиваем попап (и подтверждение формы) для редактирования профиля
// Настраиваем попап (и подтверждение формы) для редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image')
const editButton = document.querySelector('.profile__edit-button');

const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  resetFormFields(profileFormElement, validationSettings);

  openModal(profilePopup);
}

function setProfileData(name, about, avatar) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileImage.style.backgroundImage = `url(${avatar})`;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  setTextPopupButton(profilePopup, 'Сохранение...');

  updateProfile(nameValue, jobValue)
    .then((response) => {
      setProfileData(response.name, response.about, response.avatar);
      closeModal(profilePopup);
    })
    .catch((error) => {
      console.error(error);
      alert("Произошла ошибка при обновлении профиля");
    })
    .finally(() => {
      setTextPopupButton(profilePopup, 'Сохранить');
    })
}

editButton.addEventListener('click', fillProfileForm);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// Редактирование аватара
// Редактирование аватара
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarFormElement = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarFormElement.querySelector('.popup__input_type_avatar');

function clearNewAvatarForm() {
  avatarInput.value = '';
  resetFormFields(avatarFormElement, validationSettings);
  openModal(avatarPopup);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  setTextPopupButton(avatarPopup, 'Сохранение...');

  updateAvatar(avatarInput.value)
    .then((response) => {
      setProfileData(response.name, response.about, response.avatar);
      closeModal(avatarPopup);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setTextPopupButton(avatarPopup, 'Сохранить');
    })
}

profileImage.addEventListener('click', clearNewAvatarForm);
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);


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

  resetFormFields(cardFormElement, validationSettings);

  openModal(cardPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardNameValue = cardNameInput.value;
  const cardLinkValue = cardLinkInput.value;

  setTextPopupButton(cardPopup, 'Сохранение...');

  addNewCard(cardNameValue, cardLinkValue)
    .then((response) => {
      const cardHTML = createCard(response);
      setCardEventListener(response, cardHTML);
      placesList.insertBefore(cardHTML, placesList.firstChild);
      closeModal(cardPopup);
    })
    .catch((error) => {
      console.error(error);
      alert("Произошла ошибка при добавлении карточки");
    })
    .finally(() => {
      setTextPopupButton(cardPopup, 'Сохранить');
    })
}

addButton.addEventListener('click', clearNewCardForm);
cardFormElement.addEventListener('submit', handleCardFormSubmit);


Promise.all([getProfile(), getInitialCards()])
  .then((response) => {
    const user = response[0];
    const cards = response[1];

    currentUserId = user._id;

    setProfileData(user.name, user.about, user.avatar);
    renderCards(cards);
  })
  .catch((error) => {
    console.error(error);
  });
