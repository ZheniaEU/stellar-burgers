/* eslint-disable */
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie"
import { login, logout, getUser, refreshToken, updateUser } from "../../utils/api"

export const LOGIN_USER = "LOGIN_USER"
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR"
export const LOGOUT_USER = "LOGOUT_USER"
export const UPDATE_USER = "UPDATE_USER"
export const REFRESH_USER = "REFRESH_USER"

export const loginUser = (email, password) => {
   return (dispatch) => {
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
   }
}

//аутентификация юзера при посещении сайта или при перезагрузки его
export const аuthenticationUser = () => {
   if (getCookie("accessToken") === undefined) {
      return
   }

   return async (dispatch) => {
      try {
         await getUserInfo(dispatch)
      }
      catch (res) {
         if (res.res.message === "jwt expired") {
            await refreshTokenUsert()
            await getUserInfo(dispatch)
         }
      }
   }
}

const getUserInfo = async (dispatch) => {
   const res = await getUser(getCookie("accessToken"))
   if (res.success) {
      dispatch({
         type: LOGIN_USER,
         user: res.user
      })
   }
}

const refreshTokenUsert = async () => {
   const res = await refreshToken(getCookie("refreshToken"))
   if (res.success) {
      setCookie("accessToken", res.accessToken.split("Bearer ")[1])
      setCookie("refreshToken", res.refreshToken)
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
   }
}