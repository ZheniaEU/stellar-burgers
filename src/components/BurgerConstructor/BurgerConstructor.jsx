import ConstructorStyles from "./BurgerConstructor.module.css"
import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorList } from "./ConstructorList"
import { ingredientsPropTypes } from "../../utils/types"
import PropTypes from "prop-types"

export const BurgerConstructor = (props) => {

   const { data, onOpen } = props

   return (
      data.length > 0 &&
      <section className={ConstructorStyles.section}>
         <div className={` ${ConstructorStyles.bun} mb-4 pr-4`}>
            <ConstructorElement
               type="top"
               isLocked={true}
               text={`${data[0].name} (верх)`}
               price={data[0].price}
               thumbnail={data[0].image_mobile}
            />
         </div>
         <ul className={ConstructorStyles.list} >
            <ConstructorList data={data} />
         </ul>
         <div className={` ${ConstructorStyles.bun} mb-10 pr-4`}>
            <ConstructorElement
               type="bottom"
               isLocked={true}
               text={`${data[0].name} (низ)`}
               price={data[0].price}
               thumbnail={data[0].image_mobile}
            />
         </div>
         <div className={ConstructorStyles.total}>
            <p className={ConstructorStyles.value}>8600</p>
            <div className={ConstructorStyles.icon} >
               <CurrencyIcon />
            </div>
            <div className="pr-4 pl-10">
               <Button type="primary" size="large" onClick={onOpen}>Оформить заказ</Button>
            </div>
         </div>
      </section>
   );
}

BurgerConstructor.propTypes = {
   data: ingredientsPropTypes.isRequired,
   onOpen: PropTypes.func.isRequired
}