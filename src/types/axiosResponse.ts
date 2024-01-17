export type TApiRegisterResponse<T extends object> = {
      code: number
      message: string
      metadata: {
            user: T
            access_token: string
      }
}
