export const baseUrl = 'https://api.doubleempty.nomoreparties.sbs';

const responseCheck = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));

export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(responseCheck)
  };


export const authorize = ( email, password ) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(responseCheck)
};

export const getContent = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(responseCheck)
};