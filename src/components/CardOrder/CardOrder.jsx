import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Loader } from "../Loader/Loader"
import styles from "./CardOrder.module.css"

export const CardOrder = ({ onOpen, item, arr, url }) => {

   const { ingredients } = useSelector(state => state.ingredients)
   const location = useLocation()

   if (!item && ingredients) {
      return (
         <Loader />
      )
   }

   const id = item._id

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
      <li className={styles.li} onClick={() => onOpen()}>
         <Link className={styles.link}
            to={{ pathname: `/${url}/${id}`, state: { background: location } }}>
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
         </Link>
      </li>
   )
}