import { useEffect } from "react"
import ReactDOM from "react-dom"
import modalStyles from "./Modal.module.css"
import { ModalOverlay } from "./ModalOverlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"

const modalRoot = document.getElementById("modal")

export const Modal = ({ active, onClickClose, children }) => {

   const handleCloseModal = (evt) => {
      if (evt.key === "Escape") {
         onClickClose()
      }
   }

   useEffect(() => {
      document.addEventListener("keydown", handleCloseModal)
      return () => {
         document.removeEventListener("keydown", handleCloseModal)
      }
   })



   return ReactDOM.createPortal(
      <>
         <div className={modalStyles.wrapper}>
            <button className={modalStyles.CloseIcon} >
               <CloseIcon onClick={onClickClose} />
            </button>
            {children}
         </div>
         <ModalOverlay active={active} onClose={onClickClose} />
      </>
      , modalRoot)

}

Modal.propTypes = {
   active: PropTypes.bool.isRequired,
   onClickClose: PropTypes.func.isRequired,
   children: PropTypes.node.isRequired
}
