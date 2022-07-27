import { useState } from "react"
import { useDispatch } from "react-redux"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { updateUserInfo } from "../services/actions/auth"
import { ProfileMenu } from "../components/ProfileMenu/ProfileMenu"
import styles from "./profile.module.css"

export const Profile = () => {

   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const dispath = useDispatch()

   const handleSubmit = (e) => {
      e.preventDefault()
      dispath(updateUserInfo(name, email, password))
      setName("")
      setEmail("")
      setPassword("")
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

   return (
      <main className={styles.main}>
         <ProfileMenu />
         <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input}>
               <Input
                  onChange={onChangeName}
                  type="text"
                  placeholder="Имя"
                  value={name}
                  name="name"
                  error={false}
                  errorText="Введите корректное имя"
                  icon="EditIcon"
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
            <div className={styles.buttons}>
               <Button type="secondary" size="medium">Отмена</Button>
               <Button disabled={password.length < 6} type="primary" size="medium">Сохранить</Button>
            </div>
         </form>
      </main>
   )
}