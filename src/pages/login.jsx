/* eslint-disable */

import { useState } from "react"

import { Link } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./login.module.css"

export const Login = () => {

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
         <h2 className={styles.title}>Вход</h2>
         <div className={styles.input}>
            <Input
               onChange={onChangeForm}
               type="text"
               placeholder="E-mail"
               value={form}
               name="email"
               error={false}
               errorText="Введите корректный E-mail"
            />
         </div>
         <div className={styles.input}>
            <PasswordInput
               onChange={onChangePassword}
               placeholder="Пароль"
               value={password}
               error={false}
            />
         </div>
         <Button type="primary" size="medium">Войти</Button>
         <p className={styles.text}>Вы — новый пользователь?&nbsp;
            <Link to="/register" className={styles.link}>Зарегистрироваться</Link></p>
         <p className={styles.text}>Забыли пароль?&nbsp;
            <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link></p>
      </form>
   )
}