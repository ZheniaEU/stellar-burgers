export const socketMiddleware = (wsUrl, wsActions) => {
   return store => {
     let socket = null

     return next => action => {
       const { dispatch, getState } = store
       const { type, payload } = action
       const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions
       const { user } = getState()
       if (type === wsInit && user) {
         socket = new WebSocket(`${wsUrl}?token=${user.token}`)
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

         if (type === wsSendMessage) {
           const message = { ...payload, token: user.token }
           socket.send(JSON.stringify(message))
         }
       }

       next(action)
     }
   }
 }

// //от Ханина
// export const socketMiddlewareWithReconnect = (wsActions) => {
//    return (store) => {
//       //  const { ... } = wsActions
//       let socket = null
//       let isConnected = false
//       let reconnectTimer = 0
//       let url = ""

//       return (next) => (action) => {
//          const { dispatch } = store
//          const { type, payload } = action

//          if (type === wsInit) {
//             url = action.payload
//             socket = new WebSocket(url)
//             isConnected = true

//             //         socket.onopen = ...
//             //           socket.onerror = ...

//             socket.onmessage = (event) => {
//                const { data } = event
//                const parsedData = JSON.parse(data)

//                if (parsedData.message === "Invalid or missing token") {
//                   refreshToken()
//                      .then((refreshData) => {
//                         const wssUrl = new URL(url)
//                         wssUrl.searchParams.set(
//                            "token",
//                            refreshData.accessToken.replace("Bearer ", "")
//                         )
//                         dispatch({
//                            type: wsInit,
//                            payload: wssUrl,
//                         })
//                      })
//                      .catch((err) => {
//                         dispatch({ type: onError, payload: err })
//                      })

//                   dispatch({ type: wsClose })
//                   return
//                }

//                dispatch({
//                   type: onMessage,
//                   payload: parsedData,
//                })
//             }

//             socket.onclose = (event) => {
//                dispatch({ type: onClose, payload: event })

//                if (isConnected) {
//                   reconnectTimer = setTimeout(() => {
//                      dispatch({
//                         type: wsInit,
//                         payload: url,
//                      })
//                   }, 5000)
//                }
//             }
//          }

//          if (wsClose && type === wsClose && socket) {
//             clearTimeout(reconnectTimer)
//             isConnected = false
//             reconnectTimer = 0
//             socket.close()
//          }

//          //    ...
//       }
//    }
// }