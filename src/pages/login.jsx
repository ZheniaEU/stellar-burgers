/* eslint-disable */
import { useState } from "react"
import { Link } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { } from "../utils/api";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../services/reducers/auth";
import styles from "./index.module.css"

const API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
   return res.ok ? res.json() : res.json().then((err) =>
      Promise.reject(`Папаша у нас проблемы на сервере : ${err}`))
}

export const Login = () => {

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   dispatch = useDispatch()

   // const getData = () => {
   //    return (dispatch) => {
   //       dispatch(getIngredientsRequest())
   //       getIngredients()
   //          .then(res => {
   //             if (res.success) {
   //                dispatch(getIngredientsSuccess(res.data))
   //             } else {
   //                dispatch(getIngredientsFailed())
   //             }
   //          })
   //          .catch(err => {
   //             dispatch(getIngredientsFailed())
   //             console.log(`Обнаружено жжение в нижней части таза ${err}`)
   //          })
   //    }
   // }

   //success: true

   const loginin = async (email, password) => {
      return await fetch(`${API_URL}/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            email,
            password,
         })
      })
         .then(res => checkResponse(res))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log(email, password)
      loginin(email, password)
   }

   const onChangeEmail = (e) => {
      setEmail(e.target.value)
   }

   const onChangePassword = (e) => {
      setPassword(e.target.value)
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