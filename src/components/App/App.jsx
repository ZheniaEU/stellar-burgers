import React from "react"
import { data } from "../../utils/data"
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import appStyles from "./App.module.css"
// import "./App.css";

export const App = () => {
   return (
      <React.Fragment>
         <AppHeader />
         <main className={appStyles.main}>
            <BurgerIngredients data={data} />
            {/* data={data} */}
            <BurgerConstructor data={data} />
         </main>
      </React.Fragment>
   );
}
