import { useState } from "react"
import { Ingridients } from "../Ingridients/Ingridients"
import ingredientsStyles from "./BurgerIngredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { ingredientsPropTypes } from "../../utils/types"
import PropTypes from "prop-types"

export const BurgerIngredients = ({ data, onOpen }) => {

   const [current, setCurrent] = useState("one")

   const buns = data.filter((item) => {
      return item.type === "bun"
   })
   const sauces = data.filter((item) => {
      return item.type === "sauce"
   })
   const fillings = data.filter((item) => {
      return item.type === "main"
   })

   const handleClick = (id) => {
      setCurrent(id)
      const anchor = document.getElementById(id)
      anchor.scrollIntoView({ behavior: "smooth" })
   }

   return (
      <section className={ingredientsStyles.section}>
         <h1 className={ingredientsStyles.title}>Соберите бургер</h1>
         <nav className={ingredientsStyles.nav}>
            <Tab value="one" active={current === "one"} onClick={() => handleClick("one")}>Булки</Tab>
            <Tab value="two" active={current === "two"} onClick={() => handleClick("two")}>Соусы</Tab>
            <Tab value="three" active={current === "three"} onClick={() => handleClick("three")}>Начинки</Tab>
         </nav>
         <article className={ingredientsStyles.article}>
            <h2 className={ingredientsStyles.subtitle} id="one">Булки</h2>
            <Ingridients ingridients={buns} onOpen={onOpen} />
            <h2 className={ingredientsStyles.subtitle} id="two">Соусы</h2>
            <Ingridients ingridients={sauces} onOpen={onOpen} />
            <h2 className={ingredientsStyles.subtitle} id="three">Начинки</h2>
            <Ingridients ingridients={fillings} onOpen={onOpen} />
         </article>
      </section>
   )
}

BurgerIngredients.propTypes = {
   data: ingredientsPropTypes.isRequired,
   onOpen: PropTypes.func.isRequired
}