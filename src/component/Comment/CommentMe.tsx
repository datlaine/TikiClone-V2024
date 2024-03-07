import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import CommentService from '../../apis/comment.service'
import BoxCommentProduct from '../BoxUi/BoxCommentProduct'
import { TProductDetail } from '../../types/product/product.type'
import CommentItem from './CommentItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UserResponse } from '../../types/user.type'

type TProps = {
      product: TProductDetail
}

const CommentMe = (props: TProps) => {
      const { product } = props

      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse

      const [openComment, setOpenComment] = useState<boolean>(false)
      const [openBoxComment, setOpenBoxComment] = useState<boolean>(false)

      const getMeCommentQuery = useQuery({
            queryKey: ['get-me-comment'],
            queryFn: () => CommentService.getMeComment({ product_id: product._id }),
      })

      useEffect(() => {
            if (openComment) {
                  document.body.style.overflow = 'hidden'
            } else {
                  document.body.style.overflow = 'unset'
            }
      }, [openComment])
      const comment = getMeCommentQuery.data?.data.metadata.comment

      return (
            <div>
                  {getMeCommentQuery.data?.data.metadata.comment && comment && (
                        <div className='relative '>
                              <CommentItem comment={comment} />
                              {user._id === comment?.comment_user_id?._id && (
                                    <button className='absolute bottom-[30px] right-[30px]' onClick={() => setOpenBoxComment(true)}>
                                          Chỉnh sửa
                                    </button>
                              )}

                              {openBoxComment && (
                                    <BoxCommentProduct
                                          defaultValue={{
                                                content: comment.comment_content,
                                                secure_url: comment.comment_image[0]?.secure_url,
                                                vote: comment.comment_vote,
                                          }}
                                          mode='UPDATE'
                                          public_id={comment.comment_image[0].public_id}
                                          product={product}
                                          onClose={setOpenBoxComment}
                                    />
                              )}
                        </div>
                  )}

                  {!comment && (
                        <div>
                              <button
                                    className=' mx-auto mt-[30px] w-[180px] h-[40px] border-[1px]  border-blue-400 text-blue-400 bg-[#ffffff] rounded'
                                    onClick={() => setOpenComment(true)}
                              >
                                    Viết đánh giá
                              </button>

                              {openComment && getMeCommentQuery.isSuccess && (
                                    <BoxCommentProduct
                                          onClose={setOpenComment}
                                          mode='UPLOAD'
                                          product={product}
                                          defaultValue={{ content: '', vote: 5, secure_url: '' }}
                                          public_id={''}
                                    />
                              )}
                        </div>
                  )}
            </div>
      )
}

export default CommentMe
