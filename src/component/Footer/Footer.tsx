import React from 'react'

import boCT_1 from './assets/img/others/bo-cong-thuong-2.png'
import boCT_2 from './assets/img/others/bo-cong-thuong.svg'
import boCT_3 from './assets/img/others/dmca_protected_sml_120y.png'
import atm from './assets/img/Cards/atm.png'
import visa from './assets/img/Cards/Visa_Inc._logo.svg.png'
import masterCard from './assets/img/Cards/masterCard.png'
import jcb from './assets/img/Cards/jcb.png'
import atm1 from './assets/img/Cards/atm1.jpg'
import momo from './assets/img/Cards/momo.png'
import zaloPay from './assets/img/Cards/zalopay.png'
import phone from './assets/img/Cards/phone.png'
import vnPay from './assets/img/Cards/vnpay.jpg'
import tienMat from './assets/img/Cards/tienMat.jpg'
import traGop from './assets/img/Cards/traGop.png'
import tikiNow from './assets/img/others/tikiNow.png'

import facebook from './assets/img/others/facebook.png'
import youtube from './assets/img/others/youtube.png'
import zalo from './assets/img/others/zalo.png'

import Qr from './assets/img/others/qr.png'
import ios from './assets/img/others/IOS.png'
import androi from './assets/img/others/androi.png'

const mock = [
      {
            title: 'Hỗ trợ khách hàng',
            data: [
                  'Hotline: 1900-6035',
                  '(1000 đ/phút, 8-21h kể cả T7, CN)',
                  'Các câu hỏi thường gặp',
                  'Gửi yêu cầu hỗ trợ',
                  'Hướng dẫn đặt hàng',
                  'Phương thức vận chuyển',
                  'Chính sách đổi trả',
                  'Hướng dẫn trả góp',
                  'Chính sách hàng nhập khẩu',
                  'Hỗ trợ khách hàng: hotro@tiki.vn',
                  'Báo lỗi bảo mật: security@tiki.vn',
            ],
      },

      {
            title: 'Về Tiki',
            data: [
                  'Giới thiệu Tiki',
                  'Tiki blog',
                  'Tuyển dụng',
                  'Chính sách bảo mật thanh toán',
                  'Chính sách bảo mật thông tin cá nhân',
                  'Chính sách giải quyết khiếu nại',
                  'Điều khoản sử dụng',
                  'Giới thiệu Tiki xu',
                  'Gửi Astra nhận xu mua sắm thả ga',
                  'Tiếp thị liên kết cùng Tiki',
                  'Bán hàng doanh nghiệp',
                  'Điều kiện vận chuyển',
            ],
      },
      { title: 'Hợp tác và liên kết', data: ['Quy chế hoạt động Sàn GDTMĐT', 'Bán hàng cùng Tiki'], subTitle: 'Chứng nhận bởi' },

      {
            title: 'Phương thức thanh toán',
            data: [atm, visa, masterCard, jcb, atm1, momo, zaloPay, phone, vnPay, tienMat, traGop],
            subTitle: 'Dịch vụ giao hàng',
            subData: [tikiNow],
      },
      {
            title: 'Kết nối với chúng tôi',
            data: [facebook, youtube, zalo],
            subTitle: 'Tải ứng dụng trên điện thoại',
            subData: [Qr, ios, androi],
      },
]

interface IProps extends React.HTMLProps<HTMLDivElement> {}

const Footer = ({ ...props }: IProps) => {
      // const { ...props } = props

      return (
            <div className=' h-auto bg-white border-1 border-white rounded-lg' {...props}>
                  <div className='w-full '>
                        <div className=' flex  justify-between gap-10   p-[25px]'>
                              <div className='basis-1/5 flex flex-col pb-[25px] min-h-[150px] h-auto'>
                                    <h3 className='footer-title'>{mock[0].title}</h3>
                                    <div className='basis-4/5 flex flex-col gap-2 relative'>
                                          {mock[0].data.map((item) => (
                                                <div className='flex flex-col relative ' key={item}>
                                                      <span className='footer-span'>{item}</span>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                              <div className='basis-1/5 flex flex-col pb-[25px] min-h-[150px] h-auto'>
                                    <h3 className='footer-title'>{mock[1].title}</h3>
                                    <div className='basis-4/5 flex flex-col gap-2 relative'>
                                          {mock[1].data.map((item) => (
                                                <span className='footer-span' key={item}>
                                                      {item}
                                                </span>
                                          ))}
                                    </div>
                              </div>
                              <div className='basis-1/5 flex flex-col pb-[25px] min-h-[150px] h-[200px]'>
                                    <h3 className='footer-title'>{mock[2].title}</h3>
                                    <div className='basis-4/5 flex flex-col gap-2 relative'>
                                          {mock[2].data.map((item) => (
                                                <span className='footer-span' key={item}>
                                                      {item}
                                                </span>
                                          ))}
                                    </div>
                                    <h3 className='footer-title'>{mock[2].subTitle}</h3>
                                    <div className='flex gap-1 items-center'>
                                          <img src={boCT_1} alt='Bộ công thương' className='w-[20%] h-[45px]' />
                                          <img src={boCT_2} alt='Bộ công thương' className='w-[50%] h-[55px]' />
                                          <img src={boCT_3} alt='Bộ công thương' className='w-[20%] h-[45px]' />
                                    </div>
                              </div>
                              <div className='basis-1/5 flex flex-col gap-y-2'>
                                    <h3 className='footer-title'>{mock[3].title}</h3>
                                    <div className='basis-2/6 grid grid-cols-4 grid-row-[30px_30px_30px] gap-y-[1px] relative'>
                                          {mock[3].data.map((item) => (
                                                <div className='flex items-center justify-center' key={item}>
                                                      <img src={item} alt='' />
                                                </div>
                                          ))}
                                    </div>
                                    <div className='h-[45px]'>
                                          <h3 className='footer-title'>{mock[3].subTitle}</h3>
                                    </div>
                                    <div className='w-[85px]'>
                                          <img src={tikiNow} className='w-full rounded-[999px]' alt='' />
                                    </div>
                              </div>
                              <div className='basis-1/5  flex flex-col gap-y-5'>
                                    <h3 className='footer-title'>{mock[4].title}</h3>
                                    <div className='basis-1/6 flex  gap-y-[15px] justify-between'>
                                          {mock[4].data.map((item) => (
                                                <div className='basis-1/4 flex items-center justify-center rounded-[999px]' key={item}>
                                                      <img src={item} alt='' />
                                                </div>
                                          ))}
                                    </div>
                                    <h3 className='footer-title'>{mock[4].subTitle}</h3>
                                    <div className='basis-4 /6 flex gap-x-2'>
                                          <div className='basis-1/2 h-full'>
                                                <img src={Qr} className='w-full h-full' alt='' />
                                          </div>
                                          <div className='basis-1/2 flex flex-col gap-y-2 h-full'>
                                                <img src={ios} alt='' className='basis-1/2' />
                                                <img src={androi} alt='' className='basis-1/2' />
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <hr />
                  </div>
            </div>
      )
}

export default Footer
