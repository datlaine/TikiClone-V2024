import React from 'react'
import Portal from '../../../component/Portal'
import { useMutation } from '@tanstack/react-query'
import ProductApi from '../../../apis/product.api'
import { useDispatch } from 'react-redux'
import { addToast } from '../../../Redux/toast'

type TProps = { product_id: string }

const DeleteProduct = (props: TProps) => {
      const { product_id } = props
      const dispatch = useDispatch()

      const deleteProductWithId = useMutation({
            mutationKey: ['deleteProductWithId'],
            mutationFn: (product_id: string) => ProductApi.deleteProductWithId({ product_id }),
            onSuccess: () => {
                  dispatch(addToast({ type: 'SUCCESS', message: 'Xóa thành công', id: Math.random().toString() }))
            },
            onError: () => {
                  dispatch(addToast({ type: 'ERROR', message: 'Xóa không thành công', id: Math.random().toString() }))
            },
      })

      const verifyDeleteProduct = () => {
            deleteProductWithId.mutate(product_id)
      }

      return (
            <Portal>
                  <div className='fixed bg-[rgba(0,0,0,.8)] inset-0 flex items-center justify-center'>
                        <div className='w-[300px] h-[150px] bg-white rounded-md'>
                              <div className=' px-[12px] py-[10px]'>
                                    <p>Bạn xác nhận xóa sản phẩm id: {product_id} </p>
                                    <div className=''>
                                          <button className='w-[50px] h-[30px] px-[6px] py-[4px] border-[1px] border-blue-500 flex items-center justify-center text-blue-500 bg-white'>
                                                Hủy
                                          </button>
                                          <button
                                                className='w-[50px] h-[30px] px-[6px] py-[4px] border-[1px] border-red-500 flex items-center justify-center text-white bg-red-500'
                                                onClick={verifyDeleteProduct}
                                          >
                                                Xác nhận
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </Portal>
      )
}

export default DeleteProduct
