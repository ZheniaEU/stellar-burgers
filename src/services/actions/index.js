import { getIngredients } from "../../utils/api"
import {
   GET_INGREDIENTS_REQUEST,
   GET_INGREDIENTS_SUCCESS,
   GET_INGREDIENTS_FAILED
} from "../reducers/index"

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
         .catch(err => {
            dispatch(getIngredientsFailed())
            console.log(`Обнаружено жжение в нижней части таза ${err}`)
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