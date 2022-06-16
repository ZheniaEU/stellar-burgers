const initialStateDnd = {
   items: [],
}

export const ADD_ITEM = "ADD_ITEM"
export const DELETE_ITEM = "DELETE_ITEM"
export const RESET_ITEMS = "RESET_ITEMS"


export const dndReducer = (state = initialStateDnd, action) => {
   switch (action.type) {
      case "ADD_ITEM": {
         console.log(action.data)
         return {
            ...state,
            items: [...state.items, action.data]

         }
      }
      case "DELETE_ITEM": {
         return {
            ...state,
         }
      }
      case "RESET_ITEMS": {
         return {
            ...state,
            items: []
         }
      }
      default:
         return state
   }
}