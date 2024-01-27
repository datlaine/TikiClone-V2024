import { Select } from 'antd'
import moment from 'moment'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const CustomerAccountBirth = () => {
    //react hook form
    const {
        clearErrors,
        control,
        watch,
        formState: { errors },
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
        /* điều kiện bắt buộc 3 biến giá trị nhận từ select của antd là number 
phải convert sang string mới check được vaild của thư viện momnent
-> Giá trị ban đầu lúc người dùng chưa cập nhập ngày sinh thì 'Ngày' 'Tháng' 'Năm', cho phải có ngoại lệ cho 3 trường trên
tránh việc người dùng không cập nhập, sửa đổi giá trị bob sẽ gây ra lỗi
vaild -> thì return true
not -> reutrn false
giá trị mặc định không bị sữa đổi -> true
*/
        console.log('check ngay', Number(day), month, year)
        day = day.toString().trim()
        month = month.toString().trim()
        year = year.toString().trim()
        // if (Number(day) < 9) day = `0${day}`.trim()
        // if (Number(month) < 9) month = `0${month}`.trim()
        const birthFull = `${year.trim()}-${month.trim()}-${day.trim()}`
        const vaild = moment(birthFull).isValid()
        console.log('check ngay 2', moment('2021-2-30').isValid(), birthFull)
        if (vaild) {
            console.log(birthFull, vaild)
            return true
        }
        if (!vaild && day !== 'Ngày' && month !== 'Tháng' && year !== 'Năm') {
            console.log('khong hop le', day, month, year)
            return false
        }
        return true
    }

    const dayAntd = useMemo(() => renderDay(), [])
    const monthAntd = useMemo(() => renderMonth(), [])
    const yearAntd = useMemo(() => renderYear(), [])

    return (
        <div className='ml-[0px] flex-1 flex flex-col  gap-[10px] lg:items-start  w-full lg:justify-start'>
            <div className='flex flex-col gap-[20px] xl:gap-0 sm:flex-row'>
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
                            defaultValue={value || 'Ngày'}
                            style={{ width: 110, borderRadius: '2px', padding: '0px 6px 0px 6px', height: 35, marginTop: -6 }}
                            options={dayAntd}
                            onChange={(value) => {
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
                                if (value > 9) value = `0${value}`
                                const day = watch('birth.day')
                                const year = watch('birth.year')
                                const valid = validator(day, value, year)
                                return valid || 'Ngày không hợp lệ'
                            },
                        },
                    }}
                    render={({ field: { onChange: onChangeHookForm, onBlur, value, ref } }) => (
                        <Select
                            defaultValue={value || 'Tháng'}
                            style={{ width: 110, borderRadius: '2px', padding: '0px 6px 0px 6px', height: 35, marginTop: -6 }}
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
                            defaultValue={value || 'Năm'}
                            style={{ width: 110, borderRadius: '2px', padding: '0px 6px 0px 6px', height: 35, marginTop: -6 }}
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
