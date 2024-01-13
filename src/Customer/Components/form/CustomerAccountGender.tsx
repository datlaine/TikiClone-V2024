import { Radio, RadioChangeEvent } from 'antd'
import React, { useState } from 'react'

type TGender = {
      MALE: 'Male'
      FEMALE: 'Female'
      OTHERS: 'Other'
}

const CustomerAccountGender = () => {
      const [gender, setGender] = useState<keyof TGender>('MALE')

      const formChangeGender = (e: RadioChangeEvent) => {
            setGender(e.target.value)
      }
      return (
            <div className='ml-[0px] 2xl:ml-[165px] flex-1 flex-col md:flex-row'>
                  <Radio.Group onChange={formChangeGender} value={gender}>
                        <Radio value={'MALE'}>Male</Radio>
                        <Radio value={'FEMALE'}>Female</Radio>
                        <Radio value={'OTHERS'}>OTHERS</Radio>
                  </Radio.Group>
            </div>
      )
}

export default CustomerAccountGender
