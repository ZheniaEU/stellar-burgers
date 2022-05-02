import React from 'react'
import { AppHeader } from "../AppHeader/AppHeader"
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients"
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor"


import './App.css';

export function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}
