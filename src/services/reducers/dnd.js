const initialStateDnd = {
   bun:[],
   fillings: []

}

export const ADD_BUN = "ADD_BUN"
export const ADD_FILLINGS = "ADD_FILLINGS"
export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM"
export const DELETE_ITEM = "DELETE_ITEM"
export const RESET_ITEMS = "RESET_ITEMS"


export const dndReducer = (state = initialStateDnd, action) => {
   switch (action.type) {
      case ADD_FILLINGS: {
         return {
            ...state,
            fillings: [...state.fillings, action.data],
         }
      }
      case ADD_BUN: {
         return {
            ...state,
            bun: action.data
         }
      }

      case DELETE_ITEM: {
         return {
            ...state,
         }
      }
      case RESET_ITEMS: {
         return {
            ...state,
            fillings: [],
            bun: []
         }
      }
      default:
         return state
   }
}