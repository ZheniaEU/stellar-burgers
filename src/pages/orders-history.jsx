/* eslint-disable*/
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../components/Loader/Loader"
import { ProfileMenu } from "../components/ProfileMenu/ProfileMenu"
import { WS_CONNECTION_INIT } from "../services/reducers/ws"
import { getCookie } from "../utils/cookie"
import { CardOrder } from "./feed"
import styles from "./orders-history.module.css"

export const OrdersHistory = () => {

      const { orders } = useSelector(state => state.ws)
      const dispatch = useDispatch()

      useEffect(() => {
            if (!orders) {
                  dispatch({
                        type: WS_CONNECTION_INIT,
                        payload: `?token=${getCookie("accessToken")}`
                  })
            }
      }, [dispatch, orders])

      return (
            !orders ? <Loader /> :
                  <main className={styles.main}>
                        <ProfileMenu />
                        <section className={styles.section}>
                              <ul className={styles.ul}>
                                    {orders.map((item) => (
                                          <CardOrder item={item} key={item._id} arr={item.ingredients} />
                                    ))}
                              </ul>
                        </section>
                  </main>
      )
}