import React from "react"
import { useState } from 'react'
import IngredientsStyles from "./BurgerIngredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { data } from '../../utils/data'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export const BurgerIngredients = ({ props }) => {
   const [current, setCurrent] = useState("one")
   // console.log(...props)
   // let ingridients {type} = {...props.data.type}

   const buns = data.filter((item) => {
      return item.type === "bun"
   })
   const sauces = data.filter((item) => {
      return item.type === "sauce"
   })
   const fillings = data.filter((item) => {
      return item.type === "main"
   })

   console.log(buns, sauces, fillings)

   return (
      <section className={IngredientsStyles.section}>
         <h1 className={IngredientsStyles.title}>Соберите бургер</h1>
         <nav className={IngredientsStyles.nav}>
            <Tab value="one" active={current === "one"} onClick={setCurrent}>Булки</Tab>
            <Tab value="two" active={current === "two"} onClick={setCurrent}>Соусы</Tab>
            <Tab value="three" active={current === "three"} onClick={setCurrent}>Начинки</Tab>
         </nav>
         <ul>
            <h2>Булки</h2>
            <Ingridients Ingridients={buns} />
            <h2>Соусы</h2>
            <Ingridients Ingridients={sauces} />
            <h2>Начинки</h2>
            <Ingridients Ingridients={fillings} />
         </ul>
      </section>
   );
};

const Ingridients = () => {
   return (
      <li>

         <img src="" alt="" />
         <p></p>
         <p></p>
      </li>
   )
}