import React, { useEffect, useState } from 'react'
import { CommentImage } from '../../types/comment.type'
import { useQuery } from '@tanstack/react-query'
import CommentService from '../../apis/comment.service'
import BoxModalImage from '../../pages/product/BoxModalImage'
import { TImage } from '../../pages/product/Product'

type TProps = {
      // comment_images: CommentImage[]
      product_id: string
}

const CommentImageAll = (props: TProps) => {
      const { product_id } = props

      const [openModel, setOpenModal] = useState<boolean>(false)
      const [imageUrl, setimageUrl] = useState<{ secure_url: string }[]>([])
      const [imageActive, setImageActive] = useState<string>('')

      const getAllCommentImage = useQuery({
            queryKey: ['get-all-comment-image'],
            queryFn: () => CommentService.getAllCommentImage({ product_id }),
      })

      const comment_images = getAllCommentImage.data?.data.metadata.comment_images

      const onClickOpenModel = (imageActive: string) => {
            setOpenModal(true)
            setImageActive(imageActive)
      }

      useEffect(() => {
            if (getAllCommentImage.isSuccess) {
                  setimageUrl(() => {
                        let newArray = []
                        newArray = getAllCommentImage.data.data.metadata.comment_images.map((img) => img.image)
                        return newArray
                  })
            }
      }, [getAllCommentImage.isSuccess, getAllCommentImage.data])

      useEffect(() => {
            if (openModel) {
                  document.body.style.overflow = 'hidden'
            } else {
                  document.body.style.overflow = 'unset'
            }
      }, [openModel])

      return (
            <>
                  {getAllCommentImage.isSuccess && getAllCommentImage.data.data.metadata.comment_images.length > 0 && (
                        <div className='ml-auto my-[25px] w-[136px] xl:w-[655px] min-h-[60px] xl:min-h-[80px] h-max'>
                              <h4>Tất cả hình ảnh</h4>
                              {getAllCommentImage.isSuccess && (
                                    <div className='relative w-full h-full flex flex-col gap-[19px] xl:gap-[16px] overflow-x-hidden'>
                                          <div className='w-[655px] ml-auto overflow-x-hidden '>
                                                <div className='w-[40%] xl:w-full flex flex-1  gap-[16px]'>
                                                      {comment_images?.map((image) => (
                                                            <img
                                                                  onClick={() => onClickOpenModel(image.image.secure_url)}
                                                                  key={image.image._id}
                                                                  src={image.image.secure_url}
                                                                  className='min-w-[60px] h-[60px] xl:min-w-[80px] xl:h-[80px] rounded hover:cursor-pointer'
                                                                  alt='comment'
                                                            />
                                                      ))}
                                                </div>
                                          </div>
                                          <div
                                                className='absolute bottom-0 right-0 min-w-[60px] h-[60px] xl:min-w-[80px] xl:h-[80px] bg-[rgba(0,0,0,.6)] flex items-center justify-center text-white hover:cursor-pointer'
                                                onClick={() => onClickOpenModel(imageUrl[0].secure_url)}
                                          >
                                                (+{comment_images?.length})
                                          </div>
                                    </div>
                              )}
                              {openModel && (
                                    <BoxModalImage
                                          secure_url={imageUrl as unknown as TImage[]}
                                          setOpenModal={setOpenModal}
                                          imageActive={imageActive}
                                          transitionDuration={1}
                                    />
                              )}
                        </div>
                  )}
            </>
      )
}

export default CommentImageAll
