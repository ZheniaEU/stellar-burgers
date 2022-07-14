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

// //success: true

// const loginin = async (email, password) => {
//    return await fetch(`${API_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//          "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//          email,
//          password,
//       })
//    })
//       .then(res => checkResponse(res))
// }