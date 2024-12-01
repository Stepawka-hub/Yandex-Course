function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');       
    closeModal(openedPopup);      
  } 
}

function setTextPopupButton(popup, text) {
  const button = popup.querySelector('.popup__button');
  button.textContent = text;
}

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

export { openModal, closeModal, setTextPopupButton }