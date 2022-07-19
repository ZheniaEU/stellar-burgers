/* eslint-disable */
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom"
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
import { useLocation } from "react-router-dom"
import { useCallback } from "react"
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

   const match = useRouteMatch("/ingredients/:id")

   useEffect(() => {
      if (match) {
         setopenInfoModal(true)
      }
   }, [match])

   const history = useHistory()

   //const { isAuth } = useSelector(state => state.auth)

   const { isLoading, ingredients } = useSelector(state => state.ingredients)
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
   const onCloseModalingredient = useCallback((url) => {
      setopenInfoModal(false)
      setIngredient(null)
      history.push(url)
   }, [history])

   //ордер
   const onCloseModalOrder = () => {
      setopenOrderModal(false)
      dispatch({ type: DELETE_ORDER })
      dispatch({ type: RESET_ITEMS })
   }

   const location = useLocation()
   const background = location.state?.background

   return (
      <>
         <AppHeader />
         <Switch location={background || location}>
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

            <Route path="/login" exact children={<Login />} />
            <Route path="/register" exact children={<Register />} />
            <Route path="/forgot-password" exact children={<ForgotPassword />} />
            <Route path="/reset-password" exact children={<ResetPassword />} />

            <Route path="/ingredients/:id" children={<Ingredient />} />

            <ProtectedRoute path="/profile" exact children={<Profile />} />

            <Route children={<Error404 />} />
         </Switch>

         {background && openInfoModal && (
            <Route path="/ingredients/:id">
               <Modal
                  active={openInfoModal}
                  onClickClose={() => { onCloseModalingredient("/") }} >
                  <IngredientDetails card={ingredient} />
               </Modal>
            </Route>
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
