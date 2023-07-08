import React, { useEffect, useLayoutEffect, useState } from 'react'
import style from './goiYHomNay.module.css'

const urlGoiYHomNay = 'https://dulieusanpham.vercel.app/goiYHomNay'

export default function GoiYHomNay() {
  const [data, setData] = useState([])
  const [toggle, setToggle] = useState(false)

  useLayoutEffect(() => {
    fetch(urlGoiYHomNay)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        // console.log("useEffect 1");
        setData(data)
        setToggle(true)
      })
  }, [])

  //   console.time("useEffect");
  useEffect(() => {
    if (toggle) {
      // console.log('useEffect 2')
      // console.log(document.querySelector(`.itemImg1`))
      document.querySelector(`.itemImg1`).classList.add(`${style.active}`)
      document.querySelector(`.itemImg1`).children[1].classList.add(`${style.color}`)
    }
  }, [toggle])
  // console.timeEnd('useEffect')
  const handleActive = function (id) {
    // console.log("id: " + id);
    const all = document.querySelectorAll(`.${style.wrapperImg}`)
    // console.log("all " , all[id - 1])
    for (var i = 0; i < all.length; i++) {
      if (all[i].classList.contains(`${style.active}`)) {
        // console.log(all[i].classList);
        all[i].classList.remove(`${style.active}`)
        all[i].children[1].classList.remove(`${style.color}`)
        // console.log(all[i].children[1])
      }
      all[id - 1].classList.add(`${style.active}`)
      all[id - 1].children[1].classList.add(`${style.color}`)
    }
  }

  // console.log("re-render");

  return (
    <div className={style.container}>
      <div className={style.goiYHomNay}>
        <p className={style.title}>Gợi ý hôm nay</p>
        <div className={style.wrapper}>
          {data &&
            data.map((item) => {
              return (
                <div
                  className={`${style.wrapperImg} ${style.wrapperImg + item.id} itemImg${item.id}`}
                  key={item.id}
                  onClick={() => handleActive(item.id)}
                >
                  <img src={require(`${item.hinhAnh}`)} alt='' style={{ width: 40, height: 40 }} />
                  <div className={style.titleImg}>{item.title}</div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
