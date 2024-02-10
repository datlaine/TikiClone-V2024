import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import { getData } from '../../../../apis/getDataMain'
import { SLATE_TIME } from '../../../../apis/staleTime'
import style from './goiYHomNay.module.css'

const GoiYHomNay = ({ hide }) => {
      //các state của components này
      const [list, setList] = useState([])
      const [toggle, setToggle] = useState(false)
      const wrapperGoiYHomNay = useRef(null)

      const { data, isLoading, isSuccess } = useQuery({
            queryKey: [`goiYHomNay`],
            queryFn: () => getData('/goiYHomNay'),
            staleTime: SLATE_TIME,
      })

      // console.log(`hide_BUY__JS0`, hide)

      useEffect(() => {
            if (isSuccess) {
                  setList(data?.data)
                  setToggle(true)
            }
      }, [isSuccess])

      //   console.time("useEffect");
      useEffect(() => {
            if (toggle) {
                  // console.log('useEffect 2')
                  // console.log(document.querySelector(`.itemImg1`))
                  const itemImg1 = document.getElementById(`.itemImg1`)

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
            <div
                  className={`${style.container}`}
                  ref={wrapperGoiYHomNay}
                  style={{ position: hide ? 'sticky' : 'static', opacity: hide ? 1 : 0 }}
            >
                  <div className={style.goiYHomNay}>
                        <p className={style.title}>Gợi ý hôm nay</p>
                        <div className={style.wrapper} id='goiYHomNay'>
                              {isSuccess &&
                                    list.map((item) => {
                                          return (
                                                <Link
                                                      className={`${style.wrapperImg} ${style.wrapperImg + item.id} itemImg${item.id}`}
                                                      key={item.id}
                                                      onClick={() => handleActive(item.id)}
                                                >
                                                      <img
                                                            src={require(`${item.hinhAnh}`)}
                                                            alt=''
                                                            style={{
                                                                  width: 40,
                                                                  height: 40,
                                                            }}
                                                      />
                                                      <div className={style.titleImg}>{item.title}</div>
                                                </Link>
                                          )
                                    })}
                        </div>
                  </div>
            </div>
      )
}

export default memo(GoiYHomNay)
