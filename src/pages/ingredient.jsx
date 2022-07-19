/* eslint-disable */

import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Loader } from "../components/Loader/Loader"
import { IngredientDetails } from "../components/IngredientDetails/IngredientDetails"
import { useSelector, useDispatch } from "react-redux"

import styles from "./index.module.css"

export const Ingredient = () => {

   const { ingredients } = useSelector(state => state.ingredients)

   // const { id } = useParams()

   // const card = ingredients.find((el) => el._id === id)

   return (
      <>
         <div className={styles.maket} />
         {!ingredients ? < Loader /> :
            <IngredientDetails />
         }
      </>
   )
}