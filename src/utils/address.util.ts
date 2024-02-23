import { UserAddress } from '../types/user.type'

export const renderStringAddressDetail = (address: UserAddress) => {
      if (!address) return
      const street = address.address_street
      return `Địa chỉ:${street} - ${renderStringAddress(address)}`
}

export const renderStringAddress = (address: UserAddress) => {
      const ward = address.address_ward
      const district = address.address_district
      const province = address.address_province
      return `${ward}, ${district}, ${province}`
}
