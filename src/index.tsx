import ReactDOM from "react-dom/client"
import "./index.css"
import { App } from "./components/App/App"
import { Provider } from "react-redux"
import { state } from "./services/store"

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
)

// ReactDOM.render(
root.render(
   //   <React.StrictMode>
   <Provider store={state}>
      <App />
   </Provider>
   //   </React.StrictMode>,
   // document.getElementById("root")
)
