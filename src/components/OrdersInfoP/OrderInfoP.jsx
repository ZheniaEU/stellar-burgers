/* eslint-disable */
import { useCallback, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../Loader/Loader"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./OrderInfoP.module.css"
import { WS_CONNECTION_CLOSED, WS_CONNECTION_INIT } from "../../services/reducers/ws"

export const OrderInfoP = () => {

   const { ingredients } = useSelector(state => state.ingredients)
   const { orders } = useSelector(state => state.ws)
   const dispatch = useDispatch()

   useEffect(() => {
      if (!orders) {
         dispatch({
            type: WS_CONNECTION_INIT,  payload: `?token=${getCookie("accessToken")}`
         })

          return () => {
             dispatch({ type: WS_CONNECTION_CLOSED })
          }
      }
   }, [dispatch, orders])

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

   const pesel2 = (arr) => {
      const obj = {}

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

   const creatTime = useMemo(() => {
      if (!card)
         return
      return new Date(card.createdAt).toLocaleString()
   }, [card])

   console.log(ingredients)
   console.log(orders)
   console.log(card)

   return (
      !card ? <Loader /> :
         <div className={styles.container_info}>
            <p className={styles.number}>#{card.number}</p>
            <h2 className={styles.h2}>{card.name}</h2>
            <p className={styles.span}>{status}</p>
            <h3 className={styles.h3}>????????????:</h3>
            <ul className={styles.ul}>
               {pesel2(totalIngredients).map((item, index) => (
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



// const finallyIngredients = useMemo(() => {
//    if (!totalIngredients)
//       return []
//    const sorted = totalIngredients.sort((a, b) => {
//       if (a.name < b.name)
//          return -1
//       if (a.name > b.name)
//          return 1
//       return 0
//    })

//    const uniqArr = []

//    for (let i = 0; i < sorted.length; i++) {
//       if (sorted[i].name !== sorted[i + 1]?.name) {
//          uniqArr.push(sorted[i])
//       }
//    }

//    for (let i = 0; i < uniqArr.length; ++i) {

//       let count = 0

//       totalIngredients.forEach((e) => {
//          if (e.name === uniqArr[i].name) {
//             count++
//             uniqArr[i].count = count
//          }
//       })
//    }

//    return uniqArr
// }, [totalIngredients])

// const status = useMemo(() => {
//    if (!card)
//       return "??????????????????"
//    return "????????????"
// }, [card])
