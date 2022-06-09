import { getIngredients } from "../../utils/api"
import {
   GET_INGREDIENTS_ITEMS_REQUEST,
   GET_INGREDIENTS_SUCCESS,
   GET_INGREDIENTS_ITEMS_FAILED
} from "../reducers/index"

export function getDatar() {
   return function (dispatch) {
      dispatch({
         type: GET_INGREDIENTS_ITEMS_REQUEST
      })
      getIngredients().then(res => {
         if (res && res.success) {
            dispatch({
               type: GET_INGREDIENTS_SUCCESS,
               data: res.data
            })
         } else {
            dispatch({
               type: GET_INGREDIENTS_ITEMS_FAILED
            })
         }
      })
   }
}
