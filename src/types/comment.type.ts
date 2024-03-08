import { TCloudinaryImage } from '../Customer/Sell/types/cloudinary.typs'
import { TImageCLoudinary } from './cloudinary.type'
import { TProductDetail } from './product/product.type'
import { UserResponse } from './user.type'

export type Comment = {
      _id: string
      comment_user_id: UserResponse
      comment_product_id: TProductDetail
      comment_content: string
      comment_vote: number
      comment_image: TCloudinaryImage[]
      comment_date: Date
}

export interface CommentImage {
      user_id: string
      image: {
            secure_url: string
            public_id: string
            _id: string
            create_time_upload: Date
      }
}
