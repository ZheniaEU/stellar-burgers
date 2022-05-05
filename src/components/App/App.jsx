import React from 'react'
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"
import appStyles from './App.module.css';

// import './App.css';

export function App() {
   return (
      <React.Fragment>
         {/* <AppHeader className={appStyles.lil}/> */}
         <AppHeader/>
         <main className={appStyles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
         </main>
      </React.Fragment>
   );
}
