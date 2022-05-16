import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientsPropTypes } from "../../utils/types"
import style from "./ConstructorList.module.css"

export const ConstructorList = ({ data }) => {
   return (
      data.map((item) => item.type !== "bun" && (
         <li className={style.li} key={item._id}>
            <div className={style.div}>
               <div className={`mr-2`}>
                  <DragIcon />
               </div>
               <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
               />
            </div>
         </li>
      ))
   )
}

ConstructorList.propTypes = {
   data: ingredientsPropTypes.isRequired
}