// import React from "react"
// import { useEffect } from "./react"

// const API_URL = "https://norma.nomoreparties.space/api/ingredients"



// export const getData = function () {
//    const [data, setData] = React.useState({})
//    return fetch(API_URL)
//       .then(data => {
//          setData({data})
//       })
//       .then(checkResponse)
// }


// это подсказал старший студент, х3 пока как использовать
// React.useEffect(() => {
//    fetch(`${API_URL}`)
//       .then(res => getResponseData(res))
//       .then(
//          (res) => {
//             setState(state => ...);
//          },
//          (error) => {
//             setState(state => ...)
//          })
// }, [])

// React.useEffect(() => {
//    getData()
// }, [])

//на будущие, из тренажёра

// const Product = ({productId}) => {
//   const [state, setState] = useState({
//     productData: null,
//     loading: true
//   })

//   useEffect(() => {
//     const getProductData = async () => {
//       setState({...state, loading: true});
//       const res = await fetch(`/api/v1/products/${productId}`);
//       const data = await res.json();
//       setState({ productData: data.productData, loading: false });
//     }

//     getProductData();
//   }, [productId])
// }

//    const [state, setState] = React.useState([])


const API_URL = "https://norma.nomoreparties.space/api/ingredients"

 const getData = () => {
   fetch(API_URL)
      // .then(checkResponse)
      .then(res => {
         if (res.ok) {
            return res.json()
         } else {
            return Promise.reject(`Проблемы с запросом: ${res.status}`)
         }
      })
}

export const Api = getData