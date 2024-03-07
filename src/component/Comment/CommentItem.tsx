import React, { useEffect, useState } from 'react'
import { Comment } from '../../types/comment.type'
import { convertDateToString } from '../../utils/date.utils'
import { Rate } from 'antd'
import { renderLevelVote } from '../../utils/comment.util'
import BoxModalImage from '../../pages/product/BoxModalImage'
import { TImage } from '../../pages/product/Product'

type TProps = {
      comment: Comment
}

const CommentItem = (props: TProps) => {
      const { comment } = props
      const [openModal, setOpenModal] = useState<boolean>(false)

      return (
            <div className='relative flex flex-col xl:flex-row min-h-[140px] h-max py-[16px] border-y-[2px] border-[rgb(245_245_250)] gap-[16px] xl:gap-0'>
                  <div className='w-full xl:w-[35%] min-h-[90px] flex flex-col xl:flex-row  gap-[10px]'>
                        <img
                              src={comment.comment_user_id?.avatar?.secure_url || comment.comment_user_id?.avatar_default_url}
                              className='w-[40px] h-[40px] rounded-full'
                              alt=''
                        />

                        <div className='flex flex-col gap-[6px] text-[14px]'>
                              <span className='text-slate-900 font-semibold'>
                                    {comment.comment_user_id.fullName || comment.comment_user_id.nickName || comment.comment_user_id.email}
                              </span>
                              <p className='text-[12px]'>Đã tham gia {convertDateToString(comment.comment_user_id.createdAt)}</p>
                        </div>
                  </div>
                  <div className='w-full xl:w-[65%] flex  flex-col gap-[12px]'>
                        <div className='flex flex-col xl:flex-row xl:items-center gap-[8px] '>
                              <Rate disabled value={comment.comment_vote} />
                              <span className='text-[16px] text-slate-800 font-bold'>
                                    {renderLevelVote({ vote: comment.comment_vote })}
                              </span>
                        </div>
                        <div className='w-full min-h-[20px] h-max break-words text-[13px] text-gray-600'>
                              {comment.comment_content ? comment.comment_content : 'Không nhận xết'}
                        </div>
                        {comment.comment_image.length > 0 && (
                              <div className='w-full min-h-[80px] h-max flex flex-col gap-[12px]'>
                                    <img
                                          src={comment.comment_image[0].secure_url}
                                          className='w-[80px] h-[80px] rounded-md hover:cursor-pointer'
                                          alt='comment'
                                          onClick={() => setOpenModal(true)}
                                    />
                              </div>
                        )}
                        <p>Đã đăng vào {convertDateToString(comment.comment_date)}</p>
                  </div>

                  {openModal && (
                        <BoxModalImage
                              setOpenModal={setOpenModal}
                              secure_url={[comment.comment_image[0] as unknown as TImage]}
                              imageActive={comment.comment_image[0].public_id}
                        />
                  )}
            </div>
      )
}

export default CommentItem
