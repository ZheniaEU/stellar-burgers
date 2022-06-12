const initialStateOrder = {
   order: 2222,
   price: 8600
}

export const orderReducer = (state = initialStateOrder, action) => {
   switch (action.type) {
      case "ORDER": {
         return {
            ...state,

         }
      }


      default:
         return state
   }
}