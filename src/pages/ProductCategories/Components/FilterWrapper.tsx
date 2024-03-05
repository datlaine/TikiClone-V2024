import { Filter } from 'lucide-react'
import React, { useState } from 'react'
import BoxFilterProduct from '../../../component/BoxUi/BoxFilterProduct'
import { ProductType } from '../../../types/product/product.type'

type TProps = {
      product_type: ProductType
}

const FilterWrapper = (props: TProps) => {
      const { product_type } = props
      const [openFilter, setOpenFilter] = useState<boolean>(false)

      return (
            <div className='w-full h-full flex items-center'>
                  <button
                        className='min-w-[100px] flex items-center justify-center gap-[4px] h-[40px] bg-[#ffffff] rounded-[999px] border-[1px] border-gray-400'
                        onClick={() => setOpenFilter(true)}
                  >
                        <span>Lọc</span>
                        <Filter />
                  </button>

                  {openFilter && <BoxFilterProduct product_type={product_type} onClose={setOpenFilter} />}
            </div>
      )
}

export default FilterWrapper
