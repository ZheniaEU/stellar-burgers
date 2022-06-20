import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { ConstructorList } from "../ConstructorList/ConstructorList"
import { ingredientsPropTypes } from "../../utils/types"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { onDemandOrder } from "../../utils/api"
import { useDrop } from "react-dnd"
import ConstructorStyles from "./BurgerConstructor.module.css"
import { GET_ORDER_SUCCESS } from "../../services/actions/index"
import { useMemo } from "react"

import {
   ADD_FILLINGS,
   ADD_BUN,
   DELETE_ITEM
} from "../../services/actions/index"

export const BurgerConstructor = ({ onOpen }) => {

   const { ingredients } = useSelector(state => state.ingredients)
   const { bun, fillings } = useSelector(state => state.dnd)

   const dispatch = useDispatch()

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

   const countTotalPrice = useMemo(() =>
      (bun, fillings, sum = 0) => {
         for (let { price } of fillings)
            sum += price
         return sum + ((bun.price || 0) * 2)
      }, [])

   const countTotalIngredients = (ingredients, mass = []) => {
      for (let { _id } of ingredients)
         mass.push(_id)
      return mass
   }

   const sendOrder = () => {
      onDemandOrder(countTotalIngredients(ingredients))
         .then(res => {
            dispatch({ type: GET_ORDER_SUCCESS, data: res.order.number })
         })
      onOpen()
   }

   return (
      <section className={ConstructorStyles.section} ref={dropTarget} >
         {bun.length === 0 ? (
            <div className={ConstructorStyles.z} >
               <p>Заглушка для верхней булки</p>
               <p>нужно перетащить сюда  </p>
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
               <p> Заглушка для ингредиетов</p>
               <p>нужно перетащить сюда  </p>
            </div>
         ) : (
            <ul className={ConstructorStyles.list} >
               {fillings.map((item, index) => (
                  < ConstructorList
                     key={item.id}
                     id={item.id}
                     filling={item}
                     index={index}
                     handleDellItem={deleteItem}
                  />
               ))}
            </ul>
         )}

         {bun.length === 0 ? (
            <div className={ConstructorStyles.z}  >
               <p> Заглушка для нижней булки  </p>
               <p>нужно перетащить сюда  </p>
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
         <div className={ConstructorStyles.total}>
            <p className={ConstructorStyles.value}>{countTotalPrice(bun, fillings)}</p>
            <div className={ConstructorStyles.icon} >
               <CurrencyIcon />
            </div>
            <div className="pr-4 pl-10">
               <Button type="primary" size="large" onClick={sendOrder}
                  disabled={(bun.length === 0) || (fillings.length === 0)} >Оформить заказ</Button>
            </div>
         </div>
      </section >
   )
}

BurgerConstructor.propTypes = {
   buns: PropTypes.object,
   fillings: PropTypes.object,
   ingredients: ingredientsPropTypes,
   onOpen: PropTypes.func.isRequired
}