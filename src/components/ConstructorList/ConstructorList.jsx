import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
//import { useDrag, useDrop } from "react-dnd"
import { useSelector } from "react-redux"
//import { ingredientsPropTypes } from "../../utils/types"
import { useDrag, useDrop } from "react-dnd"
import { useRef } from "react"
import { useCallback } from "react"
//import { forwardRef } from "react"
import style from "./ConstructorList.module.css"

export const ConstructorList = ({ handleDellItem }, props) => {

   const { fillings } = useSelector(state => state.dnd)

   const { item, index } = props

   const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex]
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          }),
        )
      },
      [cards],
    )

   // const [, dragFillings] = useDrag({
   //    type: "fillings",
   //    item: {},
   //    collect: monitor => ({
   //       isDrag: monitor.isDragging()
   //    })
   // })


   // const [, dropFillings] = useDrop ({
   //    accept:"fillings",
   //    drop(item) {console.log(item)},
   //    collect: monitor => ({
   //       isHover: monitor.isOver()
   //    })
   // })
   //export const Card: React.FC<CardProps> = ({ id, text, index, moveCard }) => {

   const [{ isDragging }, drag] = useDrag({
      tyoe: "fillings",
      item: item,
      collect: monitor => ({
         isDragging: monitor.isDragging()
      })
   });

   const opacity = isDragging ? 0 : 0.999;
   const ref = useRef(null);
   const [, drop] = useDrop({
      accept: "fillings",
      hover(item) {
         if (!ref.current) {
            return;
         }
         const dragIndex = item.index;
         const hoverIndex = index;
         if (dragIndex === hoverIndex) {
            return;
         }
         const hoverBoundingRect = ref.current?.getBoundingClientRect();
         const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
         const clientOffset = monitor.getClientOffset();
         const hoverClientY = (clientOffset).y - hoverBoundingRect.top;
         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
         }
         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
         }
         moveCard(dragIndex, hoverIndex);
         item.index = hoverIndex;
      }
   });

   drag(drop(ref))
   //    return (
   //      <div ref={ref} style={{ ...style, opacity }}>
   //        {text}
   //      </div>
   //    );
   //  };

   //   dragFillings(dropFillings(ref))


   return (
      fillings.map((item, index) => item.type !== "bun" && (
         <li className={style.li} key={item.id} index={index} ref={drag(drop(ref))}>
            <div className={style.div}>
               <div className={`mr-2`}>
                  <DragIcon />
               </div>
               <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                  handleClose={() => handleDellItem(item.id)}
                  moveCard={moveCard}
               // handleClose={() => console.log(index)}
               />
            </div>
         </li>
      ))
   )
}

// ConstructorList.propTypes = {
//    fillings: ingredientsPropTypes.isRequired
// }