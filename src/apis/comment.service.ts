import { TResponseApi } from '../types/axiosResponse'
import { Comment } from '../types/comment.type'
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

export type getMeCommentParam = {
      product_id: string
}

class CommentService {
      static async addComment({ params, state }: { params: AddCommentParam; state: StateFile }) {
            return axiosCustom.post(`/v1/api/comment/add-comment?state=${state}`, params, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async getMeComment(params: getMeCommentParam) {
            return axiosCustom.get<TResponseApi<{ comment: Comment }>>('/v1/api/comment/get-me-comment', { params })
      }
}

export default CommentService
