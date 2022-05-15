import order from "./OrderDetals.module.css"
import done from "../../images/done.svg"

export const OrderDetals = () => {
   return (
      <div className={order.container}>
         <h2 className={order.h2}>034536</h2>
         <p className={order.order}>идентификатор заказа</p>
         <img className={order.image} src={done} alt="done" />
         <p className={order.status}>Ваш заказ начали готовить</p>
         <p className={order.msg}>Дождитесь готовности на орбитальной станции</p>
      </div>
   )
}