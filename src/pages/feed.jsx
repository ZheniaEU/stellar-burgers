/*eslint-disable*/
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./feed.module.css"


export const Feed = ({ onOpen }) => {

   return (
      <main className={styles.main}>
         <h1 className={styles.h1}>Лента заказов</h1>
         <section className={styles.section}>
            <CardOrder onOpen={onOpen} />
            <StatusList />
         </section>
      </main>
   )
}

export const CardOrder = ({ onOpen }) => {
   return (
      <ul className={styles.container}>
         <li className={styles.card} onClick={() => onOpen()}>
            <div className={styles.order_container}>
               <p className={styles.order}>#034535</p>
               <p className={styles.date}>Сегодня, 16:20 i-GMT+3</p>
            </div>
            <h2 className={styles.h2}>Death Star Starship Main бургер</h2>
            <div className={styles.overview_container}>
               <div className={styles.images_container}>
                  <img className={styles.image}
                     src="https://code.s3.yandex.net/react/code/bun-01-mobile.png" alt="" />
               </div>
               <div className={styles.price_container}>
                  <p className={styles.price}>480</p>
                  <CurrencyIcon />
               </div>
            </div>
         </li>
         <li className={styles.card}>
            <div className={styles.order_container}>
               <p className={styles.order}>#034535</p>
               <p className={styles.date}>Сегодня, 16:20 i-GMT+3</p>
            </div>
            <h2 className={styles.h2}>Death Star Starship Main бургер</h2>
            <div className={styles.overview_container}>
               <div className={styles.images_container}>
                  <img className={styles.image}
                     src="https://code.s3.yandex.net/react/code/bun-01-mobile.png" alt="" />
               </div>
               <div className={styles.price_container}>
                  <p className={styles.price}>480</p>
                  <CurrencyIcon />
               </div>
            </div>
         </li>
         <li className={styles.card}>
            <div className={styles.order_container}>
               <p className={styles.order}>#034535</p>
               <p className={styles.date}>Сегодня, 16:20 i-GMT+3</p>
            </div>
            <h2 className={styles.h2}>Death Star Starship Main бургер</h2>
            <div className={styles.overview_container}>
               <div className={styles.images_container}>
                  <img className={styles.image}
                     src="https://code.s3.yandex.net/react/code/bun-01-mobile.png" alt="" />
               </div>
               <div className={styles.price_container}>
                  <p className={styles.price}>480</p>
                  <CurrencyIcon />
               </div>
            </div>
         </li>
         <li className={styles.card}>
            <div className={styles.order_container}>
               <p className={styles.order}>#034535</p>
               <p className={styles.date}>Сегодня, 16:20 i-GMT+3</p>
            </div>
            <h2 className={styles.h2}>Death Star Starship Main бургер</h2>
            <div className={styles.overview_container}>
               <div className={styles.images_container}>
                  <img className={styles.image}
                     src="https://code.s3.yandex.net/react/code/bun-01-mobile.png" alt="" />
               </div>
               <div className={styles.price_container}>
                  <p className={styles.price}>480</p>
                  <CurrencyIcon />
               </div>
            </div>
         </li>
      </ul>
   )
}

export const StatusList = () => {
   return (
      <article className={styles.article}>
         <div className={styles.orders_container}>
            <div className={styles.orders} >
               <h3 className={styles.h3}>Готовы:</h3>
               <ul className={styles.ul}>
                  <li className={styles.done}>034533</li>
                  <li className={styles.done}>034533</li>
                  <li className={styles.done}>034533</li>
                  <li className={styles.done}>034533</li>
                  <li className={styles.done}>034533</li>
                  <li className={styles.done}>034533</li>
                  <li className={styles.done}>034533</li>
                  <li className={styles.done}>034533</li>
                  <li className={styles.done}>034533</li>
               </ul>
            </div>
            <div className={styles.orders}>
               <h3 className={styles.h3}>В работе:</h3>
               <ul className={styles.ul}>
                  <li className={styles.progress}>034533</li>
                  <li className={styles.progress}>034533</li>
                  <li className={styles.progress}>034533</li>
                  <li className={styles.progress}>034533</li>
                  <li className={styles.progress}>034533</li>
                  <li className={styles.progress}>034533</li>
                  <li className={styles.progress}>034533</li>
                  <li className={styles.progress}>034533</li>
                  <li className={styles.progress}>034533</li>
               </ul >
            </div>
         </div>
         <p className={styles.text}>Выполнено за все время:</p>
         <p className={styles.counter}>28752</p>
         <p className={styles.text}>Выполнено за сегодня:</p>
         <p className={styles.counter}>138</p>
      </article>
   )
}