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

//register -работает
export const createUser = async (userName, email, password) => {
   return await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         email: email,
         password: password,
         name: userName
      })
   })
}

// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.





// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.

// Формат тела запроса для выхода из системы:
// {
//    "token": "{{refreshToken}}"
// }

// Для выхода из системы или обновления токена используется именно refreshToken,
//  который можно получить после успешной регистрации или авторизации.

//!это набросок
export const logout = async ({ refreshToken }) => {
   return await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         token: { refreshToken }
      })
   })
}

// Куки
// Чтобы пользователю не требовалось повторно проходить авторизацию при каждом заходе в приложение,
// реализуйте механизм хранения и удаления токена в куках.Информация о токене возвращается
// сервером при прохождении процесса регистрации, авторизации и обновления токена.
// Для операций с пользователем(обновление токена, выход из системы) используется refreshToken.
// Храните его в local storage или session storage, или куках.
// Для работы с данными о пользователе используется token.Про это поговорим в следующем пункте.