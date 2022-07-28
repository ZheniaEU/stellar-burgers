export const socketMiddleware = (wsURL, wsActions) => {
   return state => {
      let socket = null

      const {
         wsInit, onOpen, onMessage, onMessagePrivate, onClose, onError
      } = wsActions

      return next => action => {
         const { dispatch } = state
         const { type, payload, isPrivate } = action
         //       console.log(isPrivate)
         if (type === wsInit) {
            console.log("здесь")
            socket = new WebSocket(`${wsURL}${payload}`)
         }
         if (socket) {
            socket.onopen = event => {
               dispatch({ type: onOpen, payload: event })
               //         console.log(event)
            }

            socket.onerror = event => {
               dispatch({ type: onError, payload: event })
            }

            socket.onmessage = event => {
               const { data } = event
               const parsedData = JSON.parse(data)
               const { success, ...restParsedData } = parsedData
               //     console.log(isPrivate ? onMessagePrivate : onMessage)
               //      dispatch({ type: isPrivate ? onMessagePrivate : onMessage, payload: restParsedData })
               dispatch({ type: onMessage, payload: restParsedData })
            }
            socket.onclose = event => {
              dispatch({ type: onClose, payload: event })
            }
         //    if (type === onClose) {
         // //    //    // dispatch({type: "CLOSE_SUKA"})
         //       socket.close()
         //    }
         }

         next(action)
      }
   }
}