import ConstructorStyles from "./BurgerConstructor.module.css"
import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorList } from "../ConstructorList/ConstructorList"
//import { ingredientsPropTypes } from "../../utils/types"
//import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { onDemandOrder } from "../../utils/api"
// import { useCallback, useMemo } from "react"
//import { useCallback } from "react"
//import { useMemo } from "react"
// import { useDrag, useDrop } from "react-dnd"
import { useDrop } from "react-dnd"
import {
   //  GET_ORDER_REQUEST,
   GET_ORDER_SUCCESS,
   //  GET_ORDER_FAILED
} from "../../services/reducers/order"

import {
   ADD_FILLINGS,
   ADD_BUN,
   DELETE_ITEM
} from "../../services/reducers/dnd"
//import { useRef } from "react"

//import { useDrop } from "react-dnd"



export const BurgerConstructor = ({ onOpen }) => {

   const { ingredients } = useSelector(state => state.ingredients)
   const { bun, fillings } = useSelector(state => state.dnd)

   const dispatch = useDispatch()

   //   console.log(ingredients)
   // const [ingredientss, setIngredients] = useState(ingredients)

   /**Студент поделился своим замечанием от ревьюера что нужно реализовать id без
    * использования сторонних библиотек, я конечно это одобряю, но тругого способа как
    * через Date.now я не знаю
    * Во всяком случае, мы не можем перетащить 2 ингридиента одновременно
    */
   const [, dropTarget] = useDrop({
      accept: "ingredients",
      drop(item) {
         if (item.item.type === "bun") {
            dispatch({
               type: ADD_BUN,
               data: item.item
            })
         } else {
            dispatch({
               type: ADD_FILLINGS,
               data: { ...item.item, id: Date.now() }
            })
         }
         //        console.log(item)
         // setIngredients([...ingredientss, item])
      },
      collect: monitor => ({
         isHover: monitor.isOver(),
      })
   })

   const deleteItem = (id) => {
      dispatch({
         type: DELETE_ITEM, id: id
      })
   }

   // console.log(ingredients)
   // console.log(a)


   // const buns = useMemo(() =>
   //    fillings.filter((item) => item.type === "bun"),
   //    [fillings])

   const totalPrice = (bun, fillings, sum = 0) => {
      for (let { price } of fillings)
         sum += price
      return sum + ((bun.price || 0) * 2)
   }
   // }

   const totalIngredients = (ingredients, mass = []) => {
      for (let { _id } of ingredients)
         mass.push(_id)
      return mass
   }


   const sendOrder = () => {
      //      setTimeout(() => {
      onDemandOrder(totalIngredients(ingredients))
         .then(res => {
            dispatch({ type: GET_ORDER_SUCCESS, data: res.order.number })
            //      console.log(res.order.number)
         })
      onOpen()
      //    }, 500)
   }

   return (

      <section className={ConstructorStyles.section} ref={dropTarget}>

         {bun.length === 0 ? (
            <div className={ConstructorStyles.z} >
               <p>Заглушка для верхней булки</p>
            </div>
         ) : (
            <div className={` ${ConstructorStyles.bun} mb-4 pr-4`}>
               <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image_mobile}
               />
            </div>
         )}

         {fillings.length === 0 ? (
            <div className={ConstructorStyles.z} >
               <p> Заглушка для ингредиетов  </p>
            </div>
         ) : (
            <ul className={ConstructorStyles.list} >
               {fillings.map((item, index) => (
                  < ConstructorList
                     key={item.id}
                     id={item.id}
                     item={item}
                     index={index}
                     handleDellItem={deleteItem}
                   //  moveCard={moveCard}
                  />
               ))}
            </ul>
         )}

         {bun.length === 0 ? (
            <div className={ConstructorStyles.z}  >
               <p> Заглушка для нижней булки  </p>
            </div>
         ) : (
            <div className={` ${ConstructorStyles.bun} mb-10 pr-4`}>
               <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image_mobile}
               />
            </div>
         )}
         {/* {bun.length === 0 && fillings.length === 0  ? (
            <div className={ConstructorStyles.d} >
               <p> сюда  </p>
            </div>
         ) : ( */}
         <div className={ConstructorStyles.total}>
            <p className={ConstructorStyles.value}>{totalPrice(bun, fillings)}</p>
            <div className={ConstructorStyles.icon} >
               <CurrencyIcon />
            </div>
            <div className="pr-4 pl-10">
               <Button type="primary" size="large" onClick={sendOrder}>Оформить заказ</Button>
            </div>
         </div>
         {/* )} */}
      </section >
      // )
   )
}

// BurgerConstructor.propTypes = {
//    data: ingredientsPropTypes.isRequired,
//    onOpen: PropTypes.func.isRequired
// }

// export const dropTarget = () => {


//    const [, dropTarget] = useDrop({
//       accept: "ingredients",
//       drop(itemId) {
//          dropTarget(itemId)
//       },
//    })


//    return (
//       <div ref={dropTarget}>

//       </div>
//    )
// }