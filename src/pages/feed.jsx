import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
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

   return (
      !orders ? <Loader /> : (
         <main className={styles.main}>
            <h1 className={styles.h1}>Лента заказов</h1>
            <section className={styles.section}>
               <ul className={styles.container}>
                  {orders.map((item) => (
                     < CardOrder onOpen={onOpen} item={item} key={item._id} arr={item.ingredients} />
                  ))}
               </ul>
               <StatusList />
            </section>
         </main>
      )
   )
}

export const CardOrder = ({ onOpen, item, arr }) => {

   const { ingredients } = useSelector(state => state.ingredients)

   const getIngredients = (id) => {
      return ingredients.find((item) => item._id === id)
   }

   const totalIngredients = arr.map((id) => {
      return getIngredients(id)
   })

   const countTotalPrice = (arr, sum = 0) => {
      for (let { price } of arr)
         sum += price
      return sum
   }

   const hideElements = (arr) => {
      if (arr.length - 5 > 0)
         return `+${arr.length - 5}`
   }

   return (
      <li className={styles.card} onClick={() => onOpen()}>
         <div className={styles.order_container}>
            <p className={styles.order}>#{item.number}</p>
            <p className={styles.date}>{item.createdAt}</p>
         </div>
         <h2 className={styles.h2}>{item.name}</h2>
         <div className={styles.overview_container}>
            <div className={styles.images_container}>
               {totalIngredients.slice(0, 6).map((item, index) => (
                  < img className={styles.image} src={item.image_mobile}
                     key={index} alt={item.name} />
               ))}
               <p className={styles.hide}>{hideElements(totalIngredients)}</p>
            </div>
            <div className={styles.price_container}>
               <p className={styles.price}>{countTotalPrice(totalIngredients)}</p>
               <CurrencyIcon />
            </div>
         </div>
      </li>
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