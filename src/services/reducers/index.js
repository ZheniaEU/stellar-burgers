import { combineReducers } from "redux"
import { orderReducer } from "./order"

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST"
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS"
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED"

const initialState = {
   ingredients: [],
   ingredientsRequest: false,
   ingredientsFailed: false,
}

const ingredientsReducer = (state = initialState, action) => {
   switch (action.type) {
      case "GET_INGREDIENTS_REQUEST": {
         return {
            ...state,
            ingredientsRequest: true,
            ingredientsFailed: false
         }
      }
      case "GET_INGREDIENTS_SUCCESS": {
         return {
            ...state,
            ingredientsRequest: false,
            ingredientsFailed: false,
            ingredients: action.ingredients
         }
      }
      case "GET_INGREDIENTS_FAILED": {
         return {
            ...state,
            ingredientsRequest: true
         }
      }

      default:
         return state
   }
}


export const rootReducer = combineReducers({
   ingredients: ingredientsReducer,
   order: orderReducer,
   //  dnd: dndReducer
})