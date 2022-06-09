//import React from "react"
//import { useState, useEffect } from "react"


const API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
   return res.ok ? res.json() : res.json().then((err) =>
      Promise.reject(` Папаша у нас проблемы на сервере : ${err}`))
}


//export const [data, setData] = React.useState([])

export const getIngredients = () => {
   return fetch(`${API_URL}/ingredients`, {
      headers: {
         "Content-Type": "application/json"
      },
      method: "GET",
   })
      .then(checkResponse)
      .catch(err => { console.log(` Не переключайтесь, мы скоро вернёмся: ${err} `) })
}

const GET_INGREDIENTS = "GET_INGREDIENTS"

export const reduxData = () => {
   return function (dispath) {
      dispath({ type: GET_INGREDIENTS })
      getIngredients()
      .then(res => {
         dispath({
            type: GET_INGREDIENTS,
            data: res.data
         })
      })
   }
}



// const getData = () => {
//    fetch(`${API_URL} / ingredients`)
//       .then(res => {
//          if (res.ok) {
//             return res.json()
//          } else {
//             return Promise.reject(`Проблемы с запросом: ${res.status}`)
//          }
//       })
//       .then(data => { setData(data.data) })
//       .catch(err => { console.log(` Не переключайтесь, мы скоро вернёмся: ${err} `) })
// }





// useEffect(() => {
//    getData()
// }, [])
