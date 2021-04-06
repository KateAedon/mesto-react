export class Auth {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    _handleResponse(res) {
        if (!res.ok ) {
            return Promise.reject(console.log(`Ой, что-то пошло не так. Ошибка ${res.status}`));
        }
        return res.json();
    }

    register = ( email, password ) => {
        return fetch(`https://auth.nomoreparties.co/signup`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
              },
            body: JSON.stringify({ email, password })
        }).then(this._handleResponse)
    }


    authorize = ( email, password ) => {
    return fetch(`https://auth.nomoreparties.co/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(this._handleResponse)
    .then((data) => {
        if (data) {
          localStorage.setItem('token', data.token);
          return data;
        }else {
          return;
        }
      })
      .catch(err => console.log(err))
  }

  checkToken = (token) => {
    return fetch(`https://auth.nomoreparties.co/users/me`, {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
    })
    .then(this._handleResponse)
  }
}

const auth = new Auth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Content-type': 'application/json'
    }
})

export default auth;