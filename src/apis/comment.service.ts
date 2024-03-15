import { ModeForm } from '../component/BoxUi/BoxShopForm'
import { TResponseApi } from '../types/axiosResponse'
import { Comment, CommentImage } from '../types/comment.type'
import axiosCustom from './http'
import { DetailComment } from './product.api'
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

export type GetAllCommentHasImage = {
      product_id: string
      page: number
      limit: number
}

export type GetAllCommentFilterLevel = {
      product_id: string
      minVote: number
      maxVote: number
      page: number
      limit: number
}

class CommentService {
      static async addComment({ params, state, mode }: { params: AddCommentParam; state: StateFile; mode: ModeForm }) {
            return axiosCustom.post(`/v1/api/comment/add-comment?state=${state}&mode=${mode}`, params, {
                  headers: { 'content-Type': 'multipart/form-data' },
            })
      }

      static async deleteComment({ comment_product_id }: { comment_product_id: string }) {
            return axiosCustom.delete('/v1/api/comment/delete-comment', { params: { product_id: comment_product_id } })
      }

      static async getMeComment(params: GetMeCommentParam) {
            return axiosCustom.get<TResponseApi<{ comment: Comment }>>('/v1/api/comment/get-me-comment', { params })
      }

      static async getCommentCore({ product_id }: { product_id: string }) {
            return axiosCustom.get<
                  TResponseApi<{ totalCommentProduct: number; comment_avg: number; detailComment: DetailComment; vote: number }>
            >('/v1/api/comment/get-comment-core', { params: { product_id } })
      }

      static async getMeAllComment({ page, limit }: { page: number; limit: number }) {
            return axiosCustom.get<TResponseApi<{ comments: Comment[]; total: number }>>('/v1/api/comment/get-me-all-comment', {
                  params: { page, limit },
            })
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

      static async geAllCommentHasImage(params: GetAllCommentFilterLevel) {
            return axiosCustom.get<TResponseApi<{ comments: Comment[]; total: number }>>('/v1/api/comment/get-all-comment-has-image', {
                  params,
            })
      }

      static async getAllCommentFollowLevel(params: GetAllCommentFilterLevel) {
            return axiosCustom.get<TResponseApi<{ comments: Comment[]; total: number }>>('/v1/api/comment/get-all-comment-follow-level', {
                  params,
            })
      }
}

export default CommentService
