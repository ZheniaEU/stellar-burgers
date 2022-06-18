import { useState, useEffect } from "react"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import { Modal } from "../Modal/Modal"
import { IngredientDetails } from "../IngredientDetails/IngredientDetails"
import { OrderDetals } from "../OrderDetails/OrderDetals"
import appStyles from "./App.module.css"
import { getData } from "../../services/actions/index"
import { useDispatch } from "react-redux"
//import { useDispatch, useSelector } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
//import { Loader } from "../Loader/Loader"
//import { useDispatch } from "react-redux"
//import { onDemandOrder } from "../../utils/api"
import { DELETE_ORDER } from "../../services/reducers/order"
import { RESET_ITEMS } from "../../services/reducers/dnd"

export const App = () => {

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getData())
   }, [dispatch])

   //состояния
   const [openOrderModal, setopenOrderModal] = useState(false)
   const [openInfoModal, setopenInfoModal] = useState(false)
   const [ingredient, setIngredient] = useState(null)


   //открыть
   const handleOpenOrderModal = () => {
      //  setTimeout(() => {
      setopenOrderModal(true)
      //   }, 2000)
   }

   const handleOpenInfoModal = (card) => {
      setopenInfoModal(true)
      setIngredient(card)
   }

   //ингредиеты
   const onCloseModalingredient = () => {
      setopenInfoModal(false)
      setIngredient(null)
   }

   //ордер
   const onCloseModalOrder = () => {
      //  setopenInfoModal(false)
      setopenOrderModal(false)
      dispatch({ type: DELETE_ORDER })
      dispatch({type: RESET_ITEMS})
      //  setIngredient(null)
   }

   return (
      <>
         <AppHeader />
         <DndProvider backend={HTML5Backend}>
            <main className={appStyles.main}>
               <BurgerIngredients onOpen={handleOpenInfoModal} />
               <BurgerConstructor onOpen={handleOpenOrderModal} />
            </main>
         </DndProvider>

         {openInfoModal && (
            <Modal
               active={openInfoModal}
               onClickClose={onCloseModalingredient} >
               <IngredientDetails card={ingredient} />
            </Modal>
         )}

         {openOrderModal && (
            <Modal
               active={openOrderModal}
               onClickClose={onCloseModalOrder}>
               <OrderDetals />
            </Modal>
         )}
      </>
   )
}
