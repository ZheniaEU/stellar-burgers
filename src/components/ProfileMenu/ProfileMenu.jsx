/* eslint-disable*/
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../../services/actions/auth"

import styles from "./ProfileMenu.module.css"

export const ProfileMenu = () => {

   const dispath = useDispatch()

   const logoutUserOnPageProfile = () => {
      dispath(logoutUser())
   }

   return (
      <>
         <nav className={styles.nav}>
            <ul className={styles.ul}>
               <li>
                  <Link to="/profile" className={`${styles.li} ${styles.active}`}>
                     Профиль
                  </Link>
               </li>
               <li>
                  <Link to="/profile/orders" className={styles.li}>
                     История заказов
                  </Link>
               </li>
               <li>
                  <Link to="/" className={styles.li}
                     onClick={logoutUserOnPageProfile}>
                     Выход
                  </Link>
               </li>
            </ul>
            <p className={styles.text}>В этом разделе вы можете
               изменить свои персональные данные</p>
         </nav>
      </>
   )
}
