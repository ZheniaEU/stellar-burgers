import styles from "./Loader.module.css"
import loader from "../../images/loader.gif"

export const Loader = () => {
   return (
      <div className={styles.loader}>
         <img src={loader} alt="" />
      </div>
   )
}