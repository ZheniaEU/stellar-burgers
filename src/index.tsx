import React from "react"
import ReactDOM from "react-dom/client"
//import ReactDOM from "react-dom"
import "./index.css"
import { App } from "./components/App/App"
import { Provider } from "react-redux"
import { store } from "./services/store"


//import { state } from "./services/reducers"


const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
)

// ReactDOM.render(
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </React.StrictMode>
   // document.getElementById("root")
)
