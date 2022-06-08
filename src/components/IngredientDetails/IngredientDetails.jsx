import details from "./IngredientDetails.module.css"
import { ingredientsPropTypes } from "../../utils/types"

export const IngredientDetails = ({ card }) => {

   return (
      <div className={details.container}>
         <h3 className={details.h3}>Детали ингредиента</h3>
         <img className={details.img} src={card.image_large} alt={card.name} />
         <p className={details.name}>{card.name}</p>
         <ul className={details.ul}>
            <li className={details.li}>
               <p className={details.compound}>Калории,ккал</p>
               <p className={details.calories}>{card.calories}</p>
            </li>
            <li className={details.li}>
               <p className={details.compound}>Белки, г</p>
               <p className={details.calories}>{card.proteins}</p>
            </li>
            <li className={details.li}>
               <p className={details.compound}>Жиры, г</p>
               <p className={details.calories}>{card.fat}</p>
            </li>
            <li className={details.li}>
               <p className={details.compound}>Углеводы, г</p>
               <p className={details.calories}>{card.carbohydrates}</p>
            </li>
         </ul>
      </div>
   )
}

IngredientDetails.propTypes = {
   card: ingredientsPropTypes.isRequired
}