import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag, useDrop } from "react-dnd"
import { useRef } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import style from "./ConstructorList.module.css"

import {
   MOVE_CONSTRUCTOR_ITEM
} from "../../services/actions/"

export const ConstructorList = ({ filling, index, handleDellItem, id }) => {

   const dispatch = useDispatch()
   const ref = useRef(null)
   const [, drop] = useDrop({
      accept: "item",
      hover(filling) {
         if (!ref.current) {
            return
         }
         const dragIndex = filling.index
         const hoverIndex = index
         dispatch({
            type: MOVE_CONSTRUCTOR_ITEM,
            data: { dragIndex, hoverIndex }
         })
         filling.index = hoverIndex
      }
   })

   const [{ opacity }, drag] = useDrag({
      type: "item",
      item: { id, index },
      collect: monitor => {
         return {
            opacity: monitor.isDragging() ? 0.5 : 1
         }
      }
   })

   drag(drop(ref))

   return (
      <li className={style.li} index={index} ref={ref} style={{ opacity }} >
         <div className={style.div}>
            <div className={`mr-2`}>
               <DragIcon />
            </div>
            <ConstructorElement
               text={filling.name}
               price={filling.price}
               thumbnail={filling.image_mobile}
               handleClose={() => handleDellItem(id)}
            />
         </div>
      </li>
   )
}

ConstructorList.propTypes = {
   filling: PropTypes.object.isRequired,
   id: PropTypes.number.isRequired,
   index: PropTypes.number.isRequired,
   handleDellItem: PropTypes.func.isRequired
}