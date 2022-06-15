import { forwardRef } from "react"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
//import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
// import { ingredientsPropTypes } from "../../utils/types"
import styles from "./Ingridients.module.css"
// import PropTypes from "prop-types"
// import { useDrag } from "react-dnd"
//import { useSelector } from "react-redux"


export const Ingridients = forwardRef(({ ingridients, onOpen }, ref) => {


   // const { ingredients } = useSelector(state => state.Ingridients)
   // console.log(ref)

   const ingredientItem = ingridients.map((item) => (
      < li className={styles.card} key={item._id} >

         <img className={styles.img} src={item.image} alt={item.name} onClick={() => onOpen(item)} />
         {/* <BurgerItem /> */}
         <div className={styles.div}>
            <p className={styles.price}>{item.price}</p>
            {/* <Counter /> */}
            <CurrencyIcon type="primary" />
         </div>
         <p className={styles.name}>{item.name}</p>
      </li>
   ))

   return (
      <ul ref={ref} className={styles.ul}>
         {ingredientItem}
      </ul>
   )
})


// Ingridients.propTypes = {
//    ingridients: ingredientsPropTypes.isRequired,
//    onOpen: PropTypes.func.isRequired
// }

// export const BurgerItem = () => {

//    const { ingredients } = useSelector(state => state.ingredients)
// //   const id = ingredients._id

//    console.log(ingredients._id)
//    const { dragRef} = useDrag({
//       type: "ingredients",
//       item: {  }
//    })

//    return (
//       <div ref={dragRef}>

//       </div>

//    )
// }