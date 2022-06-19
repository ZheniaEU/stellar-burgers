import update from "immutability-helper"

import {
   ADD_BUN,
   ADD_FILLINGS,
   DELETE_ITEM,
   RESET_ITEMS,
   MOVE_CONSTRUCTOR_ITEM
} from "../actions/index"

const initialStateDnd = {
   bun: [],
   fillings: []
}

export const dndReducer = (state = initialStateDnd, action) => {
   switch (action.type) {
      case ADD_BUN: {
         return {
            ...state,
            bun: action.data
         }
      }
      case ADD_FILLINGS: {
         return {
            ...state,
            fillings: [...state.fillings, action.data],
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