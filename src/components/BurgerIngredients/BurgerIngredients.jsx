import BurgerIngredientsStyles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerIngredients = function () {
   return (
      <section className={BurgerIngredientsStyles.section}>
         <h1 className={BurgerIngredientsStyles.title}>Соберите бургер</h1>
         <div className={BurgerIngredientsStyles.nav}>
            <Tab>Булки</Tab>
            <Tab>Соусы</Tab>
            <Tab>Начинки</Tab>
         </div>
      </section>
   );
};
