import PropTypes from "prop-types"

export const ingredientsPropTypes = PropTypes.arrayOf(PropTypes.shape({
   _id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   proteins: PropTypes.number.isRequired,
   fat: PropTypes.number.isRequired,
   carbohydrates: PropTypes.number.isRequired,
   calories: PropTypes.number.isRequired,
   price: PropTypes.number.isRequired,
   image: PropTypes.string.isRequired,
   image_mobile: PropTypes.string.isRequired,
   image_large: PropTypes.string.isRequired,
   __v: PropTypes.number.isRequired,
}))

export const ingredientDetails = (PropTypes.shape({
   _id: PropTypes.string.isRequired,
   name: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   proteins: PropTypes.number.isRequired,
   fat: PropTypes.number.isRequired,
   carbohydrates: PropTypes.number.isRequired,
   calories: PropTypes.number.isRequired,
   price: PropTypes.number.isRequired,
   image: PropTypes.string.isRequired,
   image_mobile: PropTypes.string.isRequired,
   image_large: PropTypes.string.isRequired,
   __v: PropTypes.number.isRequired,
}))


//?спросить у наставника синтаксис, как проверять аргументы компонента
export const modalPropTypes = PropTypes.shape({
   active: PropTypes.bool.isRequired,
   onClickClose: PropTypes.func.isRequired,
   onEcsClose: PropTypes.func.isRequired,
   children: PropTypes.node.isRequired,
})