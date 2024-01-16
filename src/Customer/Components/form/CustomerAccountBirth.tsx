import { Select } from 'antd'
import moment from 'moment'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const CustomerAccountBirth = () => {
      //react hook form
      const {
            control,
            watch,
            formState: { errors },
            clearErrors,
      } = useFormContext()

      //get date hien tại
      const d = new Date()
      //lấy số ngày của tháng
      const dayCurrent = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
      const day = useRef(dayCurrent)
      const year = useRef(d.getFullYear())

      //debug
      const count = useRef(0)
      count.current += 1
      console.log('Birth')

      const [birth, setBirth] = useState({
            day: '',
            month: '',
            year: '',
      })

      //render day
      const renderDay = useCallback(() => {
            let newDayArray = []
            for (let index = 1; index <= day.current; index++) {
                  newDayArray.push({ value: index, label: index })
            }
            return newDayArray
      }, [])

      //render month
      const renderMonth = useCallback(() => {
            let newMonthYear = []
            for (let index = 1; index <= 12; index++) {
                  newMonthYear.push({ value: index, label: index })
            }
            return newMonthYear
      }, [])

      //render year
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

      const validator = (day: string, month: string, year: string) => {
            const birthFull = `${year}-${month}-${day}`
            const vaild = moment(birthFull).isValid()
            if (vaild && day && month && year) {
                  console.log(birthFull, vaild)
                  return true
            }
            if (!vaild && day && month && year) {
                  console.log('khong hop le')
                  return false
            }
            return
      }

      const dayAntd = useMemo(() => renderDay(), [])
      const monthAntd = useMemo(() => renderMonth(), [])
      const yearAntd = useMemo(() => renderYear(), [])

      return (
            <div className='ml-[0px]  2xl:ml-[165px] flex-1 flex flex-col  gap-[10px] lg:items-start  w-full lg:justify-start'>
                  <div className='flex flex-col sm:flex-row'>
                        <Controller
                              control={control}
                              name='birth.day'
                              rules={{
                                    required: true,
                                    validate: {
                                          isValidDay: (value) => {
                                                const year = watch('birth.year')
                                                const month = watch('birth.month')
                                                const valid = validator(value, month, year)
                                                return valid || 'Ngày không hợp lệ'
                                          },
                                    },
                              }}
                              render={({ field: { onChange: onChangeHookForm, onBlur, value, ref } }) => (
                                    <Select
                                          defaultValue={'Ngày'}
                                          style={{ width: 100, borderRadius: '4px', padding: '0px 6px 0px 6px', height: 50, marginTop: -6 }}
                                          options={dayAntd}
                                          onChange={(value) => {
                                                if (+value <= 9) value = '0' + value
                                                onChangeHookForm(value)
                                          }}
                                    />
                              )}
                        />

                        <Controller
                              control={control}
                              name='birth.month'
                              rules={{
                                    required: true,
                                    validate: {
                                          isValidDay: (value) => {
                                                const day = watch('birth.day')
                                                const year = watch('birth.year')
                                                const valid = validator(day, value, year)
                                                return valid || 'Ngày không hợp lệ'
                                          },
                                    },
                              }}
                              render={({ field: { onChange: onChangeHookForm, onBlur, value, ref } }) => (
                                    <Select
                                          defaultValue={'Tháng'}
                                          style={{ width: 100, borderRadius: '4px', padding: '0px 6px 0px 6px', height: 50, marginTop: -6 }}
                                          options={monthAntd}
                                          onChange={(value) => {
                                                if (+value <= 9) value = '0' + value
                                                onChangeHookForm(value)
                                          }}
                                    />
                              )}
                        />

                        <Controller
                              control={control}
                              name='birth.year'
                              rules={{
                                    required: true,
                                    validate: {
                                          isValidDay: (value) => {
                                                const day = watch('birth.day')
                                                const month = watch('birth.month')
                                                const valid = validator(day, month, value)
                                                return valid || 'Ngày không hợp lệ'
                                          },
                                    },
                              }}
                              render={({ field: { onChange: onChangeHookForm, onBlur, value, ref } }) => (
                                    <Select
                                          defaultValue={'Năm'}
                                          style={{ width: 100, borderRadius: '4px', padding: '0px 6px 0px 6px', height: 50, marginTop: -6 }}
                                          options={yearAntd}
                                          onChange={(value) => {
                                                if (+value <= 9) value = '0' + value
                                                onChangeHookForm(+value)
                                          }}
                                    />
                              )}
                        />
                  </div>
                  {Object.keys(errors).length > 0 && <p className='w-full ml-[5px] text-red-400'>Ngày không hợp lệ</p>}
            </div>
      )
}

export default CustomerAccountBirth
