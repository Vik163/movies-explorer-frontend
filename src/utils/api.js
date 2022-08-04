class Api {
  constructor(settings) {
    this._settings = settings;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      headers: {
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
      headers: {
        // authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      // credentials: 'include',
    }).then(this._checkResponse);
  }

  // addCard(formValues) {
  //   return fetch(`${this._settings.baseUrl}/cards`, {
  //     method: "POST",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //       "Content-Type": "application/json",
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       name: formValues.name,
  //       link: formValues.link,
  //     }),
  //   }).then(this._checkResponse);
  // }

  // deleteCard(obj) {
  //   return fetch(`${this._settings.baseUrl}/cards/${obj._id}`, {
  //     method: "DELETE",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //     },
  //     credentials: 'include',
  //   }).then(this._checkResponse);
  // }

  sendInfoProfile(formValues) {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        name: formValues.name,
        email: formValues.email,
      }),
    }).then(this._checkResponse);
  }

  // addAvatar(formValues) {
  //   return fetch(`${this._settings.baseUrl}/users/me/avatar`, {
  //     method: "PATCH",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //       "Content-Type": "application/json",
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       avatar: formValues.avatar,
  //     }),
  //   }).then(this._checkResponse);
  // }

  // addLikes(obj) {
  //   return fetch(`${this._settings.baseUrl}/cards/${obj._id}/likes`, {
  //     method: "PUT",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //       "Content-Type": "application/json",
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       likes: obj.likes,
  //     }),
  //   }).then(this._checkResponse);
  // }

  // deleteLike(obj) {
  //   return fetch(`${this._settings.baseUrl}/cards/${obj._id}/likes`, {
  //     method: "DELETE",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //     },
  //     credentials: 'include',
  //   }).then(this._checkResponse);
  // }
}

const baseUrl = `${window.location.protocol}${
  process.env.REACT_APP_API_URL || '//localhost:3001'
}`;

export const api = new Api({
  baseUrl: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
