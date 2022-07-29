import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CardOrder } from "../components/CardOrder/CardOrder"
import { Loader } from "../components/Loader/Loader"
import { ProfileMenu } from "../components/ProfileMenu/ProfileMenu"
import { WS_CLEAR_STORE, WS_CONNECTION_CLOSED, WS_CONNECTION_INIT } from "../services/reducers/ws"
import { getCookie } from "../utils/cookie"

import styles from "./orders-history.module.css"

export const OrdersHistory = ({ onOpen }) => {

   const { orders } = useSelector(state => state.ws)
   const dispatch = useDispatch()

   const reverseOrders = useMemo(() => {
      return orders?.reverse()
   }, [orders])

   useEffect(() => {
      if (!orders) {
         dispatch({
            type: WS_CONNECTION_INIT, payload: `?token=${getCookie("accessToken")}`
         })

         return () => {
            dispatch({ type: WS_CONNECTION_CLOSED })
         }
      }
   }, [dispatch, orders])

   useEffect(() => {
      dispatch({ type: WS_CLEAR_STORE })
   }, [dispatch])

   return (
      !orders ? <Loader /> :
         <main className={styles.main}>
            <ProfileMenu description={"В этом разделе вы можете просмотреть свою историю заказов"} />
            <section className={styles.section}>
               <ul className={styles.ul}>
                  {reverseOrders.map((item) => (
                     <CardOrder
                        onOpen={onOpen}
                        item={item}
                        key={item._id}
                        arr={item.ingredients}
                        url={"profile/orders"} />
                  ))}
               </ul>
            </section>
         </main>
   )
}