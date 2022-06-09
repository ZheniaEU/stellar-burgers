import React from "react"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import { Modal } from "../Modal/Modal"
import { IngredientDetails } from "../IngredientDetails/IngredientDetails"
import { OrderDetals } from "../OrderDetails/OrderDetals"
import appStyles from "./App.module.css"
//import { getIngredients } from "../../utils/api"

const API_URL = "https://norma.nomoreparties.space/api"




export const App = () => {

   //получение данных с сервера
   const [data, setData] = React.useState([])
   const getData = () => {
      fetch(`${API_URL}/ingredients`)
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


   React.useEffect(() => {
      getData()
   }, [])

   //состояния
   const [openOrderModal, setopenOrderModal] = React.useState(false)
   const [openInfoModal, setopenInfoModal] = React.useState(false)
   const [ingredient, setIngredient] = React.useState(null)


   //открыть
   const handleOpenOrderModal = () => {
      setopenOrderModal(true)
   }

   const handleOpenInfoModal = (card) => {
      setopenInfoModal(true)
      setIngredient(card)
   }

   //закрыть
   const onCloseModal = () => {
      setopenInfoModal(false)
      setopenOrderModal(false)
      setIngredient(null)
   }

   return (
      <React.Fragment>
         <AppHeader />
         <main className={appStyles.main}>
            <BurgerIngredients data={data} onOpen={handleOpenInfoModal} />

            <BurgerConstructor data={data} onOpen={handleOpenOrderModal} />
         </main>

         {openInfoModal && (
            <Modal
               active={openInfoModal}
               onClickClose={onCloseModal} >
               <IngredientDetails card={ingredient} />
            </Modal>
         )}

         {openOrderModal && (
            <Modal
               active={openOrderModal}
               onClickClose={onCloseModal}>
               <OrderDetals />
            </Modal>
         )}

      </React.Fragment>
   )
}
