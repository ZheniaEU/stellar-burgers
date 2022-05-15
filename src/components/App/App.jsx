import React from "react"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import { Modal } from "../Modal/Modal"
import { IngredientDetails } from "../IngredientDetails/IngredientDetails"
import { OrderDetals } from "../OrderDetails/OrderDetals"
import appStyles from "./App.module.css"


const API_URL = "https://norma.nomoreparties.space/api/ingredients"

export const App = () => {

   //получение данных с сервера
   const [data, setData] = React.useState([])
   const getData = () => {
      fetch(API_URL)
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
      getData();
   }, []);

   //состояния
   const [openOrderModal, setopenOrderModal] = React.useState(false)
   const [openInfoModal, setopenInfoModal] = React.useState(false)
   const [ingredient, setIngredients] = React.useState(null)


   //открыть
   const handleOpenOrderModal = () => {
      setopenOrderModal(true)
   }

   const handleOpenInfoModal = () => {
      setopenInfoModal(true)
   }

   //закрыть
   const onCloseModal = () => {
      setopenInfoModal(false)
      setopenOrderModal(false)
   }

   // const onCloseInfoModal = () => {
   //    setopenInfoModal(false)
   // }

   //закрыть по ESC
   const handleCloseModal = (evt) => {
      if (evt.key === "Escape") {
         onCloseModal()
      }
   }
   // console.log(handleOpenOrderModal)

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
               onClickClose={onCloseModal} onEcsClose={handleCloseModal}>
               <IngredientDetails data={data} />
            </Modal>
         )}

         {openOrderModal && (
            <Modal
               active={openOrderModal}
               onClickClose={onCloseModal} onEcsClose={handleCloseModal}>
               <OrderDetals />
            </Modal>
         )}

      </React.Fragment>
   );
}
