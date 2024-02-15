import { Radio } from 'antd'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export type TGender = {
      Male: 'Male'
      Female: 'Female'
      Other: 'Other'
}

const CustomerAccountGender = () => {
      const { control } = useFormContext() // retrieve all hook methods
      const user = useSelector((state: RootState) => state.authentication.user)
      const [gender, setGender] = useState<keyof TGender>(user.gender || 'Male')

      return (
            <div className='w-full text-left  flex-1 flex-col sm:flex-row'>
                  <Controller
                        control={control}
                        name='gender'
                        render={({ field: { onChange: onChangeHookForm, onBlur, value, ref } }) => (
                              <Radio.Group
                                    onChange={(e) => {
                                          setGender(e.target.value)
                                          onChangeHookForm(e.target.value)
                                    }}
                                    value={gender}
                                    className='flex flex-row '
                              >
                                    <Radio value={'Male'}>Male</Radio>
                                    <Radio value={'Female'}>Female</Radio>
                                    <Radio value={'Others'}>Others</Radio>
                              </Radio.Group>
                        )}
                  />
            </div>
      )
}

export default CustomerAccountGender
