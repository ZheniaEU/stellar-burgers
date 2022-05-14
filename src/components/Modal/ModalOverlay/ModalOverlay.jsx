import modalStyles from "./ModalOverlay.module.css"

export const ModalOverlay = (props) => {
   const { active, onClose, children } = props

   return (
      <div className={active ? `${modalStyles.modal} ${modalStyles.active}`
         : `${modalStyles.modal}`} onClick={onClose}>{children}</div>
   )
}

// onClick={() => setActive(false)}