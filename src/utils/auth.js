class Auth {
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

  registration(name, password, email) {
    return fetch(`${this._settings.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
      credentials: 'include',
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  checkToken() {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }

  signOut() {
    return fetch(`${this._settings.baseUrl}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._checkResponse);
  }
}

const baseUrl = `${process.env.REACT_APP_API_URL || '//localhost:3001'}`;
export const auth = new Auth({
  baseUrl: baseUrl,
});
