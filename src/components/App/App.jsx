import { useState, useEffect } from "react"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import { Modal } from "../Modal/Modal"
import { IngredientDetails } from "../IngredientDetails/IngredientDetails"
import { OrderDetals } from "../OrderDetails/OrderDetals"
import styles from "./App.module.css"
import { getData } from "../../services/actions/index"
import { useDispatch } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DELETE_ORDER } from "../../services/reducers/order"
import { RESET_ITEMS } from "../../services/reducers/dnd"
import { useSelector } from "react-redux"
import { Loader } from "../Loader/Loader"

export const App = () => {

   const { isLoading } = useSelector(state => state.ingredients)
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
      setopenOrderModal(true)
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
      setopenOrderModal(false)
      dispatch({ type: DELETE_ORDER })
      dispatch({ type: RESET_ITEMS })
   }

   return (
      <>
         <AppHeader />
         {isLoading ? < Loader /> :
            <DndProvider backend={HTML5Backend}>
               <main className={styles.main}>
                  <BurgerIngredients onOpen={handleOpenInfoModal} />
                  <BurgerConstructor onOpen={handleOpenOrderModal} />
               </main>
            </DndProvider>
         }
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
