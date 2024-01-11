import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState, memo } from 'react'
import { getData } from '../../../../apis/getDataMain'
import { SLATE_TIME } from '../../../../apis/staleTime'
import './GiaTotHomNay.css'
export default memo(function GiaTotHomNay({ urlApi }) {
      // console.log("content-giaToiHomNay re-render");

      const [giaTotHomNay, setGiaTotHomNay] = useState([])

      const { data, isLoading, isSuccess } = useQuery({
            queryKey: [`giaTotHomNay`],
            queryFn: () => getData('/giaTotHomNay'),
            staleTime: SLATE_TIME,
            cacheTime: SLATE_TIME * 2,
      })

      useEffect(() => {
            if (!isLoading) {
                  setGiaTotHomNay(data?.data)
            }
      }, [isLoading])
      let checkQuantity
      let checkSoldOut = false
      return (
            <div className='giaTotHomNay'>
                  {isSuccess &&
                        giaTotHomNay.map((item) => {
                              checkQuantity = item.isBought === 0
                              item.isBought >= 10 ? (checkSoldOut = true) : (checkSoldOut = false)
                              // console.log("checkQuantity: " + checkQuantity)
                              return (
                                    <div className={`item giaTotHomNayItem${item.id}`} key={item.id}>
                                          <div className='hinhAnh'>
                                                <div className='discount'>
                                                      <span>{item.discount}</span>
                                                </div>
                                                <img src={require(`${item.hinhAnh}`)} alt='' width={150} height={150} />
                                                <img className='fast' src={require(`${item.fast}`)} alt='' width={80} height={15} />
                                                <p>
                                                      {item.price} <span>đ</span>
                                                </p>
                                                <div className='buy-container'>
                                                      <div
                                                            className='buy'
                                                            style={{
                                                                  width: checkQuantity
                                                                        ? ''
                                                                        : item.isBought > 10
                                                                        ? `calc(10% * 10)`
                                                                        : `calc(10% * ${item.isBought})`,
                                                                  borderRadius: checkQuantity ? '' : '150px',
                                                                  backgroundColor: checkSoldOut ? '#D53939' : 'rgb(255, 66, 78)',
                                                            }}
                                                      ></div>
                                                      <p>
                                                            {checkQuantity
                                                                  ? 'Vừa mở bán'
                                                                  : checkSoldOut
                                                                  ? 'Đã bán hết'
                                                                  : `Đã bán ${item.isBought}`}
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                              )
                        })}
            </div>
      )
})
