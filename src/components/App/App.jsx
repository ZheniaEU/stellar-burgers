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

   const [data, setData] = React.useState([])
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
         .then(data => { setData(data.data) })
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

   //открыть
   const [openModal, setOpenModal] = React.useState(false)

   const handleOpenModal = () => {
      setOpenModal(true)
   }

   //закрыть
   const onCloseModal = () => {
      setOpenModal(false)
   }

   const handleCloseModal = (evt) => {
      if (evt.key === "Escape") {
         onCloseModal()
      }
   }
   // console.log(handleOpenModal)

   return (
      <React.Fragment>
         <AppHeader />
         <main className={appStyles.main}>
            <BurgerIngredients data={data} />

            <BurgerConstructor data={data} onOpen={handleOpenModal} />
         </main>


         {openModal && (
            <Modal active={openModal} onClickClose={onCloseModal} onEcsClose={handleCloseModal}>

            </Modal>
         )}

      </React.Fragment>
   );
}
