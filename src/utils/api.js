const API_URL = "https://norma.nomoreparties.space/api"

const checkResponse = (res) => {
   return res.ok ? res.json() : res.json().then((err) =>
      Promise.reject(`Папаша у нас проблемы на сервере : ${err}`))
}

export const getIngredients = async () => {
   return fetch(`${API_URL}/ingredients`)
      .then(res => checkResponse(res))
}

const checkResponseOrder = (res) => {
   return res.ok ? console.log(res) : res.json().then((err) =>
      Promise.reject(`Папаша у нас проблемы на сервере : ${err}`))
}

export const onDemandOrder = async () => {
   return fetch("https://norma.nomoreparties.space/api/orders", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: {
         "ingredients": ["609646e4dc916e00276b286e", "609646e4dc916e00276b2870"],"success": true
      }
   })
      .then(res => checkResponseOrder(res))
}

// Эндпоинт
// POST https://norma.nomoreparties.space/api/orders

// Тело запроса
// {
//    "ingredients": ["609646e4dc916e00276b286e","609646e4dc916e00276b2870"]
// }

// В теле запроса нужно передать _id всех ингредиентов, которые находятся
// в компоненте BurgerConstructor. Пример ответа:


// {
//    "name": "Кратерный метеоритный бургер",
//    "order": {
//        "number": 6257
//    },
//    "success": true
//  }

// По возможности старайтесь обрабатывать ошибки при работе с API.
// Если запрос прошёл успешно, сохраняйте номер заказа и отображайте его в OrderDetails.