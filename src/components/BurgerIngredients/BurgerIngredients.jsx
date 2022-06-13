import { useEffect, useMemo, useState } from "react"
import { Ingridients } from "../Ingridients/Ingridients"
import ingredientsStyles from "./BurgerIngredients.module.css"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useInView } from 'react-hook-inview';
//import { ingredientsPropTypes } from "../../utils/types"
//import PropTypes from "prop-types"
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

   const handleClick = (id) => {
      setCurrent(id)
      const anchor = document.getElementById(id)
      anchor.scrollIntoView({ behavior: "smooth" })
   }

   const [bunsRef, inViewBuns] = useInView({ threshold: 0 })
   const [saucesRef, inViewSauces] = useInView({ threshold: 0 })
   const [fillingRef, inViewFilling] = useInView({ threshold: 0 })

   useEffect(() => {
      if (inViewBuns) {
         setCurrent("buns")
      } else if (inViewSauces) {
         setCurrent("sauces")
      } else if (inViewFilling) {
         setCurrent("fillings")
      }
   }, [inViewBuns, inViewSauces, inViewFilling])


   return (
      isLoading ? < Loader /> :
         // <div>
            <section className={ingredientsStyles.section}>
               <h1 className={ingredientsStyles.title}>Соберите бургер</h1>
               <nav className={ingredientsStyles.nav}>
                  <Tab value="buns" active={current === "buns"} onClick={() => handleClick("buns")}>Булки</Tab>
                  <Tab value="sauces" active={current === "sauces"} onClick={() => handleClick("sauces")}>Соусы</Tab>
                  <Tab value="fillings" active={current === "fillings"} onClick={() => handleClick("fillings")}>Начинки</Tab>
               </nav>
               <article className={ingredientsStyles.article}>
                  <div ref={bunsRef}>
                     <h2 className={ingredientsStyles.subtitle} id="buns">Булки</h2>
                     <Ingridients ingridients={buns} onOpen={onOpen} />
                  </div>
                  <div ref={saucesRef}>
                     <h2 className={ingredientsStyles.subtitle} id="sauces">Соусы</h2>
                     <Ingridients ingridients={sauces} onOpen={onOpen} />
                  </div>
                  <div ref={fillingRef}>
                     <h2 className={ingredientsStyles.subtitle} id="fillings">Начинки</h2>
                     <Ingridients ingridients={fillings} onOpen={onOpen} />
                  </div>
               </article>

            </section>
            /* {openInfoModal && (
               <Modal
                  active={openInfoModal}
                  onClickClose={onCloseModal} >
                  <IngredientDetails card={ingredient} />
               </Modal>
            )}
         </div> */
   )
}

// BurgerIngredients.propTypes = {
//    data: ingredientsPropTypes.isRequired,
//    onOpen: PropTypes.func.isRequired
// }