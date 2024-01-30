import React from 'react'
import { useFormContext } from 'react-hook-form'

const Food = () => {
    const form = useFormContext()

    return (
        <div>
            <input {...form.register('company')} />
            <button type='submit'>Submit</button>

            <p>Địa chỉ</p>
        </div>
    )
}

export default Food
