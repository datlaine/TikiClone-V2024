import * as z from 'zod'

//@ schema product
export const productSchema = z.object({
      product_name: z
            .string({
                  required_error: 'Name is required',
                  invalid_type_error: 'Name must be a string',
            })
            .min(1, { message: 'Tên sản phẩm là bắt buộc' }),

      product_price: z
            .number({ required_error: 'Giá phải là một số', invalid_type_error: 'Gia phai la so' })
            .min(1, { message: 'Giá là bắt buộc' })
            .positive({ message: 'Giá phải lớn hơn 0' })
            .lte(10000000000, { message: 'Sản phẩm có giá tối đa là 10 tỷ VNĐ' }),
      product_available: z
            .number()
            .min(1, { message: 'Số lượng sản phẩm là bắt buộc' })
            .positive({ message: 'Giá phải lớn hơn 0' })
            .lte(10000000000, { message: 'Sản phẩm có giá tối đa là 10 tỷ VNĐ' }),
})

export type BookType = 'Novel' | 'Manga' | 'Detective'

export const productBookSchema = z.object({
      attribute: z.object({
            publishing: z.string().min(1, 'Tên nhà xuất bản là bắt buộc'),
            page_number: z.number().min(1, 'Số trang là bắt buộc').max(3004, 'Sách nhiều nhất 3004'),
            author: z.string().min(1, 'Tên tác giả là bắt buộc'),
            book_type: z.enum(['Novel', 'Manga', 'Detective']),
            description: z.string().min(1, 'Vui lòng nhập thêm thông tin mô tả về sản phẩm').max(1000, 'Tối đa 1000 từ'),
      }),
})

//@schema product -> food
export const productFoodSchema = z.object({
      factory: z.string().min(1, 'Tên xưởng sản xuất là bắt buộc'),
      food_type: z.enum(['Snacks', 'Tea', 'Coffee', 'Others']),
      food_unit: z.enum(['Package', 'Box', 'Weight']),
      description: z.string().min(1, 'Vui lòng nhập thêm thông tin mô tả về sản phẩm').max(1000, 'Tối đa 1000 từ'),
})
