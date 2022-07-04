/* eslint-disable */

import { useState } from "react"

import { Link } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./register.module.css"

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
               type="text"
               placeholder="Имя"
               onChange={onChangeForm}
               value={form}
               name="email"
               error={false}
               errorText="Введите корректный E-mail"
            />
         </div>
         <div className={styles.input}>
            <Input
               type="text"
               placeholder="E-mail"
               onChange={onChangeForm}
               value={form}
               name="email"
               error={false}
               errorText="Введите корректный E-mail"
            />
         </div>
         <div className={styles.input}>
            <PasswordInput
               placeholder="Пароль"
               value={password}
               error={false}
               onChange={onChangePassword} />
         </div>
         <Button type="primary" size="medium">Зарегистрироваться</Button>
         <p className={styles.text}>Уже зарегистрированы?&nbsp;
            <Link to="/login" className={styles.link}>Войти</Link></p>
      </form>
   )
}