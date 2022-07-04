import styles from "./AppHeader.module.css"
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from "@ya.praktikum/react-developer-burger-ui-components"

export const AppHeader = () => {
   return (
      <header className={styles.header}>
         <nav className={styles.nav}>
            <ul className={styles.ul}>
               <li className={styles.li}>
                  <a href="/constructor" className={styles.a}>
                     <BurgerIcon type="primary" text="Конструктор" />
                     <p className={` ${styles.p} `}>Конструктор</p>
                  </a>
               </li>
               <li className={styles.li}>
                  <a href="/order" className={styles.a}>
                     <ListIcon type="secondary" text="Лента Заказа" />
                     <p className={` ${styles.p} `}>Лента заказов</p>
                  </a>
               </li>
                  <Logo />
               <li className={styles.li}>
                  <a href="/profile" className={styles.a}>
                     <ProfileIcon type="secondary" text="Личный кабинет" />
                     <p className={` ${styles.p} `}>Личный кабинет</p>
                  </a>
               </li>
            </ul>
         </nav>
      </header>
   )
}
