import order from "./OrderDetals.module.css"
import done from "../../images/done.svg"
import { useSelector } from "react-redux"

export const OrderDetals = () => {

   const { orderId } = useSelector(state => state.order)

   return (
      <div className={order.container}>
         <h2 className={order.h2}>{orderId}</h2>
         <p className={order.order}>идентификатор заказа</p>
         <img className={order.image} src={done} alt="done" />
         <p className={order.status}>Ваш заказ начали готовить</p>
         <p className={order.msg}>Дождитесь готовности на орбитальной станции</p>
      </div>
   )
}