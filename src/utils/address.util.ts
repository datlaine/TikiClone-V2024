import { Address } from '../types/address.type'
import { UserAddress } from '../types/user.type'

export const renderStringAddressDetail = (address: UserAddress, prefix = '') => {
      if (!address) return null
      const street = address.address_street
      return `${prefix ? prefix + ':' : ''}${street} ${renderStringAddress(address)}`
}

export const renderStringAddressDetailV2 = (address: Address | UserAddress, prefix = '') => {
      if (!address) return null
      const street = address.address_street
      return `${prefix ? prefix + ':' : ''}${street} ${renderStringAddressV2(address)}`
}

export const renderStringAddress = (address: UserAddress) => {
      const ward = address.address_ward
      const district = address.address_district
      const province = address.address_province
      return `${ward} ${district} ${province}`
}

export const renderStringAddressV2 = (address: Address | UserAddress) => {
      const ward = address.address_ward.text
      const district = address.address_district.text
      const province = address.address_province.text

      console.log({ ward, district, province })
      return `${ward} ${district} ${province}`
}

export const getAddressDefault = (address: UserAddress[]) => {
      if (!address) return null
      const addressDefault = address.find((addressItem) => addressItem.address_default)
      return addressDefault ? addressDefault : null
}
