import ConstructorStyles from "./BurgerConstructor.module.css"
import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorList } from "../ConstructorList/ConstructorList"
//import { ingredientsPropTypes } from "../../utils/types"
//import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { onDemandOrder } from "../../utils/api"
import { useCallback } from "react"

export const BurgerConstructor = (props) => {

   const { onOpen } = props

   const { ingredients } = useSelector(state => state.ingredients)

   const buns = ingredients.filter((item) => {
      return item.type === "bun"
   })

   const totalPrice = (ingredients, sum = 0) => {
      for (let { price, type } of ingredients)
         sum += price * (type === "bun" ? 2 : 1)
      return sum
   }
   const totalIngredients = (ingredients, mass = []) => {
      for (let { _id } of ingredients)
         mass.push(_id)
      return mass
   }

   const sendOrder = () => {
      setTimeout(() => {
         onDemandOrder(totalIngredients(ingredients))
            .then(res => {
               console.log(res.order)
            })
      }, 2000)

   }

   useCallback(
      () => {


      })

      sendOrder()

   // const totalPrice = (ingredients, sum = 0) => {
   //    for (let { price } of ingredients)
   //       sum += price
   //    return sum
   // }

   // //это в днд

   return (
      buns.length > 0 &&
      <section className={ConstructorStyles.section}>
         <div className={` ${ConstructorStyles.bun} mb-4 pr-4`}>
            <ConstructorElement
               type="top"
               isLocked={true}
               text={`${buns[0].name} (верх)`}
               price={buns[0].price}
               thumbnail={buns[0].image_mobile}
            />
         </div>
         <ul className={ConstructorStyles.list} >
            <ConstructorList data={ingredients} />
         </ul>
         <div className={` ${ConstructorStyles.bun} mb-10 pr-4`}>
            <ConstructorElement
               type="bottom"
               isLocked={true}
               text={`${buns[0].name} (низ)`}
               price={buns[0].price}
               thumbnail={buns[0].image_mobile}
            />
         </div>
         <div className={ConstructorStyles.total}>
            <p className={ConstructorStyles.value}>{totalPrice(ingredients)}</p>
            <div className={ConstructorStyles.icon} >
               <CurrencyIcon />
            </div>
            <div className="pr-4 pl-10">
               <Button type="primary" size="large" onClick={onOpen}>Оформить заказ</Button>
            </div>
         </div>
      </section>
   )
}

// BurgerConstructor.propTypes = {
//    data: ingredientsPropTypes.isRequired,
//    onOpen: PropTypes.func.isRequired
// }