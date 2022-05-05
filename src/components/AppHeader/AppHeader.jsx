import headerStyles from "./AppHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
//import { BrowserRouter, Route } from "react-router-dom";
// Свобода от БЭМ, это +8 часов в сутках!

export const AppHeader = () => {
   return (
      <header className={headerStyles.header}>
         <nav className={headerStyles.nav}>
            <ul className={headerStyles.ul}>
               <li className={headerStyles.li}>
                  <a href="/constructor" className={headerStyles.a}>
                     <BurgerIcon type="primary" text="Конструктор" />
                     <p className={` ${headerStyles.p} `}>Конструктор</p>
                  </a>
               </li>
               <li className={headerStyles.li}>
                  <a href="/order" className={headerStyles.a}>
                     <ListIcon type="secondary" text="Лента Заказа" />
                     <p className={` ${headerStyles.p} `}>Лента Заказа</p>
                  </a>
               </li>
               <div className={headerStyles.logo}>
               <Logo />
               </div>
               <li className={headerStyles.li}>
                  <a href="/profile" className={headerStyles.a}>
                     <ProfileIcon type="secondary" text="Личный кабинет" />
                     <p className={` ${headerStyles.p} `}>Личный кабинет</p>
                  </a>
               </li>
            </ul>
         </nav>
      </header>
   );
};
