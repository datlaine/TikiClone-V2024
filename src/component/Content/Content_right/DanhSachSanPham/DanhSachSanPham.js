import React, { useState, useEffect } from 'react'
import ButtonAddPage from './ButtonAddPage'
import style from './danhSachSanPham.module.css'
import FirstPage from './FirstPage'
import MiniDanhSach from './MiniDanhSach'

export default function DanhSachSanPham() {
  // console.log(`props: ` , prop)
  const [page, setPage] = useState([])
  const [numberPage, setNumberPage] = useState(2)
  const [temp, setTemp] = useState([])
  const [toggle, setToggle] = useState(true)

  // console.log("content-danhSachSanPham re-render");
  // console.log(count)

  const url = `https://dulieusanpham.vercel.app/danhSachMiniSpe/${numberPage}`

  useEffect(() => {
    fetch('https://dulieusanpham.vercel.app/danhSachMiniSpe')
      .then((res) => res.json())
      .then((data) => setTemp(data))
  }, [])

  // console.log(temp && temp.map((item) => {
  //   return item.danhSach.filter((item) =>{
  //     if(item.id === 2) {
  //       return item
  //     }
  //       return undefined
  //   })
  // }))

  const handleAdd = (dataChild) => {
    if (dataChild) {
      // console.log('nubmers', numberPage)
      // console.log(temp[numberPage-1])
      if (temp[numberPage - 1]) {
        setPage((page) => [...page, url])
        // console.log(`pageId: ` + numberPage, url)
        setNumberPage((pageAdd) => pageAdd + 1)
      }
      if (numberPage >= temp.length) {
        setToggle(false)
      }
    }
  }

  const now = new Date()
  let unique = now.getMilliseconds()
  // console.log(`nextNumberPage ${numberPage}`)

  return (
    <>
      <div className={style.danhSachSanPham}>
        <FirstPage call={temp[0]} />
        {page &&
          page.map((item, index) => (
            <MiniDanhSach
              colums={[1, 7]}
              rows={[index + 2, index + 3]}
              urlApi={item}
              isNotFirst={true}
              key={`${index + unique}`}
              call={temp && temp[index + 1]}
            />
          ))}
      </div>
      <ButtonAddPage handleAdd={handleAdd} toggle={toggle} call={temp.length} />
    </>
  )
}
