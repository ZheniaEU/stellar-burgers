import modalStyles from "./Modal.module.css"
import ReactDOM from "react-dom"
import { ModalOverlay } from "./ModalOverlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

// const modalRoot = document.getElementById("modal");
const modalRoot = document.getElementById("modal");

export const Modal = (props) => {


   return ReactDOM.createPortal(
      <ModalOverlay >
       {/* <div className={modalStyles.modal}> */}
            <div className={modalStyles.wrapper}>
               <button className={modalStyles.CloseIcon}>
                  <CloseIcon />
               </button>
            </div>
      </ModalOverlay >
      , modalRoot)

}