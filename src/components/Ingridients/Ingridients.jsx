import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientsPropTypes } from "../../utils/types"
import styles from "./Ingridients.module.css"
import PropTypes from "prop-types"

export const Ingridients = ({ingridients, onOpen}) => {

   const ingredientItem = ingridients.map((item) => (
      < li className={styles.card} key={item._id} >
         <img className={styles.img} src={item.image} alt={item.name} onClick={() => onOpen(item)} />
         <div className={styles.div}>
            <p className={styles.price}>{item.price}</p>
            <CurrencyIcon type="primary" />
         </div>
         <p className={styles.name}>{item.name}</p>
      </li>
   ))

   return (
      <ul className={styles.ul}>
         {ingredientItem}
      </ul>
   )
}

Ingridients.propTypes = {
   ingridients: ingredientsPropTypes.isRequired,
   onOpen: PropTypes.func.isRequired
}
