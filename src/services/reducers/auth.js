import {
   LOGIN_USER, LOGIN_USER_ERROR, LOGOUT_USER, UPDATE_USER,
   REDIRECT_FROM_FORGOT_PASSWORD, PROTECTE_RESET_PASSWORD
} from "../actions/auth"

const initialStateAuth = {
   user: {
      userName: "",
      userEmail: ""
   },
   isAuth: false,
   isRedirect: false
}

export const authReducer = (state = initialStateAuth, action) => {
   switch (action.type) {

      case LOGIN_USER: {
         return {
            ...state,
            user: {
               userName: action.user.name,
               userEmail: action.user.email
            },
            isAuth: true
         }
      }
      case LOGIN_USER_ERROR: {
         return {
            ...state,
            isAuth: false
         }
      }
      case LOGOUT_USER: {
         return {
            ...state,
            user: {
               userName: "",
               userEmail: ""
            },
            isAuth: false
         }
      }
      case UPDATE_USER: {
         return {
            ...state,
            user: {
               userName: action.user.name,
               userEmail: action.user.email
            },
            isAuth: true
         }
      }
      case REDIRECT_FROM_FORGOT_PASSWORD: {
         return {
            ...state,
            isRedirect: true
         }
      }
      case PROTECTE_RESET_PASSWORD: {
         return {
            ...state,
            isRedirect: false
         }
      }
      default:
         return state
   }
}