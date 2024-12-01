const cardTemplate = document.querySelector('#card-template');

function toggleLike(button) {
  button.classList.toggle('card__like-button_is-active');
}

function hideDeleteButton(button) {
  button.classList.add('card__delete-button_is-invisible');
}

function changeCountLikes(cardHTML, count) {
  const cardCountLikes = cardHTML.querySelector('.card__like-count');
  cardCountLikes.textContent = count;
}

function createCard(card = {}) {
  const cardElement = cardTemplate.content.cloneNode(true);
  
  const rootCardElement = cardElement.querySelector('.card');
  rootCardElement.setAttribute('id', card._id);

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = card.name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  changeCountLikes(cardElement, card.likes.length);

  return cardElement;
}

export { createCard, toggleLike, hideDeleteButton, changeCountLikes }