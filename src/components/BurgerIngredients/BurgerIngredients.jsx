import { useMemo, useState, useEffect } from "react"
import { Ingredients } from "../Ingredients/Ingredients"
import styles from "./BurgerIngredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useInView } from "react-hook-inview"
import { ingredientsPropTypes } from "../../utils/types"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { Loader } from "../Loader/Loader"


export const BurgerIngredients = ({ onOpen }) => {

   const { ingredients, isLoading } = useSelector(state => state.ingredients)

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

   /**Варнинг в консоли из-за этого хука, безпонятия как убрать этот варнинг
    *  и сделать корректно или как то реализовать по другому */
   const [bunsRef, inViewBuns] = useInView(
      { threshold: 0.1, trackVisibility: true, delay: 150 })
   const [saucesRef, inViewSauces] = useInView(
      { threshold: 0.1, trackVisibility: true, delay: 150 })
   const [fillingRef, inViewFilling] = useInView(
      { threshold: 0.1, trackVisibility: true, delay: 150 })

   useEffect(() => {
      if (inViewBuns) {
         setCurrent("one")
      } else if (inViewSauces) {
         setCurrent("two")
      } else if (inViewFilling) {
         setCurrent("three")
      }
   }, [inViewBuns, inViewSauces, inViewFilling])

   const handleClick = (id) => {
      setCurrent(id)
      const anchor = document.getElementById(id)
      if (anchor) anchor.scrollIntoView({ behavior: "smooth" })
   }

   return (
      isLoading ? < Loader /> :
         <section className={styles.section}>
            <h1 className={styles.title}>Соберите бургер</h1>
            <nav className={styles.nav}>
               <Tab value="one" active={current === "one"} onClick={() => handleClick("one")}>Булки</Tab>
               <Tab value="two" active={current === "two"} onClick={() => handleClick("two")}>Соусы</Tab>
               <Tab value="three" active={current === "three"} onClick={() => handleClick("three")}>Начинки</Tab>
            </nav>
            <article className={styles.article}>
               <h2 className={styles.subtitle} id="one">Булки</h2>
               <ul className={styles.ul} ref={bunsRef}>
                  {buns.map((item) => (
                     <Ingredients ingredients={buns} onOpen={onOpen} item={item} key={item._id} />
                  ))}
               </ul>
               <h2 className={styles.subtitle} id="two">Соусы</h2>
               <ul className={styles.ul} ref={saucesRef}>
                  {sauces.map((item) => (
                     <Ingredients ingredients={sauces} onOpen={onOpen} item={item} key={item._id} />
                  ))}
               </ul>
               <h2 className={styles.subtitle} id="three">Начинки</h2>
               <ul className={styles.ul} ref={fillingRef}>
                  {fillings.map((item) => (
                     <Ingredients ingredients={fillings} onOpen={onOpen} item={item} key={item._id} />
                  ))}
               </ul>
            </article>
         </section >

   )
}

BurgerIngredients.propTypes = {
   ingredients: ingredientsPropTypes,
   onOpen: PropTypes.func.isRequired
}
