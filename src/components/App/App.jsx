import React from 'react'
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import appStyles from './App.module.css';

// import './App.css';

export function App() {
   return (
      <React.Fragment className={appStyles.body}>
         <AppHeader />
         <main>
            <h1>Соберите бургер</h1>
            <BurgerIngredients />
            <BurgerConstructor />
         </main>
      </React.Fragment>
   );
}
