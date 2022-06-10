import { useState, useEffect } from "react"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import { Modal } from "../Modal/Modal"
import { IngredientDetails } from "../IngredientDetails/IngredientDetails"
import { OrderDetals } from "../OrderDetails/OrderDetals"
import appStyles from "./App.module.css"
import { getData } from "../../services/actions/index"
import { useDispatch, useSelector } from "react-redux"


export const App = () => {

   const dispatch = useDispatch()
   const { ingredients } = useSelector(state => state.ingredients)
   const data = ingredients

   useEffect(() => {
      dispatch(getData())
   }, [dispatch])

   //состояния
   const [openOrderModal, setopenOrderModal] = useState(false)
   const [openInfoModal, setopenInfoModal] = useState(false)
   const [ingredient, setIngredient] = useState(null)


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
      <>
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
      </>
   )
}
