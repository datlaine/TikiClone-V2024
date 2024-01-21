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
      metadata: {
            user: Data
            access_token?: string
      }
}

export type TUser = {
      email: string
      verify_email: boolean
      gender: 'Male' | 'Female' | 'Other'
      sercel_url: string
      _id: string
      bob: Date
      fullName: string
      nickName: string
      avatar: {
            secure_url: string
            public_id: string
      }
      avartar_url_default: 'https://res.cloudinary.com/demonodejs/image/upload/v1705389477/static/o5gxkgehijtg9auirdje.jpg'
      avatar_used: []
}

// const user = {
//       avatar: {
//             sercel_url: 'https://res.cloudinary.com/demonodejs/image/upload/v1705389477/static/o5gxkgehijtg9auirdje.jpg',
//       },
//       _id: '65acb1b22ec453100ca1c822',
//       email: 'datlai304@gmail.com',
//       verify_email: false,
//       bob: null,
//       gender: 'Male',
//       avartar_url_default: 'https://res.cloudinary.com/demonodejs/image/upload/v1705389477/static/o5gxkgehijtg9auirdje.jpg',
//       avatar_used: [],
//       __v: 0,
// }
