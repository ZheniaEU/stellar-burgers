import { forwardRef } from "react"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
// import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientsPropTypes } from "../../utils/types"
import styles from "./Ingredients.module.css"
import PropTypes from "prop-types"
import { useDrag } from "react-dnd"
//import { useSelector } from "react-redux"


export const Ingredients = forwardRef(({ ingredients, onOpen }, ref) => {


   // const { ingredients } = useSelector(state => state.Ingridients)
   // console.log(ingredients)

   // const totalIngredients = (ingredients, mass = []) => {
   //    for (let { _id } of ingredients)
   //       mass.push(_id)
   //    return mass
   // }

   // const id = totalIngredients(ingredients)
   // console.log(id)

   // //  const id = ingredients._id

   // const [, dragRef] = useDrag({
   //    type: "ingredients",
   //    item: { id },
   //    collect: monitor => ({
   //       isDrag: monitor.isDragging(),
   //       // isHover: monitor.isOver()

   //    })
   // })

   // const ingredienta = ingredients.forEach((item) => {
   //    return item
   // })



   //   isDrag={isDrag} isHover={isHover}  ref={dragRef}
   const ingredientItem = ingredients.map((item) => (
      // < li className = { styles.card } key = { item._id } >
      <BurgerItem item={item} onOpen={onOpen} key={item._id}>
         {/* <img className={styles.img} src={item.image} alt={item.name} onClick={() => onOpen(item)} /> */}

         {/* <div className={styles.div}> */}
         {/* <p className={styles.price}>{item.price}</p> */}
         {/* <Counter /> */}
         {/* <CurrencyIcon type="primary" /> */}
         {/* </div> */}
         {/* <p className={styles.name}>{item.name}</p> */}
      </BurgerItem>
      // </li >


   ))

   return (

      <ul className={styles.ul}>
         {ingredientItem}
      </ul>
   )
})


Ingredients.propTypes = {
   ingredients: ingredientsPropTypes.isRequired,
   onOpen: PropTypes.func.isRequired
}

export const BurgerItem = ({ item, onOpen }) => {



   // console.log(item)

   const [, dragRef] = useDrag({
      type: "ingredients",
      item: { item },
      end: (item, monitor) => {
         // console.log(item, monitor)
      },
      collect: monitor => ({

         isDrag: monitor.isDragging()
         // isHover: monitor.isOver()

      })
   })



   return (
      // isDrag &&
      // <div ref={dragRef} isDrag={isDrag} isHover={isHover} >

      <>
         < li className={styles.card} ref={dragRef} >
            <img className={styles.img} src={item.image} alt={item.name} onClick={() => onOpen(item)} />

            <div className={styles.div}>
               <p className={styles.price}>{item.price}</p>
               {/* <Counter /> */}
               <CurrencyIcon type="primary" />
            </div>
            <p className={styles.name}>{item.name}</p>
            {/* </div> */}
         </li>
      </>
      // </li>

   )
}