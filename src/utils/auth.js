class Auth {
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

  registration(name, password, email) {
    return fetch(`${this._settings.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  authorization(password, email) {
    return fetch(`${this._settings.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  checkToken(jwt) {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: jwt,
      },
    }).then(this._checkResponse);
  }
}

const baseUrl = `${window.location.protocol}${
  process.env.REACT_APP_API_URL || '//localhost:3001'
}`;
export const auth = new Auth({
  baseUrl: baseUrl,
});
