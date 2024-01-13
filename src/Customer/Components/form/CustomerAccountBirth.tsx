import { Preview } from '@mui/icons-material'
import { Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import moment from 'moment'
import React, { SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react'

type TProps = {
      setSelectDay: React.Dispatch<SetStateAction<string>>
      setSelectDayError: React.Dispatch<SetStateAction<boolean>>
}

const CustomerAccountBirth = () => {
      const d = new Date()
      const dayCurrent = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
      const day = useRef(dayCurrent)
      const count = useRef(0)
      count.current += 1
      console.log('Birth')
      const year = useRef(d.getFullYear())
      const [birth, setBirth] = useState({
            day: '',
            month: '',
            year: '',
      })

      const renderDay = useCallback(() => {
            let newYearArray = []
            for (let index = 1; index <= day.current; index++) {
                  newYearArray.push({ value: index, label: index })
            }
            return newYearArray
      }, [])

      const renderMonth = useCallback(() => {
            let newYearArray = []
            for (let index = 1; index <= 12; index++) {
                  newYearArray.push({ value: index, label: index })
            }
            return newYearArray
      }, [])

      const renderYear = useCallback(() => {
            let newYearArray = []
            for (let index = year.current; index > 1900; index--) {
                  newYearArray.push({ value: index, label: index })
            }
            return newYearArray
      }, [])

      useEffect(() => {
            console.log('count', count.current)
      }, [count.current])

      useEffect(() => {
            const birthFull = `${birth.year}-${birth.month}-${birth.day}`
            const vaild = moment(birthFull).isValid()
            if (vaild && birth.day && birth.month && birth.year) console.log(birthFull, vaild)
            return
      }, [birth])

      const dayAntd = useMemo(() => renderDay(), [])
      const monthAntd = useMemo(() => renderMonth(), [])
      const yearAntd = useMemo(() => renderYear(), [])

      // console.log('so ngay', day, month, renderYear())

      console.log(moment('2002-02-30').isValid())
      return (
            <div className='ml-[0px]  2xl:ml-[165px] flex-1 flex flex-col sm:flex-row lg:items-start  w-full lg:justify-start'>
                  <Select
                        defaultValue={'Ngày'}
                        style={{ width: 100, borderRadius: '4px', padding: '0px 6px 0px 6px', height: 50, marginTop: -6 }}
                        options={dayAntd}
                        onChange={(value) => {
                              if (+value <= 9) value = '0' + value
                              console.log(value)
                              setBirth((prev) => ({ ...prev, day: value }))
                        }}
                  />

                  <Select
                        defaultValue={'Tháng'}
                        style={{ width: 100, borderRadius: '4px', padding: '0px 6px 0px 6px', height: 50, marginTop: -6 }}
                        options={monthAntd}
                        onChange={(value) => {
                              if (+value <= 9) value = '0' + value
                              console.log(value)
                              setBirth((prev) => ({ ...prev, month: value }))
                        }}
                  />

                  <Select
                        defaultValue={'Năm'}
                        style={{ width: 100, borderRadius: '4px', padding: '0px 6px 0px 6px', height: 50, marginTop: -6 }}
                        options={yearAntd}
                        onChange={(value) => setBirth((prev) => ({ ...prev, year: value }))}
                  />
            </div>
      )
}

export default CustomerAccountBirth
