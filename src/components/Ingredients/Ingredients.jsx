import { useSelector } from "react-redux"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./Ingredients.module.css"
import PropTypes from "prop-types"
import { useDrag } from "react-dnd"
import { useMemo } from "react"

export const Ingredients = ({ onOpen, item }) => {

   const { bun, fillings } = useSelector(state => state.dnd)

   /**счётчик подсчёта количества ингредиентов */
   const counter = useMemo(() =>
      (count = 0) => {
         for (let { _id } of fillings)
            if (_id === item._id) count++

         if (bun && bun._id === item._id)
            return 2
         return count
      }, [bun, fillings, item._id])

   const [, dragRef] = useDrag({
      type: "ingredients",
      item: { item },
      collect: monitor => ({
         isDrag: monitor.isDragging()
      })
   })

   return (
      < li className={styles.card} ref={dragRef} >
         <div className={styles.counter} >
            {counter() > 0 && <Counter count={counter()} />}
         </div>
         <img className={styles.img} src={item.image} alt={item.name} onClick={() => onOpen(item)} />
         <div className={styles.div}>
            <p className={styles.price}>{item.price}</p>
            <CurrencyIcon type="primary" />
         </div>
         <p className={styles.name}>{item.name}</p>
      </li >
   )
}

Ingredients.propTypes = {
   item: PropTypes.object.isRequired,
   onOpen: PropTypes.func.isRequired
}
