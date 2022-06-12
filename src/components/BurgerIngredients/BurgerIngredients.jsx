import { useMemo, useState } from "react"
import { Ingridients } from "../Ingridients/Ingridients"
import ingredientsStyles from "./BurgerIngredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
//import { ingredientsPropTypes } from "../../utils/types"
//import PropTypes from "prop-types"
import { useSelector } from "react-redux"

export const BurgerIngredients = ({ onOpen }) => {

   const { ingredients } = useSelector(state => state.ingredients)

   const [current, setCurrent] = useState("one")

   const buns = useMemo(() =>
      ingredients.filter((item) => item.type === "bun"),
      [ingredients])

   const sauces = useMemo(() =>
      ingredients.filter((item) => item.type === "sauce"),
      [ingredients])

   const fillings = useMemo(() =>
      ingredients.filter((item) => item.type === "main"),
      [ingredients])

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

// BurgerIngredients.propTypes = {
//    data: ingredientsPropTypes.isRequired,
//    onOpen: PropTypes.func.isRequired
// }