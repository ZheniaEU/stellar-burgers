export const socketMiddleware = (wsActions) => {
   return state => {
      let socket = null
      const wsURL = "wss://norma.nomoreparties.space/orders"

      const {
         wsInit, onOpen, onMessage, onClose, onError
      } = wsActions

      return next => action => {
         const { dispatch } = state
         const { type, payload } = action

         if (type === wsInit) {
            socket = new WebSocket(`${wsURL}${payload}`)
         }
         if (socket) {
            socket.onopen = event => {
               dispatch({ type: onOpen, payload: event })
            }

            socket.onerror = event => {
               dispatch({ type: onError, payload: event })
            }

            socket.onmessage = event => {
               const { data } = event
               const parsedData = JSON.parse(data)
               const { success, ...restParsedData } = parsedData

               dispatch({ type: onMessage, payload: restParsedData })
            }

            socket.onclose = event => {
               dispatch({ type: onClose, payload: event })
            }
         }

         next(action)
      }
   }
}