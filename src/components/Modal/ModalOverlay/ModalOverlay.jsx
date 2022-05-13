import modalStyles from "./ModalOverlay.module.css"

export const ModalOverlay = (props) => {
   return (
      <div className={modalStyles.modal}>{props.children}</div>
   )
}