import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CardOrder } from "../components/CardOrder/CardOrder"
import { Loader } from "../components/Loader/Loader"
import { ProfileMenu } from "../components/ProfileMenu/ProfileMenu"
import { WS_CONNECTION_CLOSED, WS_CONNECTION_INIT } from "../services/reducers/ws"
import { getCookie } from "../utils/cookie"

import styles from "./orders-history.module.css"

export const OrdersHistory = ({ onOpen }) => {

   const { orders, privateOrders } = useSelector(state => state.ws)
   const dispatch = useDispatch()

   const ordersa = useMemo(() => {
      return orders?.reverse()
   }, [orders])

   const url = "profile/orders"

   //  dispatch({type: "CLOSE_SUKA"})
   useEffect(() => {
      if (!orders) {
         dispatch({
            type: WS_CONNECTION_INIT, payload: `?token=${getCookie("accessToken")}`,// isPrivate : true
         })

         return () => {
            //      dispatch({type: "CLOSE_SUKA"})
            dispatch({ type: WS_CONNECTION_CLOSED })
         }
      }
      // return () => {
      //    dispatch({ type: "CLOSE_SUKA" })
      // }
   }, [dispatch, orders])

   useEffect(() => {
      dispatch({ type: "CLOSE_SUKA" })
   }, [dispatch])

   const description = "В этом разделе вы можете просмотреть свою историю заказов"

   //console.log(privateOrders, orders)

   return (
      !orders ? <Loader /> :
         <main className={styles.main}>
            <ProfileMenu description={description} />
            <section className={styles.section}>
               <ul className={styles.ul}>
                  {ordersa.map((item) => (
                     <CardOrder onOpen={onOpen} item={item} key={item._id}
                        arr={item.ingredients}
                        url={url} />
                  ))}
               </ul>
            </section>
         </main>
   )
}