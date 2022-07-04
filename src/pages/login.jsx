/* eslint-disable */

import { useState } from "react"
import { Input, PasswordInput, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./index.module.css"

export const Login = () => {

   const [form, setForm] = useState("")
   const [password, setPassword] = useState("")

   //  console.log(value)

   const handleSubmit = (e) => {
      e.preventDefault()
   }

   const onChangeForm = (e) => {
      setForm(e.target.value)
   }

   const onChangePassword = (e) => {
      setPassword(e.target.value)
   }

   // () => {
   //    const [value, setValue] = React.useState('password')
   //    return <PasswordInput onChange={onChange} value={value} name={'password'} />
   // }

   return (
      <>
         <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Вход</h2>
            {/* <div className={styles.a}> */}
               <div className={styles.input}>
                  <Input
                     type="text"
                     placeholder="E-mail"
                     onChange={onChangeForm}
                     // icon={'CurrencyIcon'}
                     value={form}
                     name="email"
                     error={false}
                     errorText="Введите корректный E-mail"
                  //валидация не работает по дефолту?


                  />
               </div>
               <div className={styles.input}>
                  <PasswordInput
                     placeholder="Пароль"
                     value={password}
                     onChange={onChangePassword} />
               </div>
            {/* </div> */}
            <Button type="primary" size="medium">Войти</Button>
            <p></p>
            <p></p>
         </form>
      </>
   )
}