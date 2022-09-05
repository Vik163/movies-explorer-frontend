class MoviesApi {
  constructor(settings) {
    this._settings = settings;
  }

  // Проверка получения ответа --------------
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Ошибка: ${res.statusText}`);
    }
  }

  getCards() {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
      headers: { 'Content-Type': 'application/json' },
    }).then(this._checkResponse);
  }
}

export const moviesApi = new MoviesApi();
