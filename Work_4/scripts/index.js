// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => popup.classList.add('popup_is-animated'));
renderCards();

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');

function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

function addCloseButtonListener(popup) {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popup));
}

// Добавление слушателя для закрытия модального окна
addCloseButtonListener(profilePopup);
addCloseButtonListener(cardPopup);
addCloseButtonListener(imagePopup);



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

