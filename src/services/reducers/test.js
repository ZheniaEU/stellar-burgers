//import { testReducer } from "./test"

import { combineReducers } from "redux"

const initialState = {

}

const testReducer = (state = initialState, action) => {
   switch (action.type) {
      case "ADD_CASH":
         return { ...state, cash: state.cash + action.payload }
      case "GET_CASH":
         return { ...state, cash: state.cash + action.payload }

      default:
         return state
   }
}

export const rootReducer = combineReducers({
   test: testReducer
})