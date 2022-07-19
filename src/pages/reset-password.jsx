import { useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { resetPassword } from "../utils/api"
import { useSelector } from "react-redux"
import styles from "./index.module.css"

export const ResetPassword = () => {

   const { isAuth } = useSelector(state => state.auth)

   const [password, setPassword] = useState("")
   const [token, setToken] = useState("")

   const handleSubmit = (e) => {
      e.preventDefault()
      resetPassword(password, token)
   }

   const onChangePassword = (e) => {
      setPassword(e.target.value)
   }

   const onChangeToken = (e) => {
      setToken(e.target.value)
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
            <PasswordInput
               onChange={onChangePassword}
               type="text"
               placeholder="Введите новый пароль"
               value={password}
               error={false}
               errorText="Введите корректный E-mail"
            />
         </div>
         <div className={styles.input}>
            <Input
               onChange={onChangeToken}
               type="text"
               placeholder="Введите код из письма"
               value={token}
               name="email"
               error={false}
               errorText="Введите корректное имя"
            />
         </div>
         <Button type="primary" size="medium">Сохранить</Button>
         <p className={styles.text}>Вспомнили пароль?&nbsp;
            <Link to="/login" className={styles.link}>Войти</Link></p>
      </form>
   )
}
