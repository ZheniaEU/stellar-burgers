// import {
//    WS_CONNECTION_INIT,
//    WS_CONNECTION_OPEN,
//    WS_GET_MESSAGE,
//    WS_SEND_MESSAGE,
//    WS_CONNECTION_CLOSED,
//    WS_CONNECTION_ERROR
// } from "../actions/wsActionTypes"


export const WS_CONNECTION_INIT = "WS_CONNECTION_INIT"
export const WS_CONNECTION_OPEN = "WS_CONNECTION_OPEN"
export const WS_GET_MESSAGE = "WS_GET_MESSAGE"
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED"
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR"

//жёванный цирк переменных
export const wsAction = {
   wsInit: WS_CONNECTION_INIT,
   onOpen: WS_CONNECTION_OPEN,
   onMessage: WS_GET_MESSAGE,
   onClose: WS_CONNECTION_CLOSED,
   onError: WS_CONNECTION_ERROR
}

const initialState = {
   wsConnected: false,
   orders: null, //[]
   total: null, // number
   totalToday: null, //number
}

export const wsReducer = (state = initialState, action) => {
   switch (action.type) {
      case WS_CONNECTION_OPEN:
         return {
            ...state,
            wsConnected: true
         }
      case WS_CONNECTION_ERROR:
         return {
            ...state,
            error: action.payload,
            wsConnected: false
         }
      case WS_CONNECTION_CLOSED:
         return {
            ...state,
            wsConnected: false
         }
      case WS_GET_MESSAGE:
         return {
            ...state,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday
         };
      default:
         return state
   }
};