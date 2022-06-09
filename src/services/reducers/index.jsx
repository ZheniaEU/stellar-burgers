import { combineReducers } from "redux"


export const GET_INGREDIENTS_ITEMS_REQUEST = "GET_INGREDIENTS_REQUEST"
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS"
export const GET_INGREDIENTS_ITEMS_FAILED = "GET_INGREDIENTS_FAILED"


const initialState = {
   ingredients: [],
   ingredientsRequest: false,
   ingredientsFailed: false,
}

const testReducer = (state = initialState, action) => {
   switch (action.type) {
      case "GET_INGREDIENTS_ITEMS_REQUEST": {
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
            ingredientsFailed: false
         }
      }
      case "GET_INGREDIENTS_ITEMS_FAILED": {
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
   test: testReducer
})

//export const state = createStore(rootReducer, applyMiddleware(thunk, logger))