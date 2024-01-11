export const rulesVerify = (getValues) => ({
      email: {
            required: {
                  value: true,
                  message: 'Email là bắt buộc',
            },
            pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Email không đúng định dạng',
            },
            minLength: {
                  value: 12,
                  message: 'Email ít nhất 12 ký tự',
            },
            maxLength: {
                  value: 50,
                  message: 'Email tối đa 50 ký tự',
            },
      },
      password: {
            required: {
                  value: true,
                  message: 'Mật khẩu là bắt buộc',
            },

            minLength: {
                  value: 8,
                  message: 'Mật khẩu ít nhất 8 ký tự',
            },
            maxLength: {
                  value: 50,
                  message: 'Mật khẩu tối đa 50 ký tự',
            },
      },

      confirm_password: {
            required: {
                  value: true,
                  message: 'Mật khẩu là bắt buộc',
            },

            minLength: {
                  value: 8,
                  message: 'Mật khẩu ít nhất 8 ký tự',
            },
            maxLength: {
                  value: 50,
                  message: 'Xác nhận mặt khẩu tối đa 50 ký tự',
            },
            validate: typeof getValues === 'function' ? (value) => value === getValues('password') || 'Mật khẩu không khớp' : undefined,
      },
})
