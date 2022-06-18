import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag, useDrop } from "react-dnd"
import { useRef } from "react"
import { ingredientsPropTypes } from "../../utils/types"
import { useDispatch } from "react-redux"
import style from "./ConstructorList.module.css"

import {
   MOVE_CONSTRUCTOR_ITEM
} from "../../services/reducers/dnd"

export const ConstructorList = ({ item, index, handleDellItem, id }) => {

   const dispatch = useDispatch()
   const ref = useRef(null)
   const [, drop] = useDrop({
      accept: "item",
      hover(item) {
         if (!ref.current) {
            return
         }
         const dragIndex = item.index
         const hoverIndex = index
         dispatch({
            type: MOVE_CONSTRUCTOR_ITEM,
            data: { dragIndex, hoverIndex }
         })
         item.index = hoverIndex
      }
   })

   const [{ isDragging }, drag] = useDrag({
      type: "item",
      item: { id, index },
      collect: monitor => {
         return {
            isDragging: monitor.isDragging()
         }
      }
   })

   const opacity = isDragging ? 0.5 : 1
   drag(drop(ref))

   return (

      <li className={style.li} index={index} ref={ref} style={{ opacity }} >
         <div className={style.div}>
            <div className={`mr-2`}>
               <DragIcon />
            </div>
            <ConstructorElement
               text={item.name}
               price={item.price}
               thumbnail={item.image_mobile}
               handleClose={() => handleDellItem(item.id)}
            />
         </div>
      </li>
   )
}

ConstructorList.propTypes = {
   fillings: ingredientsPropTypes.isRequired
}


/**
 * Это какой-то бесполезный кусок кода, для перемещения начинки внутри контенера.
 */
         // if (dragIndex === hoverIndex) {
         //    return
         // }
         // const hoverBoundingRect = ref.current?.getBoundingClientRect()
         // const hoverMiddleY =
         //    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
         // const clientOffset = monitor.getClientOffset()
         // const hoverClientY = (clientOffset).y - hoverBoundingRect.top
         // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
         //    return
         // }
         // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
         //    return
         // }