const initialStateOrder = {
   order: null,
   price: 8600

   
}

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST"
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS"
export const GET_ORDER_FAILED = "GET_ORDER_FAILED"


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
      case "GET_ORDER_FAILED": {
         return {
            ...state,

         }
      }


      default:
         return state
   }
}