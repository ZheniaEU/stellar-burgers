import modalStyles from "./Modal.module.css"
import ReactDOM from "react-dom"
import React from "react";
import { ModalOverlay } from "./ModalOverlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal");

export const Modal = ({ active, onClose }) => {

   React.useEffect(() => {

      document.addEventListener("keydown", onClose)
      return () => {
         document.removeEventListener("keydown", onClose)
      }
   }, [onClose])



   return ReactDOM.createPortal(
      <ModalOverlay active={active} onClose={onClose}>
         <div className={modalStyles.wrapper}>
            <button className={modalStyles.CloseIcon} onClick={() => onClose()}>
               <CloseIcon />
            </button>
         </div>
      </ModalOverlay >
      , modalRoot)

}