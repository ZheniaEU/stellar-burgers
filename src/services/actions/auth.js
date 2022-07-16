/* eslint-disable */
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie"
import { login, logout } from "../../utils/api"

import {
   CREATE_USER,
   GET_NEW_PASSWORD
} from "../reducers/auth"

export const LOGIN_USER = "LOGIN_USER"
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR"
export const LOGIN_R = "LOGIN_USER_ERROR"
export const LOGOUT_USER = "LOGOUT_USER"

export const loginUser = (email, password) => {
   return (dispatch) => {
      //dispatch(loginR())
      login(email, password)
         .then(res => {
            if (res.success) {
               setCookie("accessToken", res.accessToken.split("Bearer ")[1])
               setCookie("refreshToken", res.refreshToken)
               dispatch({
                  type: LOGIN_USER,
                  user: res.user
               })
            }
         })
         .catch(err => {
            dispatch(loginFailed())
            console.log(`Ошибка при вводе логина ${err}`)
         })
   }
}

const loginFailed = () => {
   return {
      type: LOGIN_USER_ERROR
   }
}

// const loginR = () => {
//    return {
//       type: LOGIN_R
//    }
// }

export const logoutUser = () => {
   return (dispatch) => {
      logout(getCookie("refreshToken"))
         .then(res => {
            if (res.success) {
               deleteCookie("accessToken")
               deleteCookie("refreshToken")
               dispatch({
                  type: LOGOUT_USER
               })
            }
         })
      // .catch(err => {
      //    dispatch(loginFailed())
      //    console.log(`Ошибка при логауте ${err}`)
      // })
   }
}

//!задание номер 5
const API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
   return res.ok ? res.json() : res.json().then((err) =>
      Promise.reject(`Почему я это вижу? : ${err}`))
}
export const аuthenticationUser = () => {
   return (dispatch) => {
      console.log("1")
      getUser(getCookie("accessToken"))
         .then(res => {
            console.log("2")
            if (res.success) {
               dispatch({
                  type: LOGIN_USER,
                  user: res.user
               })
               reRequestUser(getCookie("refreshToken"))
                  .then(res => {
                     if (res.success) {
                        console.log("5")
                        setCookie("accessToken", res.accessToken.split("Bearer ")[1])
                        setCookie("refreshToken", res.refreshToken)
                     }
                  })

            }
         })
   }
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

//   PATCH`${API_URL}/auth/user` - эндпоинт обновления данных о пользователе.
export const reRequestUser = async (accessToken) => {
   return await fetch(`${API_URL}/auth/user`, {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify({
         token: accessToken
      })
   })
      .then(res => checkResponse(res))
}
