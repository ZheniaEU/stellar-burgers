/*eslint-disable*/
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
// export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE"
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED"
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR"

//жёванный цирк переменных
export const wsAction = {
   wsInit: WS_CONNECTION_INIT,
   onOpen: WS_CONNECTION_OPEN,
   onMessage: WS_GET_MESSAGE,
   // wsSendMessage: WS_SEND_MESSAGE,
   onClose: WS_CONNECTION_CLOSED,
   onError: WS_CONNECTION_ERROR
}

const initialState = {
   wsConnected: false,
   orders: null, //[]
   total: null, // number
   totalToday: null, //number
   error: undefined
}

export const wsReducer = (state = initialState, action) => {
   switch (action.type) {
      // Опишем обработку экшена с типом WS_CONNECTION_OPEN
      // Установим флаг wsConnected в состояние true
      case WS_CONNECTION_OPEN:
         return {
            ...state,
            error: undefined,
            wsConnected: true
         };

      // Опишем обработку экшена с типом WS_CONNECTION_ERROR
      // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
      case WS_CONNECTION_ERROR:
         return {
            ...state,
            error: action.payload,
            wsConnected: false
         };

      // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
      // Установим флаг wsConnected в состояние false
      case WS_CONNECTION_CLOSED:
         return {
            ...state,
            error: undefined,
            wsConnected: false
         };

      // Опишем обработку экшена с типом WS_GET_MESSAGE
      // Обработка происходит, когда с сервера возвращаются данные
      // В messages передадим данные, которые пришли с сервера
      case WS_GET_MESSAGE:
         return {
            ...state,
            error: undefined,
            orders: action.payload,
            total: action.payload.total,
            totalToday: action.payload.totalToday
         };
      default:
         return state;
   }
};