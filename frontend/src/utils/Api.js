

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialInfo() {
    return fetch(this._baseUrl + 'users/me/', {
      headers: this._headers
    })
      .then(handleResponse)
  }

  getInitialCards() {
    return fetch(this._baseUrl + 'cards/', {
      headers: this._headers
    })
      .then(handleResponse)
  }

  setAvatarInfo(data) {
    return fetch(this._baseUrl + 'users/me/avatar/', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar })
    })
      .then(handleResponse)
  }

  setUserInfo(data) {
    return fetch(this._baseUrl + 'users/me/', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.about })
    })
      .then(handleResponse)
  }

  setCardInfo(data) {
    return fetch(this._baseUrl + 'cards/', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, link: data.link })
    })
      .then(handleResponse)
  }

  deleteCard(data) {
    return fetch(this._baseUrl + 'cards/' + data, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  likeAdd(data) {
    return fetch(this._baseUrl + 'cards/likes/' + data, {
      method: 'PUT',
      headers: this._headers
    })
      .then(handleResponse)
  }

  likeDel(data) {
    return fetch(this._baseUrl + 'cards/likes/' + data, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(handleResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeAdd(cardId) : this.likeDel(cardId);
  }
  
}

const api = (token) => new Api({
  baseUrl: 'https://api.doubleempty.nomoreparties.sbs/',
  headers: {    
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

export default api;