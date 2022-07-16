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
               setCookie("accessToken", res.accessToken.split("Bearer ")[1], { expires: 600000 })
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