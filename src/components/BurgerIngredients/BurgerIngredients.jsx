import React from "react"
import { useState } from "react"
import ingredientsStyles from "./BurgerIngredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { data } from "../../utils/data"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"

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
      <section className={ingredientsStyles.section}>
         <h1 className={ingredientsStyles.title}>Соберите бургер</h1>
         <nav className={ingredientsStyles.nav}>
            <Tab value="one" active={current === "one"} onClick={setCurrent}>Булки</Tab>
            <Tab value="two" active={current === "two"} onClick={setCurrent}>Соусы</Tab>
            <Tab value="three" active={current === "three"} onClick={setCurrent}>Начинки</Tab>
         </nav>
         <article className={ingredientsStyles.article}>
            <h2>Булки</h2>
            <Ingridients ingridients={buns} />
            <h2>Соусы</h2>
            <Ingridients ingridients={sauces} />
            <h2>Начинки</h2>
            <Ingridients ingridients={fillings} />
         </article>
      </section>
   );
};

const Ingridients = ({ ingridients }) => {
   const ingredientItem = ingridients.map((item) => (
      < li className={ingredientsStyles.card} key={item._id} >
         <img className={ingredientsStyles.img} src={item.image} alt={item.name} />
         <div className={ingredientsStyles.div}>
            <p className={ingredientsStyles.price}>{item.price}</p>
            <CurrencyIcon type="primary" />
         </div>
         <p>{item.name}</p>
      </li>
   ))

   return (
      <ul className={ingredientsStyles.ul}>
         {ingredientItem}
      </ul>
   )
}
