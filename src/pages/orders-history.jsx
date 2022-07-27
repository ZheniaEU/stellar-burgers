/* eslint-disable*/
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CardOrder } from "../components/CardOrder/CardOrder"
import { Loader } from "../components/Loader/Loader"
import { ProfileMenu } from "../components/ProfileMenu/ProfileMenu"
import { WS_CONNECTION_INIT } from "../services/reducers/ws"
import { getCookie } from "../utils/cookie"

import styles from "./orders-history.module.css"

export const OrdersHistory = () => {

   const { orders } = useSelector(state => state.ws)
   const dispatch = useDispatch()

   const url = "orders"

   useEffect(() => {
      if (!orders) {
         dispatch({
            type: WS_CONNECTION_INIT,
            payload: `?token=${getCookie("accessToken")}`
         })
      }
   }, [dispatch, orders])

   const description = "В этом разделе вы можете просмотреть свою историю заказов"

   return (
      !orders ? <Loader /> :
         <main className={styles.main}>
            <ProfileMenu description={description} />
            <section className={styles.section}>
               <ul className={styles.ul}>
                  {orders.map((item) => (
                     <CardOrder item={item} key={item._id} arr={item.ingredients}
                        url={url} />
                  ))}
               </ul>
            </section>
         </main>
   )
}