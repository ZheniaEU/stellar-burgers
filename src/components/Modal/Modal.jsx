import modalStyles from "./Modal.module.css"
import ReactDOM from "react-dom"
import React from "react";
import { ModalOverlay } from "./ModalOverlay/ModalOverlay"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
//import { modalPropTypes } from "../../utils/types"
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("modal");

export const Modal = ({ active, onClickClose, onEcsClose, children }) => {

//!active нужен для анимации открытия попапа, я просто не доделал

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

Modal.propTypes = {
   active : PropTypes.bool.isRequired,
   onClickClose : PropTypes.func.isRequired,
   onEcsClose : PropTypes.func.isRequired,
   children : PropTypes.node.isRequired
}
