import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { App } from "./components/App/App"
import { state } from "./services/store"
import "./index.css"

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
)

// ReactDOM.render(
root.render(
   //   <React.StrictMode>
   <BrowserRouter>
      <Provider store={state}>
         <App />
      </Provider>
   </BrowserRouter>
   // document.getElementById('root')
)



// import ReactDOM from "react-dom"
// import { BrowserRouter } from "react-router-dom"
// import { Provider } from "react-redux"
// import { App } from "./components/App/App"
// import { state } from "./services/store"
// import "./index.css"

// ReactDOM.render(
//    <BrowserRouter>
//       <Provider store={state}>
//          <App />
//       </Provider>
//    </BrowserRouter>,
//    document.getElementById('root')
//)
