import React from 'react'
import Portal from '../../../component/Portal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ProductApi from '../../../apis/product.api'
import { useDispatch } from 'react-redux'
import { addToast } from '../../../Redux/toast'

type TProps = { product_id: string; setModalDeleteProduct: React.Dispatch<React.SetStateAction<boolean>> }

const DeleteProduct = (props: TProps) => {
      const queryClient = useQueryClient()
      const { product_id, setModalDeleteProduct } = props
      const dispatch = useDispatch()

      const deleteProductWithId = useMutation({
            mutationKey: ['deleteProductWithId'],
            mutationFn: (product_id: string) => ProductApi.deleteProductWithId({ product_id }),
            onSuccess: () => {
                  dispatch(addToast({ type: 'SUCCESS', message: 'Xóa thành công', id: Math.random().toString() }))
                  queryClient.invalidateQueries({ queryKey: ['get-product-my-shop'] })
            },
            onError: () => {
                  dispatch(addToast({ type: 'ERROR', message: 'Xóa không thành công', id: Math.random().toString() }))
            },
      })

      const verifyDeleteProduct = () => {
            deleteProductWithId.mutate(product_id)
      }

      const handleHideModal = () => {
            setModalDeleteProduct(false)
      }

      return (
            <Portal>
                  <div className='fixed bg-[rgba(0,0,0,.8)] inset-0 flex items-center justify-center'>
                        <div className='w-[400px] h-[150px] bg-white rounded-md'>
                              <div className='h-full flex flex-col gap-[8px] px-[12px] py-[10px]'>
                                    <div className='flex flex-wrap gap-[4px] '>
                                          <p className='min-w-full'>Bạn xác nhận xóa sản phẩm id:</p>
                                          <span className='text-blue-400'>{'{'}</span>
                                          <span className='text-blue-500 font-bold text-[16px]'>{product_id}</span>
                                          <span className='text-blue-400'>{'}'}</span>
                                    </div>
                                    <div className='flex flex-1  gap-[16px] items-center justify-center'>
                                          <button
                                                className='w-[100px] h-[36px] px-[6px] py-[4px] border-[1px] border-blue-500 flex items-center justify-center text-blue-500 bg-white rounded-lg'
                                                onClick={handleHideModal}
                                          >
                                                Hủy
                                          </button>
                                          <button
                                                className='w-[100px] h-[36px] px-[6px] py-[4px] border-[1px] border-red-500 flex items-center justify-center text-white bg-red-500 rounded-lg'
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
