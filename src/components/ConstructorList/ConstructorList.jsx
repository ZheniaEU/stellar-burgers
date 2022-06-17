import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { useSelector } from "react-redux"
//import { ingredientsPropTypes } from "../../utils/types"
import style from "./ConstructorList.module.css"

export const ConstructorList = ({ handleDellItem }) => {

   const { fillings } = useSelector(state => state.dnd)


   return (
      fillings.map((item) => item.type !== "bun" && (
         <li className={style.li} key={item.id}>
            <div className={style.div}>
               <div className={`mr-2`}>
                  <DragIcon />
               </div>
               <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                  handleClose={() => handleDellItem(item.id)}
                  // handleClose={() => console.log("здеся")}
               />
            </div>
         </li>
      ))
   )
}

// ConstructorList.propTypes = {
//    fillings: ingredientsPropTypes.isRequired
// }