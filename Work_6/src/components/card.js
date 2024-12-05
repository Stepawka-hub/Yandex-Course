import { deleteCard, putLikeOnCard, removeLikeFromCard } from './api.js';

const cardTemplate = document.querySelector('#card-template');

const cardSettings = {
  cardSelector: '.card',
  titleSelector: '.card__title',
  imageSelector: '.card__image',
  likeBtnSelector: '.card__like-button',
  likeCountSelector: '.card__like-count',
  deleteBtnSelector: '.card__delete-button',
  likeBtnActiveSelector: 'card__like-button_is-active'
}

function handleDeleteCard(evt) {
  const card = evt.target.closest(cardSettings.cardSelector);

  deleteCard(card.getAttribute('id')).
    then(() => {
      card.remove();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleLikeCard(evt) {
  const card = evt.target.closest(cardSettings.cardSelector);
  const cardId = card.getAttribute('id');

  const isLiked = evt.target.classList.contains(cardSettings.likeBtnActiveSelector);
  const promise = isLiked ? removeLikeFromCard(cardId) : putLikeOnCard(cardId);

  promise
    .then((response) => {
      toggleLike(evt.target);
      changeCountLikes(card, response.likes.length);
    })
    .catch((error) => {
      console.error(error);
    });
}

function toggleLike(button) {
  button.classList.toggle(cardSettings.likeBtnActiveSelector);
}

function changeCountLikes(cardHTML, count) {
  const cardCountLikes = cardHTML.querySelector(cardSettings.likeCountSelector);
  cardCountLikes.textContent = count;
}

function hasLike(currentUserId, card) {
  return card.likes.some((like) => like._id === currentUserId);
}

function createCard(currentUserId, card, handleDeleteCard, handleLikeCard, handleCardImageClick) {
  const cardElement = cardTemplate.content.cloneNode(true);
  
  const rootCardElement = cardElement.querySelector(cardSettings.cardSelector);
  rootCardElement.setAttribute('id', card._id);

  const cardTitle = cardElement.querySelector(cardSettings.titleSelector);
  cardTitle.textContent = card.name;

  const cardImage = cardElement.querySelector(cardSettings.imageSelector);
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', () => handleCardImageClick(card.name, card.link));

  const likeButton = cardElement.querySelector(cardSettings.likeBtnSelector);
  if (hasLike(currentUserId, card)) {
    toggleLike(likeButton);
  }

  likeButton.addEventListener('click', handleLikeCard);

  console.log(card.owner._id, currentUserId);

  const deleteButton = cardElement.querySelector(cardSettings.deleteBtnSelector);
  if (card.owner._id === currentUserId) {
    deleteButton.addEventListener('click', handleDeleteCard);
  } else {
    deleteButton.hidden = true;
  }

  changeCountLikes(cardElement, card.likes.length);

  return cardElement;
}

export { createCard, handleDeleteCard, handleLikeCard }