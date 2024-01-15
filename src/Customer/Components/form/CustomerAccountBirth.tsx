import { Preview } from '@mui/icons-material'
import { Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const CustomerAccountBirth = () => {
      const [formBirthError, setFormBirthError] = useState(false)
      const countRef = useRef(0)
      const {
            control,
            watch,
            formState: { errors },
            clearErrors,
      } = useFormContext()
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
            if (vaild && birth.day && birth.month && birth.year) {
                  console.log(birthFull, vaild)
                  setFormBirthError(false)
            }
            if (!vaild && birth.day && birth.month && birth.year) {
                  console.log('khong hop le')
                  setFormBirthError(true)
            }
            return
      }, [birth])

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

      // console.log('so ngay', day, month, renderYear())

      console.log(moment('2002-02-30').isValid())
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
                                                clearErrors()
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
                                                clearErrors()

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
                                                clearErrors()

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
