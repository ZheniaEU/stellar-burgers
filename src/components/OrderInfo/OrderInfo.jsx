import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./OrderInfo.module.css"

export const OrderInfo = () => {



   return (
      <div className={styles.container_info}>
         <p className={styles.number}>#034533</p>
         <h2 className={styles.h2}>Black Hole Singularity острый бургер</h2>
         <p className={styles.span}>Выполнен</p>
         <h3 className={styles.h3}>Состав:</h3>
         <ul className={styles.ul}>
            <li className={styles.li}>
               <img className={styles.image}
                  src="https://code.s3.yandex.net/react/code/bun-01-mobile.png" alt="" />
               <p className={styles.name}>Флюоресцентная булка R2-D3</p>
               <div className={styles.container}>
                  <p className={styles.text}>2 x 300</p>
                  <CurrencyIcon />
               </div>
            </li>
         </ul>
         <div className={styles.container_total}>
            <p className={styles.data}>Вчера, 13:50 i-GMT+3</p>
            <div className={styles.total}>
               <p className={styles.text}>510</p>
               <CurrencyIcon />
            </div>
         </div>
      </div>
   )
}