class MoviesApi {
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

  searchCards() {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
      headers: {},
      // credentials: 'include',
    }).then(this._checkResponse);
  }
}

export const moviesApi = new MoviesApi({
  headers: {
    'Content-Type': 'application/json',
  },
});
