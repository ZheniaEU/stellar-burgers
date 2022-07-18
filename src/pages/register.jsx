/* eslint-disable */

import { useState } from "react"
import { Link } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { createUser } from "../utils/api"
import { useSelector } from "react-redux"
import styles from "./index.module.css"

export const Register = () => {

   const { isAuth } = useSelector(state => state.auth)

   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const handleSubmit = (e) => {
      e.preventDefault()
      createUser(name, email, password)
   }

   const onChangeName = (e) => {
      setName(e.target.value)
   }

   const onChangeEmail = (e) => {
      setEmail(e.target.value)
   }

   const onChangePassword = (e) => {
      setPassword(e.target.value)
   }

   if (isAuth) {
      return (
         <Redirect to='/' />
      )
   }

   return (
      <form className={styles.form} onSubmit={handleSubmit}>
         <h2 className={styles.title}>Регистрация</h2>
         <div className={styles.input}>
            <Input
               onChange={onChangeName}
               type="text"
               placeholder="Имя"
               value={name}
               name="name"
               error={false}
               errorText="Введите корректное имя"
            />
         </div>
         <div className={styles.input}>
            <Input
               onChange={onChangeEmail}
               type="email"
               placeholder="E-mail"
               value={email}
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