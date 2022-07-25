import { useSelector } from "react-redux"
import { Loader } from "../Loader/Loader"
import done from "../../images/done.svg"
import styles from "./OrderDetals.module.css"

export const OrderDetals = () => {

   const { order } = useSelector(state => state.order)

   return (
      <div className={styles.container}>
         {order == null ? < Loader /> : <>
            <h2 className={styles.h2}>{order}</h2>
            <p className={styles.order}>идентификатор заказа</p>
            <img className={styles.image} src={done} alt="done" />
            <p className={styles.status}>Ваш заказ начали готовить</p>
            <p className={styles.msg}>Дождитесь готовности на орбитальной станции</p>
         </>}
      </div>
   )
}