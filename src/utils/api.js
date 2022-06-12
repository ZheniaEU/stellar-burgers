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


//         ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c8"]

// ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c7',
//    '60d3b41abdacab0026a733c8', '60d3b41abdacab0026a733c9',
//    '60d3b41abdacab0026a733ca', '60d3b41abdacab0026a733cb',
//    '60d3b41abdacab0026a733cc', '60d3b41abdacab0026a733cd',
//    '60d3b41abdacab0026a733ce', '60d3b41abdacab0026a733cf',
//    '60d3b41abdacab0026a733d0', '60d3b41abdacab0026a733d1',
//    '60d3b41abdacab0026a733d2', '60d3b41abdacab0026a733d3',
//    '60d3b41abdacab0026a733d4']