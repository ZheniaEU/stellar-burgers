const initialStateOrder = {
   order: null,
   price: 8600


}

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST"
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS"
export const DELETE_ORDER = "DELETE_ORDER"


export const orderReducer = (state = initialStateOrder, action) => {
   switch (action.type) {
      case "GET_ORDER_REQUEST": {
         return {
            ...state,
            order: null
         }
      }
      case "GET_ORDER_SUCCESS": {
         return {
            ...state,
            order: action.data,
         }
      }
      case "DELETE_ORDER": {
         return {
            ...state,
            order: null
         }
      }
      default:
         return state
   }
}