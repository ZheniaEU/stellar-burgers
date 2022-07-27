import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { App } from "./components/App/App"
import { state } from "./services/store"
import "./index.css"

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
)

root.render(
   <BrowserRouter>
      <Provider store={state}>
         <App />
      </Provider>
   </BrowserRouter>
)