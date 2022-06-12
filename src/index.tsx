import React from "react"
import ReactDOM from "react-dom/client"
//import ReactDOM from "react-dom"
import "./index.css"
import { App } from "./components/App/App"
import { Provider } from "react-redux"
//import { store } from "./services/store"
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { rootReducer } from "./services/reducers"
//import { logger } from "redux-logger"
//import { state } from "./services/reducers"
//import thunk from "redux-thunk"
//import { createStore, applyMiddleware } from "redux"
//import { compose, createStore, applyMiddleware } from "redux"
//import { rootReducer } from "./test"
import { logger } from "redux-logger"

// const composeEnhancers =
//    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//       ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//       : compose

// const enhancer = composeEnhancers(applyMiddleware(thunk))

// export const state = createStore(rootReducer, enhancer)

export const state = createStore(rootReducer, applyMiddleware(thunk, logger))


const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
)

// ReactDOM.render(
root.render(
//   <React.StrictMode>
      <Provider store={state}>
         <App />
      </Provider>
//   </React.StrictMode>
   // document.getElementById("root")
)
