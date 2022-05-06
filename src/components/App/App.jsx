import React from "react"
//import { data } from "../../utils/data"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import appStyles from "./App.module.css"
// import "./App.css";

export function App() {
   return (
      <React.Fragment>
         <AppHeader />
         {/* <h1 className={appStyles.title}>Соберите бургер</h1> */}
         <main className={appStyles.main}>
            <BurgerIngredients />
            {/* props={data} */}
            <BurgerConstructor />
         </main>
      </React.Fragment>
   );
}
