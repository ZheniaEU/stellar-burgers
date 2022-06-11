const initialStateOrder = {
   order: [8600],
   orderId: 2222,
   price: 8600
}

export const orderReducer = (state = initialStateOrder, action) => {
   switch (action.type) {
      case "ORDER": {
         return {

         }
      }


      default:
         return state
   }
}