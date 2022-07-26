import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./OrderInfo.module.css"

export const OrderInfo = () => {

   const { ingredients } = useSelector(state => state.ingredients)
   const { orders } = useSelector(state => state.ws)

   const { id } = useParams()

   const card = orders.find((el) => el._id === id)

   console.log(card)

   const getStatus = (card) => {
      if (card.status === "done")
         return "готово"
      return "будет нормальный api, будет нормальный статус"
   }

   const getIngredients = (id) => {
      return ingredients.find((item) => item._id === id)
   }

   const totalIngredients = card.ingredients.map((id) => {
      return getIngredients(id)
   })

   console.log(totalIngredients)

   const countTotalPrice = (arr, sum = 0) => {
      for (let { price } of arr)
         sum += price
      return sum
   }

   console.log(card.ingredients)

   return (
      <div className={styles.container_info}>
         <p className={styles.number}>{card.number}</p>
         <h2 className={styles.h2}>{card.name}</h2>
         <p className={styles.span}>{getStatus(card)}</p>
         <h3 className={styles.h3}>Состав:</h3>
         <ul className={styles.ul}>
            {totalIngredients.map((item, index) => (
               <li className={styles.li} key={index}>
                  <img className={styles.image}
                     src={item.image_mobile} alt={item.name} />
                  <p className={styles.name}>{item.name}</p>
                  <div className={styles.container}>
                     <p className={styles.text}>1 x {item.price}</p>
                     <CurrencyIcon />
                  </div>
               </li>
            ))}
         </ul>
         <div className={styles.container_total}>
            <p className={styles.data}>{card.updatedAt}</p>
            <div className={styles.total}>
               <p className={styles.text}>{countTotalPrice(totalIngredients)}</p>
               <CurrencyIcon />
            </div>
         </div>
      </div>
   )
}