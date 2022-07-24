/*eslint-disable*/
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../components/Loader/Loader"
import { WS_CONNECTION_INIT } from "../services/reducers/ws"
import styles from "./feed.module.css"


export const Feed = ({ onOpen }) => {

   const { wsConnected, orders, total, totalToday } = useSelector(state => state.ws)

   const dispatch = useDispatch()
   useEffect(() => {
      if (!orders) {
         dispatch({ type: WS_CONNECTION_INIT, payload: "/all" })
      }
   }, [dispatch])





   return (

      !orders ? <Loader /> : (
         <main className={styles.main}>
            <h1 className={styles.h1}>Лента заказов</h1>
            <section className={styles.section}>
               <ul className={styles.container}>
                  {orders.map((item) => (
                     < CardOrder onOpen={onOpen} item={item} key={item._id} />
                  ))}
               </ul>

               <StatusList />

            </section>
         </main>
      )
   )
}

export const CardOrder = ({ onOpen, item }) => {


   return (
      <li className={styles.card} onClick={() => onOpen()}>
         <div className={styles.order_container}>
            <p className={styles.order}>{item.number}</p>
            <p className={styles.date}>{item.createdAt}</p>
         </div>
         <h2 className={styles.h2}>{item.name}</h2>
         <div className={styles.overview_container}>
            <div className={styles.images_container}>
               <img className={styles.image}
                  src="https://code.s3.yandex.net/react/code/bun-01-mobile.png" alt="" />
            </div>
            <div className={styles.price_container}>
               <p className={styles.price}>480</p>
               <CurrencyIcon />
            </div>
         </div>
      </li>
   )
}

export const StatusList = () => {

   const { wsConnected, orders, total, totalToday } = useSelector(state => state.ws)

   const doneOrders = orders
      .filter(order => order.status === "done")
      .map(order => order.number)

   const progressOrders = orders
      .filter(order => order.status !== "done")
      .map(order => order.number)

   return (
      <article className={styles.article}>
         <div className={styles.orders_container}>
            <div className={styles.orders} >
               <h3 className={styles.h3}>Готовы:</h3>
               <ul className={styles.ul}>

                  <li className={styles.done}>034533</li>

               </ul>
            </div>
            <div className={styles.orders}>
               <h3 className={styles.h3}>В работе:</h3>
               <ul className={styles.ul}>

                  <li className={styles.progress}>034533</li>

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