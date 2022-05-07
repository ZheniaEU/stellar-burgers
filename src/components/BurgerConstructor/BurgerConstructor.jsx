import ConstructorStyles from "./BurgerConstructor.module.css"
import { Button, CurrencyIcon, LockIcon, DeleteIcon, DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { data } from "../../utils/data"
import React from "react";

export const BurgerConstructor = () => {
   return (
      <section className={ConstructorStyles.w}>
         <div className={` ${ConstructorStyles.bun} mb-4 pr-4`}>
            <ConstructorElement
               type="top"
               isLocked={true}
               //  text="Краторная булка N-200i (верх)"
               text="React он как сыр, вначале он тебе не нравится (верх)"
               price={20}
               thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
            />
         </div>

         <ul className={ConstructorStyles.list} >
            <ConstructorList data={data} />
         </ul>
         <div className={` ${ConstructorStyles.bun} mb-10 pr-4`}>
            <ConstructorElement
               type="bottom"
               isLocked={true}
               //      text="Краторная булка N-200i (низ)"
               text="А потом тебе не нравится в нём, только дырки (низ)"
               price={20}
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

const ConstructorList = ({ data }) => {
   const list = data.map((item) => {
      if (item.type !== "bun") {
         return (
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
         )
      }
   })

   return (
      <React.Fragment>
         {list}
      </React.Fragment>
   )
}

// className={`${ConstructorStyles.li} + "" + ${ConstructorStyles.center}`}

{/* <img className={ConstructorStyles.img} src="" alt="" />
<p className={ConstructorStyles.text}></p>
<div className={ConstructorStyles.div}>
   <p className={ConstructorStyles.price}></p>
   <CurrencyIcon type="primary" />
   <DeleteIcon type="primary" />
</div> */}