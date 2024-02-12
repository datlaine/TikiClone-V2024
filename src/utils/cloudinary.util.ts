import { TCloudinaryImage } from '../Customer/Sell/types/cloudinary.typs'

export const returnPublicIdCloudinary = (cloudinary: TCloudinaryImage[]) => {
      return cloudinary.map((cloud) => cloud.public_id)
}

export const returnSecureUrlCloudinary = (cloudinary: TCloudinaryImage[]) => {
      return cloudinary.map((cloud) => cloud.secure_url)
}
