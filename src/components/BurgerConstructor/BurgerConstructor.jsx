import ConstructorStyles from "./BurgerConstructor.module.css"
import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorList } from "../ConstructorList/ConstructorList"
//import { ingredientsPropTypes } from "../../utils/types"
//import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { onDemandOrder } from "../../utils/api"
//import { useCallback, useMemo } from "react"
import { useMemo } from "react"

import {
   //  GET_ORDER_REQUEST,
   GET_ORDER_SUCCESS,
   //  GET_ORDER_FAILED
} from "../../services/reducers/order"

import {
   ADD_ITEM
} from "../../services/reducers/dnd"

import { useDrop } from "react-dnd"


export const BurgerConstructor = ({ onOpen }) => {

   const { ingredients } = useSelector(state => state.ingredients)

   const dispatch = useDispatch()

   //   console.log(ingredients)
   // const [ingredientss, setIngredients] = useState(ingredients)

   const [, dropTarget] = useDrop({
      accept: "ingredients",
      drop(item) {
         dispatch({
            type: ADD_ITEM,
            data: item.item
         })
         //        console.log(item)
         // setIngredients([...ingredientss, item])
      },
      collect: monitor => ({
         isHover: monitor.isOver(),
      })
   })

   // console.log(ingredientss)

   const { items } = useSelector(state => state.dnd)

   console.log(items)

   // let a =[...items]

   console.log(ingredients)
   // console.log(a)


   const buns = useMemo(() =>
      ingredients.filter((item) => item.type === "bun"),
      [ingredients])

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


   // useCallback(
   //    () => {
   //       sendOrder()
   //    }, )
   // useCallback(
   //    () => {
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
      buns.length > 0 &&
      <section className={ConstructorStyles.section} ref={dropTarget}>
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
            <ConstructorList />
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
            <p className={ConstructorStyles.value}>{totalPrice(items)}</p>
            <div className={ConstructorStyles.icon} >
               <CurrencyIcon />
            </div>
            <div className="pr-4 pl-10">
               <Button type="primary" size="large" onClick={sendOrder}>Оформить заказ</Button>
            </div>
         </div>
      </section>
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