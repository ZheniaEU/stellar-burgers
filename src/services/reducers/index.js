import thunk from "redux-thunk"
import { compose, createStore, applyMiddleware } from "redux"
import { rootReducer } from "./test"


// const composeEnhancers =
//    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//       ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//       : compose

// const enhancer = composeEnhancers(applyMiddleware(thunk))

// export const state = createStore(rootReducer, enhancer)

export const state = createStore(rootReducer, applyMiddleware(thunk))
