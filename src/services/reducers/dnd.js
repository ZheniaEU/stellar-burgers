import update from "immutability-helper"

const initialStateDnd = {
   bun: [],
   fillings: []
}

export const ADD_BUN = "ADD_BUN"
export const ADD_FILLINGS = "ADD_FILLINGS"
export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM"
export const DELETE_ITEM = "DELETE_ITEM"
export const RESET_ITEMS = "RESET_ITEMS"
export const MOVE_CONSTRUCTOR_ITEM = "MOVE_CONSTRUCTOR_ITEM"


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
            fillings: [...state.fillings].filter(item => {
               return item.id !== action.id
            })
         }
      }
      case MOVE_CONSTRUCTOR_ITEM: {
         const dragFilling = state.fillings[action.data.dragIndex]
         const fillings = update(state.fillings, {
            $splice: [
               [action.data.dragIndex, 1],
               [action.data.hoverIndex, 0, dragFilling],
            ],
         })
         return {
            ...state,
            fillings
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