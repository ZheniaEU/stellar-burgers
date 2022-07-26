import { setCookie, getCookie, deleteCookie } from "../../utils/cookie"
import { login, logout, getUser, refreshToken, updateUser, forgottenPassword } from "../../utils/api"

export const LOGIN_USER = "LOGIN_USER"
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR"
export const LOGOUT_USER = "LOGOUT_USER"
export const UPDATE_USER = "UPDATE_USER"
export const REDIRECT_FROM_FORGOT_PASSWORD = "REDIRECT_FROM_FORGOT_PASSWORD"
export const PROTECTE_RESET_PASSWORD = "PROTECTE_RESET_PASSWORD"

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
         .catch(res => {
            dispatch(loginFailed())
            console.log(`Ошибка при вводе логина ${res}`)
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
         .catch(res => {
            console.log(`Что-то пошло не поплану, нужно повторить действие ${res}`)
         })
   }
}

//аутентификация юзера при посещении сайта или при перезагрузки его
export const аuthenticationUser = () => {
   return async (dispatch) => {
      console.log(getCookie("accessToken"))
      if (getCookie("accessToken") === undefined) {
         return
      }

      //     console.log(getCookie("accessToken"))
      try {
         await getUserInfo(dispatch)
      }
      catch (res) {
         if (res.res.message === "jwt expired") {
            //         if (res.res.message === "invalid token") {
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
         .catch(res => {
            console.log(`Ошибка редактировании информации пользователя ${res}`)
         })
   }
}

export const forgottenPasswordUser = (email) => {
   return (dispatch) => {
      forgottenPassword(email)
         .then(res => {
            if (res.success) {
               dispatch(redirectFromForgottenPassword())
            }
         })
   }
}

const redirectFromForgottenPassword = () => {
   return {
      type: REDIRECT_FROM_FORGOT_PASSWORD
   }
}

export const protectResetPassword = () => {
   return {
      type: PROTECTE_RESET_PASSWORD
   }
}