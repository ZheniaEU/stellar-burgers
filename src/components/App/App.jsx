/* eslint-disable */
import { Switch, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import { IngredientDetails } from "../IngredientDetails/IngredientDetails"
import { Modal } from "../Modal/Modal"
import { OrderDetals } from "../OrderDetails/OrderDetals"
import { useSelector, useDispatch } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute"
import { Loader } from "../Loader/Loader"
import { getData, DELETE_ORDER, RESET_ITEMS } from "../../services/actions/index"
import { аuthenticationUser } from "../../services/actions/auth"
import {
   Profile,
   Login,
   Register,
   ForgotPassword,
   ResetPassword,
   Ingredient,
   Error404
} from "../../pages/index"
import styles from "./App.module.css"

export const App = () => {

   const { isLoading } = useSelector(state => state.ingredients)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getData())
      dispatch(аuthenticationUser())
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
            <Route path="/" exact>
               {isLoading ? < Loader /> :
                  <DndProvider backend={HTML5Backend}>
                     <main className={styles.main}>
                        <BurgerIngredients onOpen={handleOpenInfoModal} />
                        <BurgerConstructor onOpen={handleOpenOrderModal} />
                     </main>
                  </DndProvider>
               }
            </Route>

            {/* !не авторизованый пользователь */}
            {/* <ProtectedRoute></ProtectedRoute> */}
            <Route path="/profile" exact component={Profile} />

            {/* авторизованый пользователь */}
            {/* <ProtectedRoute></ProtectedRoute> */}
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/reset-password" exact component={ResetPassword} />


            <Route path="/ingredient" exact>
               <Ingredient />
            </Route>
            <Route>
               <Error404 />
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
