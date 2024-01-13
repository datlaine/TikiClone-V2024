import { Select } from 'antd'
import React, { useState } from 'react'

const CustomerAccountBirth = () => {
      const [day, setDay] = useState(() => {
            const d = new Date()
            const year = d.getFullYear()
            const month = d.getMonth() + 1
            const day = new Date(year, month, 0).getDate()
            return day
      })

      console.log('so ngay', day)
      return (
            <div className='form_user w-full h-[50%] bg-blue-500 mt-[30px] flex gap-[10%]'>
                  <div className='label w-[100px] bg-red-300'>
                        <span>Ngày sinh</span>
                  </div>
                  <div className='form flex-1 bg-green-300 '>
                        <Select
                              defaultValue={'Ngày'}
                              style={{ width: 100, borderRadius: '4px', padding: '0px 6px 8px 6px', height: 50 }}
                              options={Array(day)
                                    .fill(0)
                                    .map((d, index) => {
                                          return {
                                                value: index + 1,
                                                label: index + 1,
                                          }
                                    })}
                        />

                        <Select
                              defaultValue={'Tháng'}
                              style={{ width: 100, borderRadius: '4px', padding: '8px 6px', height: 50 }}
                              options={Array(day)
                                    .fill(0)
                                    .map((d, index) => {
                                          return {
                                                value: index + 1,
                                                label: index + 1,
                                          }
                                    })}
                        />

                        <Select
                              defaultValue={'Năm'}
                              style={{ width: 100, borderRadius: '4px', padding: '8px 6px', height: 50 }}
                              options={Array(day)
                                    .fill(0)
                                    .map((d, index) => {
                                          return {
                                                value: index + 1,
                                                label: index + 1,
                                          }
                                    })}
                        />
                  </div>
            </div>
      )
}

export default CustomerAccountBirth
