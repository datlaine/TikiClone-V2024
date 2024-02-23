export type TApiRegisterResponse<T extends object> = {
      code: number
      message: string
      metadata: {
            user: T
            access_token: string
      }
}

export type TResponseApi<Data> = {
      code: number
      message: string
      // metadata: {
      //     user: Data
      //     access_token?: string

      //     avatar_used?: Data
      //     product_thumb_image?: Data
      //     product: Data
      // }
      metadata: Data
}

export type ServerMessageVerify = {
      message: string
}
