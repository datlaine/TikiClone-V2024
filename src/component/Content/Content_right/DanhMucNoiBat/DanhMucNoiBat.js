import React, { useEffect, useState } from 'react'
import { apiLink } from '../../../../apis/api'
import styles from './danhMucNoiBat.module.css'

const urlDanhMucNoiBat = `${apiLink}/danhMucNoiBat`

const style = {
  width: '100%',
  height: '100%',
}

export default function DanhMucNoiBat() {
  const [data, setData] = useState([])
  // console.log("content-danhMucNoiBat re-render");

  useEffect(() => {
    fetch(urlDanhMucNoiBat)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        // console.log(data);
        setData(data)
      })
  }, [])

  return (
    <div className={styles.danhMucNoiBat}>
      <h2 className={styles.danhMucNoiBat_title}>Danh mục nổi bật</h2>
      <div className={styles.danhMucNoiBat_wrapper}>
        {data &&
          data.map((item) => {
            return (
              <div key={item.id} className={styles.danhMucNoiBat_item}>
                <div className={styles.wrapper_img}>
                  <img src={require(`${item.hinhAnh}`)} alt='' style={style} />
                </div>
                <div className={styles.wrapper_p}>
                  <p className={styles[item.id]}>{item.title}</p>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
