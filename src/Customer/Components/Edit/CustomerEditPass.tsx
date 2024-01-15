import React from 'react'

const CustomerEditPass = () => {
      return (
            <div className='w-full h-[360px] flex items-center justify-center py-[12px]'>
                  <form className='w-[400px] px-[15px] pt-[15px] gap-[6%] h-full border-[1px] border-stone-200 rounded-md'>
                        <div className='h-[25%] flex flex-col gap-[4px]'>
                              <label htmlFor='account_password_current'>Mật khẩu hiện tại</label>
                              <div className='flex justify-between  border-[1px] border-stone-200 rounded-sm items-center px-[16px] py-[6px]'>
                                    <input
                                          type='text'
                                          id='account_password_current'
                                          className='w-[90%] border-none p-[0px]'
                                          placeholder='Nhập mật khẩu hiện tại'
                                    />
                                    <div className='icon w-[15px] h-[15px] bg-red-300'></div>
                              </div>
                        </div>

                        <div className='h-[30%] flex flex-col gap-[4px]'>
                              <label htmlFor='account_password_new'>Nhập mật khẩu mới</label>
                              <div className='flex justify-between  border-[1px] border-stone-200 rounded-sm items-center px-[16px] py-[6px]'>
                                    <input
                                          type='text'
                                          id='account_password_new'
                                          className='w-[90%] border-none p-[0px]'
                                          placeholder='Nhập mật khẩu mới'
                                    />
                                    <div className='icon w-[15px] h-[15px] bg-red-300'></div>
                              </div>
                              <span className='text-[11px] text-stone-600'>Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</span>
                        </div>

                        <div className='h-[25%] flex flex-col gap-[4px]'>
                              <label htmlFor='account_password_confirm'>Nhập lại mật khẩu mới</label>
                              <div className='flex justify-between  border-[1px] border-stone-200 rounded-sm items-center px-[16px] py-[6px]'>
                                    <input
                                          type='text'
                                          id='account_password_confirm'
                                          className='w-[90%] border-none p-[0px]'
                                          placeholder='Nhập lại mật khẩu mới'
                                    />
                                    <div className='icon w-[15px] h-[15px] bg-red-300'></div>
                              </div>
                        </div>
                        <div className='h-[15%] w-full rounded-lg'>
                              <button className='w-full bg-stone-200 text-[rgba(0,0,0,.2)] rounded-[4px]  p-[8px]' type='submit'>
                                    Lưu thay đổi
                              </button>
                        </div>
                  </form>
            </div>
      )
}

export default CustomerEditPass
