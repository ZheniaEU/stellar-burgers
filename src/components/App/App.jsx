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
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
//import { Loader } from "../Loader/Loader"
//import { useDispatch } from "react-redux"
//import { onDemandOrder } from "../../utils/api"

export const App = () => {

   // onDemandOrder()
   //    .then(res => {
   //       console.log(res.order)
   //    })

   //  const [ingredientLoading, setIngredientLoading] = useState(true)

   const dispatch = useDispatch()
   const { ingredients } = useSelector(state => state.ingredients)

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

   //закрыть
   const onCloseModal = () => {
      setopenInfoModal(false)
      setopenOrderModal(false)
      setIngredient(null)
   }

   return (
      <>
         <AppHeader />
         <DndProvider backend={HTML5Backend}>
            <main className={appStyles.main}>
               {ingredients.length > 0 &&
                  <BurgerIngredients onOpen={handleOpenInfoModal} />
               }
               {ingredients.length > 0 &&
                  <BurgerConstructor onOpen={handleOpenOrderModal} />
               }
            </main>
         </DndProvider>

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
