
import { useCallback, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../Loader/Loader"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./OrderInfo.module.css"
import { WS_CONNECTION_CLOSED, WS_CONNECTION_INIT } from "../../services/reducers/ws"

export const OrderInfo = ({ url }) => {

   const { ingredients } = useSelector(state => state.ingredients)
   const { orders } = useSelector(state => state.ws)
   const dispatch = useDispatch()

   useEffect(() => {
      if (!orders) {
         dispatch({
            type: WS_CONNECTION_INIT, payload: url
         })

         return () => {
            dispatch({ type: WS_CONNECTION_CLOSED })
         }
      }
   }, [dispatch, orders, url])

   const { id } = useParams()

   const card = orders?.find((el) => el._id === id)

   const getIngredients =
      useCallback((id) => {
         return ingredients.find((item) => item._id === id)
      }, [ingredients])

   const totalIngredients =
      useMemo(() =>
         card?.ingredients.map((id) => getIngredients(id)
         ), [card, getIngredients])

//редьюсим повторы игредиентов
   const reduceIngredients = (arr,  obj = {}) => {
      arr.forEach((el) => {
         const name = el.name
         if (name in obj) {
            obj[name].count++
         } else {
            obj[name] = el
            obj[name].count = 1
         }
      })

      return Object.values(obj)
   }

   const countTotalPrice = (arr, sum = 0) => {
      for (let { price } of arr)
         sum += price
      return sum
   }

//нормализация времени
   const creatTime = useMemo(() => {
      if (!card)
         return
      return new Date(card.createdAt).toLocaleString()
   }, [card])

   const status = useMemo(() => {
      if (!card)
         return "готовится"
      return "готово"
   }, [card])

   return (
      !card ? <Loader /> :
         <div className={styles.container_info}>
            <p className={styles.number}>#{card.number}</p>
            <h2 className={styles.h2}>{card.name}</h2>
            <p className={styles.span}>{status}</p>
            <h3 className={styles.h3}>Состав:</h3>
            <ul className={styles.ul}>
               {reduceIngredients(totalIngredients).map((item, index) => (
                  <li className={styles.li} key={index}>
                     <img className={styles.image}
                        src={item.image_mobile} alt={item.name} />
                     <p className={styles.name}>{item.name}</p>
                     <div className={styles.container}>
                        <p className={styles.text}>{item.count} x {item.price}</p>
                        <CurrencyIcon />
                     </div>
                  </li>
               ))}
            </ul>
            <div className={styles.container_total}>
               <p className={styles.data}>{creatTime}</p>
               <div className={styles.total}>
                  <p className={styles.text}>{countTotalPrice(totalIngredients)}</p>
                  <CurrencyIcon />
               </div>
            </div>
         </div>
   )
}
