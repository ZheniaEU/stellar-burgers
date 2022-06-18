import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
// import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientsPropTypes } from "../../utils/types"
import styles from "./Ingredients.module.css"
import PropTypes from "prop-types"
import { useDrag } from "react-dnd"
//import { useSelector } from "react-redux"


export const Ingredients = ({ onOpen, item }) => {

   const [, dragRef] = useDrag({
      type: "ingredients",
      item: { item },
      collect: monitor => ({
         isDrag: monitor.isDragging()
      })
   })

   return (
      < li className={styles.card} ref={dragRef} >
         <img className={styles.img} src={item.image} alt={item.name} onClick={() => onOpen(item)} />
         <div className={styles.div}>
            <p className={styles.price}>{item.price}</p>
            {/* <Counter /> */}
            <CurrencyIcon type="primary" />
         </div>
         <p className={styles.name}>{item.name}</p>
      </li >
   )
}


Ingredients.propTypes = {
   ingredients: ingredientsPropTypes.isRequired,
   onOpen: PropTypes.func.isRequired
}
