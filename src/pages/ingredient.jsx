/* eslint-disable */

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IngredientDetails } from "../components/IngredientDetails/IngredientDetails"

import styles from "./ingredient.module.css"

export const Ingredient = () => {

   const { id } = useParams()
   const { a, setA } = useState()
   useEffect(() => {

   })

   return (
      <>
         <h2 className={styles.h2}>Детали ингредиента</h2>
         {/* <IngredientDetails /> */}
      </>
   )
}