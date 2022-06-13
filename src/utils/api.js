const API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
   return res.ok ? res.json() : res.json().then((err) =>
      Promise.reject(`Папаша у нас проблемы на сервере : ${err}`))
}

export const getIngredients = async () => {
   return await fetch(`${API_URL}/ingredients`)
      .then(res => checkResponse(res))
}
// const checkResponse = (res) => {
//    if (res.ok) {
//      return res.json();
//    } else {
//      return Promise.reject(new Error(res.status))
//    }
//  }


export const onDemandOrder = (massId) => {
//   console.log(massId)
   return fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         ingredients: massId
         //    "ingredients": massId
      })
   })

      .then(res => checkResponse(res))

}