import React from "react"
// import { data } from "../../utils/data"
//import { getData } from "../../utils/api"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import { Modal } from "../Modal/Modal"
import appStyles from "./App.module.css"
// import "./App.css";

export const App = () => {

   const API_URL = "https://norma.nomoreparties.space/api/ingredients"

   const [state, setState] = React.useState([])
   const getData = () => {
      fetch(API_URL)
         // .then(checkResponse)
         .then(res => {
            if (res.ok) {
               return res.json()
            } else {
               return Promise.reject(`Проблемы с запросом: ${res.status}`)
            }
         })
         .then(data => { setState(data.data) })
         .catch(err => { console.log(` Не переключайтесь, мы скоро вернёмся: ${err} `) })
   }

   // const checkResponse = function (res) {
   //    if (res.ok) {
   //       return res.json()
   //    } else {
   //       return Promise.reject(`Обнаружен запуск ядерной ракеты: ${res.status}`)
   //    }
   // }

   React.useEffect(() => {
      getData();
   }, []);

   return (
      <React.Fragment>
         <AppHeader />
         <main className={appStyles.main}>
            <BurgerIngredients data={state} />
            {/* data={data} */}
            <BurgerConstructor data={state} />
         </main>



         <Modal>

         </Modal>


      </React.Fragment>
   );
}



// const [data, setData] = React.useState({})
// const getData = function () {

//    return fetch(API_URL)
//       .then(data => {
//          setData({data})
//       })
//       .then(checkResponse)
// }
// getData()

// const checkResponse = function (response) {
//    if (response.ok) {
//       return response.json()
//    } else {
//       return Promise.reject(`Обнаружен запуск ядерной ракеты: ${response.status}`)
//    }
// }