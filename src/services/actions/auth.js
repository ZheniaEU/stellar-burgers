/* eslint-disable */
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie"
import { login, logout, getUser, updateUser } from "../../utils/api"

import {
   CREATE_USER,
   GET_NEW_PASSWORD
} from "../reducers/auth"

export const LOGIN_USER = "LOGIN_USER"
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR"
export const LOGIN_R = "LOGIN_USER_ERROR"
export const LOGOUT_USER = "LOGOUT_USER"
export const UPDATE_USER = "UPDATE_USER"

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

//аутентификация юзера при посещении сайта или при перезагрузки его
export const аuthenticationUser = () => {
   return (dispatch) => {
      if (getCookie("accessToken") !== undefined) {
         getUser(getCookie("accessToken"))
            .then(res => {
               if (res.success) {
                  dispatch({
                     type: LOGIN_USER,
                     user: res.user
                  })
               }
            })
            //!тут дописать зафейлиную авторизацию, может прикрутить рефреш токен
            .catch(err => {
               dispatch(loginFailed())
               console.log(`Ошибка авторизации пользователя ${err}`)
            })
         //вроде по идеи если токен протух его нужно отрефрешить стоит ли его тут рефрешить?
      }
   }
}



export const updateUserInfo = (name, email, password) => {
   return (dispatch) => {
      updateUser(name, email, password, getCookie("accessToken"))
         .then(res => {
            if (res.success) {
               dispatch({
                  type: UPDATE_USER,
                  user: res.user
               })
            }
         })
      //!тут дописать зафейленую смену инфы об юзвере
   }
}