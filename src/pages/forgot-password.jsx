/* eslint-disable */

import { useState } from "react"

import { Link } from "react-router-dom"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./index.module.css"

export const ForgotPassword = () => {
   const [form, setForm] = useState("")
   const [password, setPassword] = useState("")

   const handleSubmit = (e) => {
      e.preventDefault()
   }

   const onChangeForm = (e) => {
      setForm(e.target.value)
   }

   const onChangePassword = (e) => {
      setPassword(e.target.value)
   }

   return (
      <form className={styles.form} onSubmit={handleSubmit}>
         <h2 className={styles.title}>Восстановление пароля</h2>
         <div className={styles.input}>
            <Input
               onChange={onChangeForm}
               type="text"
               placeholder="Укажите e-mail"
               value={form}
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