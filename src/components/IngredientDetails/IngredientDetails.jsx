import details from "./IngredientDetails.module.css"

export const IngredientDetails = ({ data }) => {
   console.log(data)
   return (
      <div className={details.container}>
         <h3 className={details.h3}>Детали ингредиента</h3>
         <img className={details.img} src={data.image} alt="" />
         <p className={details.name}>Биокотлета из марсианской Магнолии</p>
         <ul className={details.ul}>
            <li className={details.li}>
               <p className={details.compound}>Калории,ккал</p>
               <p className={details.calories}>244,4</p>
            </li>
            <li className={details.li}>
               <p className={details.compound}>Белки, г</p>
               <p className={details.calories}>{data.proteins}</p>
            </li>
            <li className={details.li}>
               <p className={details.compound}>Жиры, г</p>
               <p className={details.calories}>17,2</p>
            </li>
            <li className={details.li}>
               <p className={details.compound}>Углеводы, г</p>
               <p className={details.calories}>{data.carbohydrates}</p>
            </li>
         </ul>
      </div>
   )
}