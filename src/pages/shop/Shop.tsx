import React from 'react'
import { useParams } from 'react-router-dom'

const Shop = () => {
      const { shop_id } = useParams()

      return <div>Shop {shop_id}</div>
}

export default Shop
