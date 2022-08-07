class MainApi {
  constructor(settings) {
    this._settings = settings;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Ошибка: ${res.statusText}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getSaveCards() {
    return fetch(`${this._settings.baseUrl}/movies`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  addCard(card) {
    return fetch(`${this._settings.baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co/${card.image.url}`,
        trailerLink: card.trailerLink,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
        movieId: card.id,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(obj) {
    return fetch(`${this._settings.baseUrl}/movies/${obj._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  sendInfoProfile(formValues) {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: formValues.name,
        email: formValues.email,
      }),
    }).then(this._checkResponse);
  }
}

const baseUrl = `${window.location.protocol}${
  process.env.REACT_APP_API_URL || '//localhost:3001'
}`;

export const mainApi = new MainApi({
  baseUrl: baseUrl,
});
