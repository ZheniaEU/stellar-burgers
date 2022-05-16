import modalStyles from "./ModalOverlay.module.css"
import PropTypes from "prop-types"

export const ModalOverlay = ({onClose}) => {
   return (
      <div className={modalStyles.modal} onClick={onClose}></div>
   )
}

ModalOverlay.propTypes = {
   onClose: PropTypes.func.isRequired,
}