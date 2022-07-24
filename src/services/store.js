import thunk from "redux-thunk"
import { compose, createStore, applyMiddleware } from "redux"
// import { logger } from "redux-logger"
import { rootReducer } from "./reducers"
import { socketMiddleware } from "./middleware/wsMiddleware"
import { wsAction } from "./reducers/ws"

const composeEnhancers =
   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsAction)))
// const enhancer = composeEnhancers(applyMiddleware(thunk))

export const state = createStore(rootReducer, enhancer)

//export const state = createStore(rootReducer, applyMiddleware(thunk))