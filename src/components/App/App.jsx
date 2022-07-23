/* eslint-disable*/
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
   Error404,
   Feed
} from "../../pages/index"
import styles from "./App.module.css"

export const App = () => {

//    const ws = new WebSocket("wss://norma.nomoreparties.space/orders/all")

// //    ws.onmessage = (event) => {
// //    //   console.log(JSON.parse(event.data).orders);
// //       console.log(event.lastEventId)

// //   //    console.log(`Получены данные: ${event.data}`)
// //    }

   const { isLoading } = useSelector(state => state.ingredients)
   const dispatch = useDispatch()

   const match = useRouteMatch("/ingredients/:id")

   const history = useHistory()

   const location = useLocation()

   const background = location.state?.background

   useEffect(() => {
      if (match) {
         setopenInfoModal(true)
      }
      // ws.onopen = (event) => {
      //    console.log(event);
      //    console.log("Соединение установлено");
      // }



   }, [match])

   useEffect(() => {
      dispatch(getData())
      dispatch(аuthenticationUser())
   }, [dispatch])

   //состояния
   const [openOrderModal, setopenOrderModal] = useState(false)
   const [openInfoModal, setopenInfoModal] = useState(false)
   const [openFeedModal, setopenFeedModal] = useState(false)

   //открыть
   const handleOpenOrderModal = () => {
      setopenOrderModal(true)
   }

   const handleOpenInfoModal = () => {
      setopenInfoModal(true)
   }

   const handleOpenFeedModal = () => {
      setopenFeedModal(true)
   }

   //закрыть ингредиет
   const onCloseModalingredient = useCallback(() => {
      setopenInfoModal(false)
      history.push("/")
   }, [history])

   //закрыть ордер
   const onCloseModalOrder = () => {
      setopenOrderModal(false)
      dispatch({ type: DELETE_ORDER })
      dispatch({ type: RESET_ITEMS })
   }

   //закрыть фид
   const onCloseModalFeed = () => {
      setopenInfoModal(false)
   }

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

            <Route path="/feed" exact children={<Feed onOpen={handleOpenFeedModal} />} />

            <Route path="/ingredients/:id">
               <div className={styles.maket} />
               <IngredientDetails />
            </Route>

            <ProtectedRoute path="/profile" exact children={<Profile />} />

            <Route children={<Error404 />} />
         </Switch>

         {background && openInfoModal && (
            <Route path="/ingredients/:id">
               <Modal
                  onClickClose={onCloseModalingredient} >
                  <IngredientDetails />
               </Modal>
            </Route>
         )}

         {openFeedModal && (

            <Modal
               onClickClose={onCloseModalFeed} >
               <IngredientDetails />
            </Modal>

         )}

         {openOrderModal && (
            <Modal
               onClickClose={onCloseModalOrder}>
               <OrderDetals />
            </Modal>
         )}
      </>
   )
}
