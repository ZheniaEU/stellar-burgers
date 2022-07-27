import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CardOrder } from "../components/CardOrder/CardOrder"
import { Loader } from "../components/Loader/Loader"
import { WS_CONNECTION_INIT } from "../services/reducers/ws"
import styles from "./feed.module.css"
//!дописать проптайпы

export const Feed = ({ onOpen }) => {

   const { orders } = useSelector(state => state.ws)
   const dispatch = useDispatch()

   useEffect(() => {
      if (!orders) {
         dispatch({ type: WS_CONNECTION_INIT, payload: "/all" })
      }
   }, [dispatch, orders])

   const url = "feed"

   return (
      !orders ? <Loader /> : (
         <main className={styles.main}>
            <h1 className={styles.h1}>Лента заказов</h1>
            <section className={styles.section}>
               <ul className={styles.container}>
                  {orders.map((item) => (
                     <CardOrder onOpen={onOpen} item={item} key={item._id}
                        arr={item.ingredients} url={url} />
                  ))}
               </ul>
               <StatusList />
            </section>
         </main>
      )
   )
}

export const StatusList = () => {

   const { orders, total, totalToday } = useSelector(state => state.ws)

   const ordersIsDone = orders
      .filter((order) => order.status === "done")
      .slice(0, 10)

   const orderIsPending = orders
      .filter(order => order.status === "pending")
      .slice(0, 10)

   return (
      <article className={styles.article}>
         <div className={styles.orders_container}>
            <div className={styles.orders} >
               <h3 className={styles.h3}>Готовы:</h3>
               <ul className={styles.ul}>
                  {ordersIsDone.map((item) => (
                     <li className={styles.done} key={item._id}>{item.number}</li>
                  ))}
               </ul>
            </div>
            <div className={styles.orders}>
               <h3 className={styles.h3}>В работе:</h3>
               <ul className={styles.ul}>
                  {orderIsPending.map((item) => (
                     <li className={styles.progress} key={item._id}>{item.number}</li>
                  ))}
               </ul >
            </div>
         </div>
         <p className={styles.text}>Выполнено за все время:</p>
         <p className={styles.counter}>{total}</p>
         <p className={styles.text}>Выполнено за сегодня:</p>
         <p className={styles.counter}>{totalToday}</p>
      </article>
   )
}