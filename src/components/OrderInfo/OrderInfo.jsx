import { useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Loader } from "../Loader/Loader"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./OrderInfo.module.css"

export const OrderInfo = () => {

   const { ingredients } = useSelector(state => state.ingredients)
   const { orders } = useSelector(state => state.ws)

   const { id } = useParams()

   const card = useMemo(() => {
      if (orders)
         return orders.find((el) => el._id === id)
      return null
   }, [orders, id])

   const getIngredients =
      useCallback((id) => {
         return ingredients.find((item) => item._id === id)
      }, [ingredients])

   const totalIngredients = useMemo(() => card?.ingredients.map((id) => getIngredients(id)), [card, getIngredients])

   const finallyIngredients = useMemo(() => {
      if (!totalIngredients)
         return []
      const sorted = totalIngredients.sort((a, b) => {
         if (a.name < b.name)
            return -1
         if (a.name > b.name)
            return 1
         return 0
      })

      const uniqArr = []

      for (let i = 0; i < sorted.length; i++) {
         if (sorted[i].name !== sorted[i + 1]?.name) {
            uniqArr.push(sorted[i])
         }
      }

      for (let i = 0; i < uniqArr.length; ++i) {

         let count = 0

         totalIngredients.forEach((e) => {
            if (e.name === uniqArr[i].name) {
               count++
               uniqArr[i].count = count
            }
         })
      }

      return uniqArr
   }, [totalIngredients])

   const status = useMemo(() => {
      if (!card)
         return "готовится"
      return "готово"
   }, [card])

   const countTotalPrice = (arr, sum = 0) => {
      for (let { price } of arr)
         sum += price
      return sum
   }

   const creatTime = useMemo(() => {
      if (!card)
         return
      return new Date(card.createdAt).toLocaleString()
   }, [card])

   return (
      !orders && !card && ingredients ? <Loader /> :
         <div className={styles.container_info}>
            <p className={styles.number}>#{card.number}</p>
            <h2 className={styles.h2}>{card.name}</h2>
            <p className={styles.span}>{status}</p>
            <h3 className={styles.h3}>Состав:</h3>
            <ul className={styles.ul}>
               {finallyIngredients.map((item, index) => (
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