/* eslint-disable */
import { useSelector } from "react-redux"

export const ProtectedRoute = () => {

   const { isAuth } = useSelector(state => state.auth)

   return (
      <></>
   )
}