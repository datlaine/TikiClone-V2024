export type TCloudinaryImage = {
      secure_url: string
      public_id: string
}

export type ICLoudinarySecureUrl = Pick<TCloudinaryImage, 'secure_url'>
export type TCloudinaryPublicId = Pick<TCloudinaryImage, 'public_id'>
