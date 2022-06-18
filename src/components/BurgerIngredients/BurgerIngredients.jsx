//import { useEffect, useMemo, useState } from "react"
import { useMemo, useState } from "react"
import { Ingredients } from "../Ingredients/Ingredients"
import styles from "./BurgerIngredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
//import { useInView } from "react-hook-inview"
//import { ingredientsPropTypes } from "../../utils/types"
//import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { Loader } from "../Loader/Loader"


export const BurgerIngredients = ({ onOpen }) => {


   const { ingredients, isLoading } = useSelector(state => state.ingredients)

   const [current, setCurrent] = useState("one")

   // const buns = ingredients.filter((item) => item.type === "bun")

   const buns = useMemo(() =>
      ingredients.filter((item) => item.type === "bun"),
      [ingredients])

   const sauces = useMemo(() =>
      ingredients.filter((item) => item.type === "sauce"),
      [ingredients])

   // const sauces = ingredients.filter((item) => item.type === "sauce")

   const fillings = useMemo(() =>
      ingredients.filter((item) => item.type === "main"),
      [ingredients])

   //? как прокидывать рефы в пропсы?

   // const fillings = ingredients.filter((item) => item.type === "main")

   // const [bunsRef, inViewBuns] = useInView(
   //    { threshold: 0.1, trackVisibility: true, delay: 150 })
   // const [saucesRef, inViewSauces] = useInView(
   //    { threshold: 0.1, trackVisibility: true, delay: 150 })
   // const [fillingRef, inViewFilling] = useInView(
   //    { threshold: 0.1, trackVisibility: true, delay: 150 })

   // useEffect(() => {
   //    if (inViewBuns) {
   //       setCurrent("one")
   //    } else if (inViewSauces) {
   //       setCurrent("two")
   //    } else if (inViewFilling) {
   //       setCurrent("three")
   //    }
   // }, [inViewBuns, inViewSauces, inViewFilling])

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
               {/* <div ref={bunsRef} > */}
               <ul className={styles.ul}>
                  {buns.map((item) => (
                     <Ingredients ingredients={buns} onOpen={onOpen} item={item} key={item._id} />
                  ))}
               </ul>
               {/* </div> */}
               <h2 className={styles.subtitle} id="two">Соусы</h2>
               {/* <div ref={saucesRef} > */}
               <ul className={styles.ul}>
                  {sauces.map((item) => (
                     <Ingredients ingredients={sauces} onOpen={onOpen} item={item} key={item._id} />
                  ))}
               </ul>
               {/* </div> */}

               <h2 className={styles.subtitle} id="three">Начинки</h2>
               {/* <div ref={fillingRef}> */}
               <ul className={styles.ul}>
               {fillings.map((item) => (
                  <Ingredients ingredients={fillings} onOpen={onOpen} item={item} key={item._id} />
               ))}
            </ul>
            {/* </div> */}
         </article>
         </section >

   )
}

// BurgerIngredients.propTypes = {
//    data: ingredientsPropTypes.isRequired,
//    onOpen: PropTypes.func.isRequired
// }
