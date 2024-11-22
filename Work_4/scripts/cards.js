const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

const imagePopup = document.querySelector('.popup_type_image');
const image = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');

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

function deleteCard(button) {
  button.closest('.card').remove();
}

function toggleLike(button) {
  button.classList.toggle('card__like-button_is-active')
}

function handleCardImageClick(title, link) {
  image.src = link;
  image.alt = title;
  caption.textContent = title;

  openModal(imagePopup);
}

function createCard(name, link) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.addEventListener('click', () => handleCardImageClick(name, link));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => toggleLike(evt.target));

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', (evt) => deleteCard(evt.target));

  return cardElement;
}

function renderCards() {
  initialCards.forEach((element) => {
    const card = createCard(element.name, element.link);
    placesList.appendChild(card);
  });
}

renderCards();