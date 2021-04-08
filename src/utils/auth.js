    export const register = ( email, password ) => {
        return fetch(`https://auth.nomoreparties.co/signup`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
              },
            body: JSON.stringify({ email, password })
        }).then(res => {
          if (!res.ok ) {
            return Promise.reject(console.log(`Ой, что-то пошло не так. Ошибка ${res.status}`))
        } else {
          console.log(res)
          return res.json();
        }
      });
    }

    export const authorize = ( email, password ) => {
    return fetch(`https://auth.nomoreparties.co/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => {
        if (!res.ok ) {
          return Promise.reject(console.log(`Ой, что-то пошло не так. Ошибка ${res.status}`))
      } else {
        console.log(res)
        return res.json();
      }
    })
    .then((data) => {
        if (data) {
          localStorage.setItem('token', data.token);
          return data;
        } else {
          return;
        }
      })
      .catch(err => console.log(err))
    };

  export const checkToken = (token) => {
    return fetch(`https://auth.nomoreparties.co/users/me`, {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
};