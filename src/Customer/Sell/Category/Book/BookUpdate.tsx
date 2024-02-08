import { useParams } from 'next/navigation'
import React from 'react'

export type TProps = {
    product_id: string
}

const BookUpdate = () => {
    const param = useParams()
    const { product_id } = param

    return <div>{product_id}</div>
}

export default BookUpdate
