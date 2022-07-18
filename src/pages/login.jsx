/* eslint-disable */
import { useState } from "react"
import { Link, Redirect, useLocation } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { loginUser } from "../services/actions/auth"
import { useDispatch, useSelector } from "react-redux"
import styles from "./index.module.css"

export const Login = () => {

   const location = useLocation()

   const { isAuth } = useSelector(state => state.auth)

   const dispatch = useDispatch()

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(loginUser(email, password))
      setEmail("")
      setPassword("")
   }

   const onChangeEmail = (e) => {
      setEmail(e.target.value)
   }

   const onChangePassword = (e) => {
      setPassword(e.target.value)
   }

   if (isAuth) {
      return (
         <Redirect to={location.state?.from || '/'} />
      )
   }

   return (
      <form className={styles.form} onSubmit={handleSubmit}>
         <h2 className={styles.title}>Вход</h2>
         <div className={styles.input}>
            <Input
               onChange={onChangeEmail}
               type="text"
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
               errorText="Введите корректный пароль"
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