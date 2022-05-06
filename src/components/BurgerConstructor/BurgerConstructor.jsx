import ConstructorStyles from "./BurgerConstructor.module.css"
import { Button, CurrencyIcon, LockIcon, DeleteIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { data } from "../../utils/data"

export const BurgerConstructor = () => {
   return (
      <section className={ConstructorStyles.w}>

         <LockIcon type="primary" />
         <ul className={ConstructorStyles.ul}>
         <DragIcon type="primary" ml-2 />
            <li className={`${ConstructorStyles.li} + "" + ${ConstructorStyles.center}`}>
               <img className={ConstructorStyles.img} src="" alt="" />
               <p className={ConstructorStyles.text}></p>
               <div className={ConstructorStyles.div}>
                  <p className={ConstructorStyles.price}></p>
                  <CurrencyIcon type="primary" />
                  <DeleteIcon type="primary" />
               </div>
            </li>
         </ul>
         <Button >Жизнь без БЭМ прекрасна</Button>
      </section>
   );
}
