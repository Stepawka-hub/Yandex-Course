const config = {
  baseURL: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: 'b8c17556-020c-4f8e-8863-faddcefbe338',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (response, errorMessage) => {
  if (!response.ok) {
    return Promise.reject(`${errorMessage}: ${response.status}`);
  }

  return response.json();
}

const getProfile = () => {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers
  })
    .then((response) => 
      handleResponse(response, "Ошибка при получении данных профиля"));
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
    .then((response) => 
      handleResponse(response, "Ошибка при обновлении профиля"));
}

const updateAvatar = (avatar) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
    .then((response) => 
      handleResponse(response, "Ошибка при обновлении аватара"));
}

const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers
  })
  .then((response) => 
    handleResponse(response, "Ошибка при получении карточек"));
}

const addNewCard = (name, link) => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
    .then((response) => 
      handleResponse(response, "Ошибка при создании карточки"));
}

const deleteCard = (_id) => {
  return fetch(`${config.baseURL}/cards/${_id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((response) => 
      handleResponse(response, "Ошибка при удалении карточки"));
}

const putLikeOnCard = (_id) => {
  return fetch(`${config.baseURL}/cards/likes/${_id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((response) => 
    handleResponse(response, "Ошибка при постановке лайка"));
}

const removeLikeFromCard = (_id) => {
  return fetch(`${config.baseURL}/cards/likes/${_id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((response) => 
    handleResponse(response, "Ошибка при удалении лайка"));
}

export 
  { 
    getProfile,
    updateProfile,
    updateAvatar,
    getInitialCards, 
    addNewCard, 
    deleteCard,
    putLikeOnCard,
    removeLikeFromCard
  }