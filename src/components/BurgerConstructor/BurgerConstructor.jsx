import ConstructorStyles from "./BurgerConstructor.module.css"
import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorList } from "../ConstructorList/ConstructorList"
import { ingredientsPropTypes } from "../../utils/types"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

export const BurgerConstructor = (props) => {

   const { data, onOpen } = props

   const { ingredients } = useSelector(state => state.ingredients)

   const buns = data.filter((item) => {
      return item.type === "bun"
   })

   const totalPrice = (ingredients, sum = 0) => {
      for (let { price, type } of ingredients)
         sum += price * (type == "bun" ? 2 : 1)
      return sum
   }

   //   const f1 = ingredients => ingredients.reduce((p, { price: c, type: m }) => p + c * (m == "bun" ? 2 : 1), 0)

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
            <ConstructorList data={data} />
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

BurgerConstructor.propTypes = {
   data: ingredientsPropTypes.isRequired,
   onOpen: PropTypes.func.isRequired
}