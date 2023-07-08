import React, {memo} from 'react'
import style from './btn.module.css'
export default memo(function ButtonAddPage({handleAdd, stateLoadApi, toggle, call}) {

    // console.log("load data: " + stateLoadApi)
    let text = toggle ? 'Thêm trang sản phẩm' : 'Đã thêm hết số trang hiện có'
    const handleAddChild = (()  => {
        handleAdd(true)
        if(call > 0) {
      document.querySelector(`.${style.btn}`).style.marginTop = '20px'
        }
      }
      )
      if(!toggle) {
      document.querySelector(`.${style.btn}`).classList.add(`${style.dont}`)
      }

    

  return (
    <button onClick={(handleAddChild)} className={style.btn}>{text}</button>
  )
}
)