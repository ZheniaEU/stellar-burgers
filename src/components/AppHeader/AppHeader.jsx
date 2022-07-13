import styles from "./AppHeader.module.css"
import { Link } from "react-router-dom"
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from "@ya.praktikum/react-developer-burger-ui-components"

export const AppHeader = () => {
   return (
      <header className={styles.header}>
         <nav className={styles.nav}>
            <ul className={styles.ul}>
               <li className={styles.li}>
                  <Link to="/" className={styles.a}>
                     <BurgerIcon type="primary" text="Конструктор" />
                     <p className={` ${styles.p} `}>Конструктор</p>
                  </Link>
               </li>
               <li className={styles.li}>
                  <Link to="/order" className={styles.a}>
                     <ListIcon type="secondary" text="Лента Заказа" />
                     <p className={` ${styles.p} `}>Лента заказов</p>
                  </Link>
               </li>
               <Link to="/">
                  <Logo />
               </Link>
               <li className={styles.li}>
                  <Link to="/profile" className={styles.a}>
                     <ProfileIcon type="secondary" text="Личный кабинет" />
                     <p className={` ${styles.p} `}>Личный кабинет</p>
                  </Link>
               </li>
            </ul>
         </nav>
      </header>
   )
}
