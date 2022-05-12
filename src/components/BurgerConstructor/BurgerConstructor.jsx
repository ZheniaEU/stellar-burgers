import React from "react";
import ConstructorStyles from "./BurgerConstructor.module.css"
import { Button, CurrencyIcon, DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
//import { data } from "../../utils/data"
//import PropTypes from "prop-types";
import { ingredientsPropTypes } from "../../utils/types"

export const BurgerConstructor = (props) => {
   return (
      <section className={ConstructorStyles.section}>
         <div className={` ${ConstructorStyles.bun} mb-4 pr-4`}>
            <ConstructorElement
               type="top"
               isLocked={true}
               //  text="Краторная булка N-200i (верх)"
               text="React он как сыр, вначале он тебе не нравится (верх)"
               price={"20"}
               thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
            />
         </div>

         <ul className={ConstructorStyles.list} >
            <ConstructorList data={props.data} />
         </ul>
         <div className={` ${ConstructorStyles.bun} mb-10 pr-4`}>
            <ConstructorElement
               type="bottom"
               isLocked={true}
               //      text="Краторная булка N-200i (низ)"
               text="А потом тебе не нравится в нём, только дырки (низ)"
               price={"20"}
               thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
            />
         </div>
         <div className={ConstructorStyles.total}>
            <p className={ConstructorStyles.value}>610</p>
            <div className={ConstructorStyles.icon} >
               <CurrencyIcon />
            </div>
            <div className="pr-4 pl-10">
               <Button type="primary" size="large" >Жизнь без БЭМ прекрасна</Button>
            </div>
         </div>
      </section>
   );
}

//мой кусок после исправления старшим студентом
const ConstructorList = (props) => {
   return (

         props.data.map((item) => item.type !== "bun" && (
            <li className={ConstructorStyles.li} key={item._id}>
               <div className={ConstructorStyles.div}>
                  <div className={`mr-2`}>
                     <DragIcon />
                  </div>
                  <ConstructorElement
                     text={item.name}
                     price={item.price}
                     thumbnail={item.image}
                  />
               </div>
            </li>
         ))

   )
}

BurgerConstructor.propTypes = {
   data: ingredientsPropTypes.isRequired
}

ConstructorList.propTypes = {
   data: ingredientsPropTypes.isRequired
}

//это мой кусок кода
// const ConstructorList = (props) => {
//    const list = props.data.map((item) => {
//       if (item.type !== "bun") {
//          return (
//             <li className={ConstructorStyles.li} key={item._id}>
//                <div className={ConstructorStyles.div}>
//                   <div className={`mr-2`}>
//                      <DragIcon />
//                   </div>
//                   <ConstructorElement
//                      text={item.name}
//                      price={item.price}
//                      thumbnail={item.image}
//                   />
//                </div>
//             </li>
//          )
//       }
//    })

//    return (
//       <React.Fragment>
//          {list}
//       </React.Fragment>
//    )
// }

//Комментарии исходя из замечаний выше:
// конструкция  item.type !== "bun" && (...) заменяет if в коде JSX.Два амперсанда(значок &)
// означают выполнение единственного условия.Если требуется выполнить несколько условий,
//  можно использовать && повторно.То есть читается если item.type !== "bun",
// возвращаем такой - то фрагмент кода.
// Сюда же: тернарный оператор.Если тебе нужно отрендерить один кусок кода,
//  если type === 'bun', и иной кусок кода, если, например, type === 'что-то еще',
//   то запись будет такая: item.type === "bun" ? (<I кусок кода>...</I кусок кода >)
//   : (<II кусок кода>...</II кусок кода >).
// Обрати внимание на фигурные скобки, обрамляющие условный рендеринг и использование map
// return (
//    {
//       props.data.map(...)
//    }
// )
// В эти скобки заключается выражение, внутри которого должен выполнится JSX - код.
// Без них движок не поймет, что именно мы хотим вернуть из компонента, если присутствует некое выражение.