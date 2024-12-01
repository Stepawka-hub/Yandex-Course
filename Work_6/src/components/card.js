const cardTemplate = document.querySelector('#card-template');

function deleteCard(button) {
  button.closest('.card').remove();
}

function toggleLike(button) {
  button.classList.toggle('card__like-button_is-active')
}

function createCard(name, link, likes = []) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  const cardLikes = cardElement.querySelector('.card__like-count');
  cardLikes.textContent = likes.length;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => toggleLike(evt.target));

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', (evt) => deleteCard(evt.target));

  return cardElement;
}

export { createCard, deleteCard, toggleLike }