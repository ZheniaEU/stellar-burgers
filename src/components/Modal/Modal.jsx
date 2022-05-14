import modalStyles from "./Modal.module.css"
import ReactDOM from "react-dom"
import React from "react";
import { ModalOverlay } from "./ModalOverlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal");

export const Modal = ({ active, onClickClose, onEcsClose, children }) => {

   React.useEffect(() => {
      document.addEventListener("keydown", onEcsClose)
      return () => {
         document.removeEventListener("keydown", onEcsClose)
      }
   }, [onEcsClose])



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