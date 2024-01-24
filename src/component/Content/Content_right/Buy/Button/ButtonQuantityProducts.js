import React, { useState } from 'react'
import { useLayoutEffect } from 'react'
import style from './buttonQuantity.module.css'

export default function ButtonQualityProducts({ getQuantity }) {
    const [quantity, setQuantity] = useState(1)

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1)
    }

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
        return
    }

    useLayoutEffect(() => {
        getQuantity(quantity)
    }, [quantity])

    return (
        <div className={style.btnWrapper}>
            <button className={`${style.btn} ${quantity > 1 ? '' : 'cursor-not-allowed	'}`} onClick={handleDecrease}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
                </svg>
            </button>
            <span className={style.quantity}>{quantity}</span>
            <button className={`${style.btn}`} onClick={handleIncrease}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
                </svg>
            </button>
        </div>
    )
}
