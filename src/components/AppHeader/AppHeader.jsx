import headerStyles from "./AppHeader.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";


export const AppHeader = () => {
   return (
      <header className={headerStyles.header}>
         <nav className={headerStyles.nav}>
            <button className={`${headerStyles.button} mr-2`}>
               <BurgerIcon type="secondary" text="Конструктор" ></BurgerIcon>
               Конструктор
            </button>
            <button>
               <ListIcon type="secondary" />
               Лента Заказа
            </button>
            <Logo />
            <button>
               <ProfileIcon type="secondary" />
               Личный кабинет
            </button>
         </nav>
      </header>
   );
};
