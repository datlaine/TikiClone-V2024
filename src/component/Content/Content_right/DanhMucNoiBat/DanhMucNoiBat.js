import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import { apiLink } from '../../../../apis/api'
import { getData } from '../../../../apis/getDataMain'
import { SLATE_TIME } from '../../../../apis/staleTime'
import styles from './danhMucNoiBat.module.css'


const style = {
  width: '100%',
  height: '100%',
}

const DanhMucNoiBat = () => {
  const [list, setList] = useState([])

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['danhMucNoiBat'],
    queryFn: () => getData('/danhMucNoiBat'),
    staleTime: SLATE_TIME,
    cacheTime: SLATE_TIME * 2
  })

  useEffect(() => {
    if (!isLoading) {
      // console.log(list?.list)
      setList(data?.data)
    }
  }, [isLoading])

  return (
    <div className={`${styles.danhMucNoiBat}`}>
      <h2 className={styles.danhMucNoiBat_title}>Danh mục nổi bật</h2>
      <div className={styles.danhMucNoiBat_wrapper}>
        {isSuccess &&
          list.map((item) => {
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


export default memo(DanhMucNoiBat)