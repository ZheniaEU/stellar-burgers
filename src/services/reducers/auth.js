export const CREATE_USER = "CREATE_USER"
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "DELETE_USER"
export const GET_NEW_PASSWORD = "GET_NEW_PASSWORD"

const initialStateAuth = {
   user: {
      userName: "",
      userEmail: "",
      userPassword: "",
   },
   token: "",
   refreshToken: "",
   isAuth: false,
   createUserError: false,
   passwordResetError: false,
   sendMailError: false,
   loginError: false
}

export const authReducer = (state = initialStateAuth, action) => {
   switch (action.type) {
      case CREATE_USER: {
         return {
            ...state,
            bun: action.data
         }
      }
      case LOGIN_USER: {
         return {
            ...state,
            bun: action.data
         }
      }
      case LOGOUT_USER: {
         return {
            ...state,
            bun: action.data
         }
      }
      default:
         return state
   }
}