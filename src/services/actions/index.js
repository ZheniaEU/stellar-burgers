import { getIngredients } from "../../utils/api"

/**Экшены для ингредиентов */
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST"
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS"
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED"

/**Экшены для ордеров */
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST"
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS"
export const DELETE_ORDER = "DELETE_ORDER"

/**Экшены для dnd */
export const ADD_BUN = "ADD_BUN"
export const ADD_FILLINGS = "ADD_FILLINGS"
export const DELETE_ITEM = "DELETE_ITEM"
export const RESET_ITEMS = "RESET_ITEMS"
export const MOVE_CONSTRUCTOR_ITEM = "MOVE_CONSTRUCTOR_ITEM"

export const getData = () => {
   return (dispatch) => {
      dispatch(getIngredientsRequest())
      getIngredients()
         .then(res => {
            if (res.success) {
               dispatch(getIngredientsSuccess(res.data))
            } else {
               dispatch(getIngredientsFailed())
            }
         })
         .catch(res => {
            dispatch(getIngredientsFailed())
            console.log(`Обнаружено жжение в нижней части таза ${res}`)
         })
   }
}

const getIngredientsRequest = () => {
   return {
      type: GET_INGREDIENTS_REQUEST
   }
}

const getIngredientsSuccess = (data) => {
   return {
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: data
   }
}

const getIngredientsFailed = () => {
   return {
      type: GET_INGREDIENTS_FAILED
   }
}