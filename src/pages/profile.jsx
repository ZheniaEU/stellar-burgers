/* eslint-disable */

import { useState } from "react"

import { Link, NavLink } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"

import styles from "./profile.module.css"

export const Profile = () => {
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
      <>
         <nav className={styles.nav}>
            <ul className={styles.ul}>
               <li>
                  <NavLink to="login" className={`${styles.li} ${styles.active}`}>
                     Профиль
                  </NavLink>
               </li>
               <li>
                  <NavLink to="login" className={styles.li}>
                     История заказов
                  </NavLink>
               </li>
               <li>
                  <NavLink to="login" className={styles.li}>
                     Выход
                  </NavLink>
               </li>
            </ul>
            <p className={styles.text}>В этом разделе вы можете
               изменить свои персональные данные</p>
         </nav>

         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input}>
               <Input
                  onChange={onChangeForm}
                  type="text"
                  placeholder="Имя"
                  value={form}
                  name="email"
                  error={false}
                  errorText="Введите корректное имя"
                  icon="EditIcon"
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
                  icon="EditIcon"
               />
            </div>
            <div className={styles.input}>
               <PasswordInput
                  onChange={onChangePassword}
                  placeholder="Пароль"
                  type="password"
                  value={password}
                  error={false}
                  errorText="Введите корректный пароль"
               />
            </div>
            {/* <Button type="primary" size="medium">Зарегистрироваться</Button> */}
            {/* <p className={styles.text}>Уже зарегистрированы?&nbsp;
               <Link to="/login" className={styles.link}>Войти</Link></p> */}
         </form>
      </>
   )
}