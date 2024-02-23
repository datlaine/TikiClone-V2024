import * as z from 'zod'

export const addressSchemaForm = z.object({
      address_type: z.string().min(1),
      address_street: z.string().min(1, 'Tên đường là bắt buộc'),
      address_ward: z.string().min(1, 'Phường/xã là bắt buộc'),
      address_district: z.string().min(1, 'Quận/huyện đường là bắt buộc'),
      address_province: z.string().min(1, 'Tỉnh/Thành đường là bắt buộc'),
})
