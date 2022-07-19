import { LOGIN_USER, LOGIN_USER_ERROR, LOGOUT_USER, UPDATE_USER } from "../actions/auth"

const initialStateAuth = {
   user: {
      userName: "",
      userEmail: ""
   },
   isAuth: false
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
      default:
         return state
   }
}