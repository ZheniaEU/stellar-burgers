import { forwardRef } from "react"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
// import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientsPropTypes } from "../../utils/types"
import styles from "./Ingredients.module.css"
import PropTypes from "prop-types"
import { useDrag } from "react-dnd"
//import { useSelector } from "react-redux"


export const Ingridients = forwardRef(({ ingredients, onOpen }, ref) => {


   // const { ingredients } = useSelector(state => state.Ingridients)
   // console.log(ref)

   // const totalIngredients = (ingredients, mass = []) => {
   //    for (let { _id } of ingredients)
   //       mass.push(_id)
   //    return mass
   // }

   // let a = totalIngredients(ingredients)
   // console.log(a)

   //  const id = ingredients._id

   const [, dragRef] = useDrag({
      type: "ingredients",
      item: {},
      collect: monitor => ({
         isDrag: monitor.isDragging(),
         // isHover: monitor.isOver()

      })
   })
   //   isDrag={isDrag} isHover={isHover}
   const ingredientItem = ingredients.map((item) => (
      < li className={styles.card} key={item._id} ref={dragRef} >

         <img className={styles.img} src={item.image} alt={item.name} onClick={() => onOpen(item)} />
         {/* <BurgerItem id={item} /> */}
         <div className={styles.div}>
            <p className={styles.price}>{item.price}</p>
            {/* <Counter /> */}
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
})


Ingridients.propTypes = {
   ingredients: ingredientsPropTypes.isRequired,
   onOpen: PropTypes.func.isRequired
}

// export const BurgerItem = ({ id }) => {

//    // const { ingredients } = useSelector(state => state.ingredients)
//    // //   const id = ingredients._id

//    // const totalIngredients = (ingredients, mass = []) => {
//    //    for (let { _id } of ingredients)
//    //       mass.push(_id)
//    //    return mass
//    // }
//    // totalIngredients(ingredients)
//    //console.dir(useDrag)
// console.log(id)

//    const [{ isDrag, isHover }, dragRef] = useDrag({
//       type: "ingredients",
//       item: { id },
//       collect: monitor => ({
//          isDrag: monitor.isDragging(),
//          // isHover: monitor.isOver()

//       })
//    })

//    return (
//       isDrag &&
//       <div ref={dragRef} isDrag={isDrag} isHover={isHover} >

//       </div>

//    )
// }