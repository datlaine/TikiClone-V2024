import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { apiLink } from '../../../../apis/api'
import { getData } from '../../../../apis/getDataMain'
import { SLATE_TIME } from '../../../../apis/staleTime'
import style from './goiYHomNay.module.css'

const urlGoiYHomNay = `${apiLink}/goiYHomNay`

export default function GoiYHomNay() {
  const [list, setList] = useState([])
  const [toggle, setToggle] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: [`goiYHomNay`],
    queryFn: () => getData('/goiYHomNay'),
    staleTime: SLATE_TIME,
  })

  useEffect(() => {
    if (!isLoading) {
      setList(data?.data)
      setToggle(true)
    }
  }, [isLoading])

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
          {!isLoading &&
            list.map((item) => {
              return (
                <NavLink
                  className={`${style.wrapperImg} ${style.wrapperImg + item.id} itemImg${item.id}`}
                  key={item.id}
                  onClick={() => handleActive(item.id)}
                >
                  <img src={require(`${item.hinhAnh}`)} alt='' style={{ width: 40, height: 40 }} />
                  <div className={style.titleImg}>{item.title}</div>
                </NavLink>
              )
            })}
        </div>
      </div>
    </div>
  )
}
