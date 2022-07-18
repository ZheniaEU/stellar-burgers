/* eslint-disable */

import { useState } from "react"
import { Link } from "react-router-dom"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { forgotenPassword } from "../utils/api"
import { useSelector } from "react-redux"

import styles from "./index.module.css"

export const ForgotPassword = () => {

   const { isAuth } = useSelector(state => state.auth)

   const [email, setEmail] = useState("")

   const handleSubmit = (e) => {
      e.preventDefault()
      forgotenPassword(email)
      console.log(email)
      setEmail("")
   }

   const onChangeEmail = (e) => {
      setEmail(e.target.value)
   }

   if (isAuth) {
      return (
         <Redirect to='/' />
      )
   }

   return (
      <form className={styles.form} onSubmit={handleSubmit}>
         <h2 className={styles.title}>Восстановление пароля</h2>
         <div className={styles.input}>
            <Input
               onChange={onChangeEmail}
               type="email"
               placeholder="Укажите e-mail"
               value={email}
               name="email"
               error={false}
               errorText="Введите корректный E-mail"
            />
         </div>
         <Button type="primary" size="medium">Восстановить</Button>
         <p className={styles.text}>Вспомнили пароль?&nbsp;
            <Link to="/login" className={styles.link}>Войти</Link></p>
      </form>
   )
}