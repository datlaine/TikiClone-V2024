export type Address = {
      address_street: string
      address_ward: {
            code: string
            text: string
      }
      address_district: {
            code: string
            text: string
      }
      address_province: {
            code: string
            text: string
      }
      address_text: string

      type: 'Home' | 'Company' | 'Private'
}
