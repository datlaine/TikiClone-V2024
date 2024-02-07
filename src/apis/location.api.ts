import axiosCustom from './http'

export type TProvinceReturn = {
    _id: string
    name: string
    slug: string
    type: string
    name_with_type: string
    code: string
    isDeleted: boolean
}
export type TDistrictReturn = {
    _id: string
    name: string
    type: string
    slug: string
    name_with_type: string
    path: string
    path_with_type: string
    code: string
    parent_code: string
    isDeleted: boolean
}
export type TWardReturn = {
    _id: string
    name: string
    type: string
    slug: string
    name_with_type: string
    path: string
    path_with_type: string
    code: string
    parent_code: string
    isDeleted: boolean
}

//province
// {
//         _id: '60eaaa6f1173335842c35663',
//         name: 'An Giang',
//         slug: 'an-giang',
//         type: 'tinh',
//         name_with_type: 'Tỉnh An Giang',
//         code: '89',
//         isDeleted: false,
//     },

//district
//  {
//     _id: '60eaaa6f1173335842c354c0',
//     name: 'Triệu Phong',
//     type: 'huyen',
//     slug: 'trieu-phong',
//     name_with_type: 'Huyện Triệu Phong',
//     path: 'Triệu Phong, Quảng Trị',
//     path_with_type: 'Huyện Triệu Phong, Tỉnh Quảng Trị',
//     code: '469',
//     parent_code: '45',
//     isDeleted: false,
// }

//ward
// _id: '60eaaa721173335842c36dc0',
// name: 'An Châu',
// type: 'thi-tran',
// slug: 'an-chau',
// name_with_type: 'Thị trấn An Châu',
// path: 'An Châu, Châu Thành, An Giang',
// path_with_type: 'Thị trấn An Châu, Huyện Châu Thành, Tỉnh An Giang',
// code: '30589',
// parent_code: '892',
// isDeleted: false,

class LocationApi {
    static async getProvinces() {
        return axiosCustom.get<{ metadata: TProvinceReturn[] }>('v1/api/location/get-all-province')
    }

    static async getDistrict(provinceCode: string) {
        return axiosCustom.get<{ metadata: TDistrictReturn[] }>(`v1/api/location/get-district?province=${provinceCode}`)
    }

    static async getWard(districtCode: string) {
        return axiosCustom.get<{ metadata: TWardReturn[] }>(`v1/api/location/get-ward?district=${districtCode}`)
    }
}

export default LocationApi
