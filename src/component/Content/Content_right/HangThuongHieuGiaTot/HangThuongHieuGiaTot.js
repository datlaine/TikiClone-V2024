import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import { apiLink } from '../../../../apis/api'
import { getData } from '../../../../apis/getDataMain'
import { SLATE_TIME } from '../../../../apis/staleTime'
import './hangThuongHieuGiaTot.css'

const HangThuongHieuGiaTot = () => {
      const [hinhAnh, setHinhAnh] = useState([])
      // useState()

      // useEffect(() => {
      //   fetch(apiThuongHieuGiaTot)
      //     .then((res) => {
      //       return res.json()
      //     })
      //     .then((data) => {
      //       // console.log(data)
      //       setHinhAnh(data)
      //     })
      // }, [])

      const { data, isLoading } = useQuery({
            queryKey: ['hangThuongHieuGiaTot'],
            queryFn: () => getData('/hangThuongHieuGiaTot'),
            staleTime: SLATE_TIME,
            cacheTime: SLATE_TIME * 2,
      })

      useEffect(() => {
            if (!isLoading) {
                  // console.log(data?.data)
                  setHinhAnh(data?.data)
            }
      }, [isLoading])

      const style = {
            width: '100%',
            height: '100%',
            borderRadius: '4px',
      }

      return (
            <div className='container_thuongHieuGiaTot dienThoai:hidden'>
                  <h2 className='thuongHieuGiaTot_title'>Thương hiệu giá tốt</h2>
                  <div className='hangThuongHieuGiaTot'>
                        {!isLoading &&
                              hinhAnh &&
                              hinhAnh.map((data) => {
                                    return (
                                          <div className={`item item${data.id}`} key={data.id}>
                                                <img src={require(`${data.hinhAnh}`)} alt='' style={style} />
                                          </div>
                                    )
                              })}
                  </div>
            </div>
      )
}

export default memo(HangThuongHieuGiaTot)
