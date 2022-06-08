import React from "react"
//import ReactDOM from "react-dom/client"
import ReactDOM from "react-dom"
import "./index.css";
import { App } from "./components/App/App"
import { Provider } from "react-redux"
//import { createStore } from "redux"
//import { rootReducer } from './services/reducers/inedx'

// const action = { type: "" }

// const initialState = {

// }

// const reducer = (state = initialState, action) => {
//    switch (action.type) {
//       case "ADD_CASH":
//          return { ...state, cash: state.cash + action.payload }
//       case "GET_CASH":
//          return { ...state, cash: state.cash + action.payload }

//       default:
//          return state
//    }
// }

import thunk from "redux-thunk"
import { applyMiddleware, compose, createStore } from "redux"
import { rootReducer } from "./services/reducers/inedx"

const composeEnhancers =
   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(rootReducer, enhancer)

export default store;

// const store = createStore(rootReducer)

//   const root = ReactDOM.createRoot(
//      document.getElementById("root") as HTMLElement
//   );
ReactDOM.render(
   //root.render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);


//import {store} from "./services/store"