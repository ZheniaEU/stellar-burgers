/* eslint-disable */

import { useState } from "react"

import { Link } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./index.module.css"

export const Register = () => {
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
         <h2 className={styles.title}>Регистрация</h2>
         <div className={styles.input}>
            <Input
               onChange={onChangeForm}
               type="text"
               placeholder="Имя"
               value={form}
               name="name"
               error={false}
               errorText="Введите корректное имя"
            />
         </div>
         <div className={styles.input}>
            <Input
               onChange={onChangeForm}
               type="email"
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
               type="password"
               placeholder="Пароль"
               value={password}
               name="password"
               error={false}
               errorText="Введите корректный E-mail"
            />
         </div>
         <Button type="primary" size="medium">Зарегистрироваться</Button>
         <p className={styles.text}>Уже зарегистрированы?&nbsp;
            <Link to="/login" className={styles.link}>Войти</Link></p>
      </form>
   )
}