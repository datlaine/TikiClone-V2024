import './content_right_brand.css'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getData } from '../../../../apis/getDataMain'
import { SLATE_TIME } from '../../../../apis/staleTime'

export default function Content_right_brand() {
  // console.log("content-right_brand re-render")

  const [dataApiBrand, setDataApiBrand] = useState([])

  //render lại khi gọi api
  // useEffect(() => {
  //   fetch(props.urlApi)
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((data) => {
  //       // console.log(data)
  //       setDataApiBrand(data)
  //     })
  // }, [])

  const { data, isLoading } = useQuery({
    queryKey: [`thuongHieuChinhHang`],
    queryFn: () => getData('/thuongHieuChinhHang'),
    staleTime: SLATE_TIME,
  })

  useEffect(() => {
    if (!isLoading) {
      setDataApiBrand(data?.data)
    }
  }, [isLoading])

  return (
    <div className='content_right_brand'>
      {!isLoading &&
        dataApiBrand.map((item) => (
          <div className='content_right_brand_item' key={item.id}>
            <img src={require(`${item.img}`)} alt='' />
          </div>
        ))}
    </div>
  )
}
