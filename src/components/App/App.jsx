import { useState, useEffect, useCallback } from "react"
import { Switch, Route, useHistory, useRouteMatch, useLocation } from "react-router-dom"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import { IngredientDetails } from "../IngredientDetails/IngredientDetails"
import { OrderDetals } from "../OrderDetails/OrderDetals"
import { OrderInfo } from "../OrderInfo/OrderInfo"
import { useSelector, useDispatch } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute"
import { аuthenticationUser } from "../../services/actions/auth"
import { Modal } from "../Modal/Modal"
import { Loader } from "../Loader/Loader"
import { getData, DELETE_ORDER, RESET_ITEMS } from "../../services/actions/index"
import { WS_CONNECTION_INIT } from "../../services/reducers/ws"
import {
   Profile,
   Login,
   Register,
   ForgotPassword,
   ResetPassword,
   Error404,
   Feed,
   OrdersHistory
} from "../../pages/index"
import styles from "./App.module.css"

export const App = () => {

   const { isLoading } = useSelector(state => state.ingredients)
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch({ type: WS_CONNECTION_INIT, payload: "/all" })

   }, [dispatch])

   const isIngredients = useRouteMatch("/ingredients/:id")
   const isFeed = useRouteMatch("/feed/:id")
   const isHistory = useRouteMatch("/profile/orders/:id")

   const history = useHistory()

   const location = useLocation()

   const background = location.state?.background

   useEffect(() => {
      if (isIngredients) {
         setopenInfoModal(true)
      }
      if (isFeed) {
         setopenFeedModal(true)
      }
      if (isHistory) {
         setopenHistoryModal(true)
      }
   }, [isIngredients, isFeed, isHistory])

   useEffect(() => {
      dispatch(getData())
      dispatch(аuthenticationUser())
   }, [dispatch])

   //состояния
   const [openOrderModal, setopenOrderModal] = useState(false)
   const [openInfoModal, setopenInfoModal] = useState(false)
   const [openFeedModal, setopenFeedModal] = useState(false)
   const [openHistoryModal, setopenHistoryModal] = useState(false)

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

   const handleOpenHistoryModal = () => {
      setopenFeedModal(true)
   }

   //закрыть ордер
   const onCloseModalOrder = () => {
      setopenOrderModal(false)
      dispatch({ type: DELETE_ORDER })
      dispatch({ type: RESET_ITEMS })
   }

   //закрыть ингредиет
   const onCloseModalingredient =
      useCallback(() => {
         setopenInfoModal(false)
         history.push("/")
      }, [history])

   //закрыть фид
   const onCloseModalFeed =
      useCallback(() => {
         setopenFeedModal(false)
         history.push("/feed")
      }, [history])

   const onCloseHistoryModal =
      useCallback(() => {
         setopenHistoryModal(false)
         history.push("/profile/orders")
      }, [history])

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

            <Route path="/feed/:id" exact>
               <div className={styles.maket} />
               <OrderInfo />
            </Route>

            <Route path="/ingredients/:id">
               <div className={styles.maket} />
               <IngredientDetails />
            </Route>

            <ProtectedRoute path="/profile" exact children={<Profile />} />
            <ProtectedRoute path="/profile/orders" exact
               children={<OrdersHistory onOpen={handleOpenHistoryModal} />} />
            <ProtectedRoute path="/profile/orders/:id" exact children={<OrderInfo />} />

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

         {background && openFeedModal && (
            <Route path="/feed/:id">
               <Modal
                  onClickClose={onCloseModalFeed} >
                  <OrderInfo />
               </Modal>
            </Route>
         )}

         {background && openHistoryModal && (
            <Route path="/profile/orders/:id">
               <Modal
                  onClickClose={onCloseHistoryModal} >
                  <OrderInfo />
               </Modal>
            </Route>
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
