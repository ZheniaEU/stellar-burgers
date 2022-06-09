import { getIngredients } from "../../utils/api"
import {
   GET_INGREDIENTS_ITEMS_REQUEST,
   GET_INGREDIENTS_SUCCESS,
   GET_INGREDIENTS_ITEMS_FAILED
} from "../reducers/index"

export function getData() {
   return function (dispatch) {
      dispatch({
         type: GET_INGREDIENTS_ITEMS_REQUEST
      })
      getIngredients().then(res => {
         if (res && res.success) {
            console.log(res)
            dispatch({
               type: GET_INGREDIENTS_SUCCESS,
               items: res.data
            })
         } else {
            dispatch({
               type: GET_INGREDIENTS_ITEMS_FAILED
            })
         }
      })
   }
}
