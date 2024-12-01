const config = {
  baseURL: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: 'b8c17556-020c-4f8e-8863-faddcefbe338',
    'Content-Type': 'application/json'
  }
}

const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибк при получении карточек: ${response.status}`);
      }

      return response.json();
    });
}

const addNewCard = (name, link) => {
  return fetch('https://nomoreparties.co/v1/frontend-st-cohort-201/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`Ошибка при создании карточки: ${response.status}`);
      }

      return response.json();
    })
}

const getProfile = () => {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`Ошибка при получении данных профиля: ${response.status}`);
      }

      return response.json();
    })
}

const updateProfile = (name, about) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(`Ошибка при обновлении профиля: ${response.status}`);
      }

      return response.json();
    })
}

export { getInitialCards, getProfile, updateProfile, addNewCard }