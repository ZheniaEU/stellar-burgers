/* eslint-disable */

import { useState } from "react"

import { Link, NavLink } from "react-router-dom"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { logoutUser } from "../services/actions/auth"
import { useDispatch, useSelector } from "react-redux"
import styles from "./profile.module.css"

export const Profile = () => {

   return (
      <>
         <ProfileMenu />
         < ProfileForm />
      </>
   )
}

export const ProfileMenu = () => {

   const dispath = useDispatch()
   const { isAuth, user } = useSelector(state => state.auth)

   const logoutUserOnPageProfile = () => {
      dispath(logoutUser())
   }

   return (
      <>
         <nav className={styles.nav}>
            <ul className={styles.ul}>
               <li>
                  <Link to="/login" className={`${styles.li} ${styles.active}`}>
                     Профиль
                  </Link>
               </li>
               <li>
                  <Link to="/profile/orders" className={styles.li}>
                     История заказов
                  </Link>
               </li>
               <li>
                  {/* to="/login" */}
                  <button className={styles.li}
                     onClick={logoutUserOnPageProfile}
                  >
                     Выход
                  </button>
               </li>
            </ul>
            <p className={styles.text}>В этом разделе вы можете
               изменить свои персональные данные</p>
         </nav>
      </>
   )
}

export const ProfileForm = () => {

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