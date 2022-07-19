import styles from "./IngredientDetails.module.css"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Loader } from "../Loader/Loader"

export const IngredientDetails = () => {

   const { ingredients } = useSelector(state => state.ingredients)

   const { id } = useParams()

   const card = ingredients.find((el) => el._id === id)

   return (
      <>
         {!card ? < Loader /> :
            <div className={styles.container}>
               <h3 className={styles.h3}>Детали ингредиента</h3>
               <img className={styles.img} src={card.image_large} alt={card.name} />
               <p className={styles.name}>{card.name}</p>
               <ul className={styles.ul}>
                  <li className={styles.li}>
                     <p className={styles.compound}>Калории,ккал</p>
                     <p className={styles.calories}>{card.calories}</p>
                  </li>
                  <li className={styles.li}>
                     <p className={styles.compound}>Белки, г</p>
                     <p className={styles.calories}>{card.proteins}</p>
                  </li>
                  <li className={styles.li}>
                     <p className={styles.compound}>Жиры, г</p>
                     <p className={styles.calories}>{card.fat}</p>
                  </li>
                  <li className={styles.li}>
                     <p className={styles.compound}>Углеводы, г</p>
                     <p className={styles.calories}>{card.carbohydrates}</p>
                  </li>
               </ul>
            </div>
         }
      </>
   )
}