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
        avatar_used?: Data
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
    avatar: TAvatar
    avartar_url_default: 'https://res.cloudinary.com/demonodejs/image/upload/v1705389477/static/o5gxkgehijtg9auirdje.jpg'
    avatar_used: TAvatar[]
}

export type TAvatar = {
    secure_url: string
    public_id: string
    date_update: Date
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

export type TUserAvatarUsed = {
    public_id: string
    secure_url: string
    _id: string
    date_update: Date
}

// const avatar_used = {
//       public_id: 'users/65ade3b5bc55ac67c48dd227/avatar/njeka2zpy37hwbiyyn1u',
//       secure_url:
//             'https://res.cloudinary.com/demonodejs/image/upload/v1705895164/users/65ade3b5bc55ac67c48dd227/avatar/njeka2zpy37hwbiyyn1u.png',
//       _id: '65ade70fbc55ac67c48dd24e',
// }
