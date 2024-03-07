import { TImageCLoudinary } from './cloudinary.type'
import { TProductDetail } from './product/product.type'
import { UserResponse } from './user.type'

export type Comment = {
      comment_user_id: UserResponse
      comment_product_id: TProductDetail
      comment_content: string
      comment_vote: number
      comment_image: TImageCLoudinary[]
      comment_date: Date
}
