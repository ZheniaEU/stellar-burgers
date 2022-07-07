const API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
   return res.ok ? res.json() : res.json().then((err) =>
      Promise.reject(`Папаша у нас проблемы на сервере : ${err}`))
}

export const getIngredients = async () => {
   return await fetch(`${API_URL}/ingredients`)
      .then(res => checkResponse(res))
}

//получение ингридиентов
export const onDemandOrder = async (massId) => {
   return await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         ingredients: massId
      })
   })

      .then(res => checkResponse(res))
}

//pages forgot-password
export const forgotenPassword = async (email) => {
   return await fetch(`${API_URL}/password-reset`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         email: email
      })
   })
      .then(res => checkResponse(res))
}

// На экране /reset-password пользователь вводит новый пароль и код из почты,
//  а после нажимает кнопку «Сохранить». После этого происходит POST-запрос
//   к эндпоинту https://norma.nomoreparties.space/api/password-reset/reset.

// Тело запроса:
// {
//    "password": "",
//       "token": ""
// }

//pages reset-password
export const resetPassword = async (password, token) => {
   return await fetch(`${API_URL}/password-reset/reset`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         password: password,
         token: token
      })
   })
}

/**создание юзера */

// Для реализации этой функциональности потребуется создать пользователя.
//  Вы можете сделать это, отправив POST - запрос к эндпоинту:
// https://norma.nomoreparties.space/api/auth/register. Пример тела запроса:

// {
//    "email": "test-data@yandex.ru",
//       "password": "password",
//          "name": "Username"
// }


//register
export const createUser = async (email, password, Username) => {
   return await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         email: email,
         password: password,
         name: Username
      })
   })
}