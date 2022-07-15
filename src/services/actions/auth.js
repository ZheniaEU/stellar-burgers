/* eslint-disable */
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie"
import { login } from "../../utils/api"

import {
   CREATE_USER,
   LOGOUT_USER,
   GET_NEW_PASSWORD
} from "../reducers/auth"

export const LOGIN_USER = "LOGIN_USER"
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR"
export const LOGIN_R = "LOGIN_USER_ERROR"

//!реализовать редирект при логине на главную
//!реальзовать разлогин
//!расчухать почему не чистится useState

export const loginUser = (email, password) => {
   return (dispatch) => {
      //dispatch(loginR())
      login(email, password)
         .then(res => {
            if (res.success) {
               setCookie("accessToken", res.accessToken)
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
