import { LOGIN_USER, LOGIN_USER_ERROR, LOGIN_R } from "../actions/auth"

export const CREATE_USER = "CREATE_USER"
export const LOGOUT_USER = "DELETE_USER"
export const GET_NEW_PASSWORD = "GET_NEW_PASSWORD"

const initialStateAuth = {
   user: {
      userName: "",
      userEmail: ""
   },
   isAuth: false,
   createUserError: false,
   passwordResetError: false,
   emailError: false,
   loginError: false
}

export const authReducer = (state = initialStateAuth, action) => {
   switch (action.type) {

      //? хм нам нужен экшен на крейт юзер? мне кажется мне
      //? нужен только редирект на главную
      case CREATE_USER: {
         return {
            ...state,
            bun: action.data
         }
      }
      case LOGIN_USER: {
         return {
            ...state,
            user: {
               userName: action.user.name,
               userEmail: action.user.email
            },
            isAuth: true
         }
      } case LOGIN_USER_ERROR: {
         return {
            ...state,
            isAuth: false
         }
      }
      case LOGOUT_USER: {
         return {
            ...state,
            bun: action.data
         }
      }
      case LOGIN_R: {
         return {
            ...state,
            isAuth: false
         }
      }
      default:
         return state
   }
}