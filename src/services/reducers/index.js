import { combineReducers } from "redux"
import { orderReducer } from "./order"
import { dndReducer } from "./dnd"
import { authReducer } from "./auth"
import { wsReducer } from "./ws"


import {
   GET_INGREDIENTS_REQUEST,
   GET_INGREDIENTS_SUCCESS,
   GET_INGREDIENTS_FAILED
} from "../actions/index"

const initialState = {
   ingredients: [],
   ingredientsRequest: false,
   isLoading: false
}

const ingredientsReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_INGREDIENTS_REQUEST: {
         return {
            ...state,
            ingredientsRequest: true,
            ingredientsFailed: false,
            isLoading: true
         }
      }
      case GET_INGREDIENTS_SUCCESS: {
         return {
            ...state,
            ingredientsRequest: false,
            isLoading: false,
            ingredients: action.ingredients
         }
      }
      case GET_INGREDIENTS_FAILED: {
         return {
            ...state,
            ingredientsRequest: true,
            isLoading: false,
         }
      }

      default:
         return state
   }
}


export const rootReducer = combineReducers({
   ingredients: ingredientsReducer,
   order: orderReducer,
   dnd: dndReducer,
   auth: authReducer,
   ws: wsReducer
})
