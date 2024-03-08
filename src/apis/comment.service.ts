import { TResponseApi } from '../types/axiosResponse'
import { Comment, CommentImage } from '../types/comment.type'
import axiosCustom from './http'
import { StateFile } from './shop.api'

// export type AddCommentParam = {
//       state: StateFile
//       content: string
//       file: File | undefined
//       countStar: number
//       product_id: string
// }

export interface AddCommentParam extends FormData {
      append(name: 'file' | 'content' | 'countStar' | 'product_id', value: string | Blob, fileName?: string): void
}

export type GetMeCommentParam = {
      product_id: string
}

export type GetAllCommentParam = {
      product_id: string
      page: number
      limit: number
}

class CommentService {
      static async addComment({ params, state }: { params: AddCommentParam; state: StateFile }) {
            return axiosCustom.post(`/v1/api/comment/add-comment?state=${state}`, params, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async getMeComment(params: GetMeCommentParam) {
            return axiosCustom.get<TResponseApi<{ comment: Comment }>>('/v1/api/comment/get-me-comment', { params })
      }

      static async getAllCommentProduct(params: GetAllCommentParam) {
            return axiosCustom.get<TResponseApi<{ comments: Comment[]; total: number; comment_images: CommentImage[] }>>(
                  '/v1/api/comment/get-all-comment',
                  { params },
            )
      }

      static async getAllCommentImage(params: GetMeCommentParam) {
            return axiosCustom.get<TResponseApi<{ comment_images: CommentImage[] }>>('/v1/api/comment/get-all-comment-image', { params })
      }
}

export default CommentService
