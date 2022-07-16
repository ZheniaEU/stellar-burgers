/* eslint-disable */
import { getCookie, setCookie, deleteCookie } from "./cookie"

const API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
   return res.ok ? res.json() : res.json().then((err) =>
      Promise.reject(`У нас проблемы с ответом или я накосячил где-то в логике : ${err}`))
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
         email,
      })
   })
      .then(res => checkResponse(res))
}

//pages reset-password
export const resetPassword = async (password, token) => {
   return await fetch(`${API_URL}/password-reset/reset`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         password,
         token,
      })
   })
}

//register -работает
export const createUser = async (name, email, password) => {
   return await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         email,
         password,
         name
      })
   })
}

export const login = async (email, password) => {
   return await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         email,
         password,
      })
   })
      .then(res => checkResponse(res))
}

export const logout = async (refreshToken) => {
   return await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         token: refreshToken
      })
   })
      .then(res => checkResponse(res))
}


//Если токен просрочился и данные о пользователе нельзя получить или обновить,
// то используйте маршрут /auth/token и отправляйте
// на него второй токен — refreshToken для получения нового accessToken
//? ну и что мне с ним делать?
export const refreshToken = async (refreshToken) => {
   return await fetch(`${API_URL}/auth/token`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         token: refreshToken
      })
   })
      .then(res => checkResponse(res))
}


//GET`${API_URL}/auth/user` - эндпоинт получения данных о пользователе.
export const getUser = async (accessToken) => {
   return await fetch(`${API_URL}/auth/user`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + accessToken
      }
   })
      .then(res => checkResponse(res))
}