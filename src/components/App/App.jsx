/* eslint-disable */
import { Switch, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import { Modal } from "../Modal/Modal"
import { IngredientDetails } from "../IngredientDetails/IngredientDetails"
import { OrderDetals } from "../OrderDetails/OrderDetals"
import styles from "./App.module.css"
import { useSelector, useDispatch } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Loader } from "../Loader/Loader"
import { Profile } from "../../pages/index"
import { Login } from "../../pages/index"
import { Register } from "../../pages/index"
import { ForgotPassword } from "../../pages/index"
import { ResetPassword } from "../../pages/index"
import { Ingredient } from "../../pages/index"

import {
   getData,
   DELETE_ORDER,
   RESET_ITEMS
} from "../../services/actions/index"

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
         <Switch>
            <Route path="/" exact={true}>
               {isLoading ? < Loader /> :
                  <DndProvider backend={HTML5Backend}>
                     <main className={styles.main}>
                        <BurgerIngredients onOpen={handleOpenInfoModal} />
                        <BurgerConstructor onOpen={handleOpenOrderModal} />
                     </main>
                  </DndProvider>
               }
            </Route>

            <Route path="/profile" exact={true} children={<Profile />} />
            <Route path="/login" exact={true} children={<Login />} />
            <Route path="/register" exact={true} children={<Register />} />
            <Route path="/forgot-password" exact={true} children={<ForgotPassword />} />
            <Route path="/reset-password" exact={true} children={<ResetPassword />} />
            <Route path="/ingredient" exact={true}>
               <Ingredient />
            </Route>
         </Switch>
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
