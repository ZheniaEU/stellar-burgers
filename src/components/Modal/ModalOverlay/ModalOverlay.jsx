import modalStyles from "./ModalOverlay.module.css"

export const ModalOverlay = ({onClose}) => {
   return (
      <div className={modalStyles.modal} onClick={onClose}></div>
   )
}