import React from 'react'
import style from './style/supportTiki.module.css'
import svg from './img/bo-cong-thuong.svg'
export default function SupportTiki() {
    return (
        <div className={style.supportTiki}>
            <div>
                <h3>Hỗ trợ khách hàng</h3>
                <ul>
                    <li className={style.item}>Hotline: 1900-6035</li>
                    <li className={style.item}>(1000 đ/phút, 8-21h kể cả T7, CN)</li>
                    <li className={style.item}>Các câu hỏi thường gặp</li>
                    <li className={style.item}>Gửi yêu cầu hỗ trợ</li>
                    <li className={style.item}>Hướng dẫn đặt hàng</li>
                    <li className={style.item}>Phương thức vận chuyển</li>
                    <li className={style.item}>Chính sách đổi trả</li>
                    <li className={style.item}>Hướng dẫn trả góp</li>
                    <li className={style.item}>Chính sách hàng nhập khẩu</li>
                    <li className={style.item}>Hổ trợ khác hàng: hoTro@tiki.vn</li>
                    <li className={style.item}>Báo lỗi bảo mật: security@tiki.vn</li>
                </ul>
            </div>
            <div>
                <h3>Về Tiki</h3>
                <ul>
                    <li className={style.item}>Giới thiệu Tiki</li>
                    <li className={style.item}>Tiki blog</li>
                    <li className={style.item}>Tuyển dụng</li>
                    <li className={style.item}>Chính sách bảo mật thanh toán</li>
                    <li className={style.item}>Chính sách bảo mật thông tin cá nhân</li>
                    <li className={style.item}>Chính sách giải quyết khiếu nại</li>
                    <li className={style.item}>Điều khoản sử dụng</li>
                    <li className={style.item}>Giới thiệu Tiki xu</li>
                    <li className={style.item}>Gửi Astra nhận xu mua sắm thả ga</li>
                    <li className={style.item}>Tiếp thị liên kết cùng Tiki</li>
                    <li className={style.item}>Bán hàng doanh nghiệp</li>
                    <li className={style.item}>Điều kiện vận chuyển</li>
                </ul>
            </div>
            <div>
                <h3>Hợp tác và liên kết </h3>
                <div className={style.containerHinhAnhVerify}>
                    <p>Quy chế hoạt động sàn GDTMDT</p>
                    <p>Bán hàng cùng Tiki</p>
                    <h4>Chứng nhận bởi</h4>
                    <div className={style.wrapperHinhAnhVerify}>
                        <img src={require('./img/bo-cong-thuong-2.png')} className={style.hinhAnhVerify} alt='' />
                        <img src={svg} alt='' className={style.svg} />
                    </div>
                </div>
            </div>

            <div className={style.containerThanhToan}>
                <h3>Phương thức thanh toán</h3>
                <div className={style.wrapperThanhToan}>
                    <img src={require('./phuongThucThanhToan/atm1.jpg')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/Visa_Inc._logo.svg.png')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/masterCard.png')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/jcb.webp')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/momo.png')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/zalopay.png')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/moce.png')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/phone.png')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/logo VNPAY-02.png')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/tienMat.jpg')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/traGop.png')} className={style.hinhAnhIconThanhToan} alt='' />
                    <img src={require('./phuongThucThanhToan/atm.png')} className={style.hinhAnhIconThanhToan} alt='' />
                </div>
                <div className={style.dichVuGiaoHang}>
                    <h4>Dịch vụ giao hàng</h4>
                    <img src={require('./img/tikiNow.png')} alt='' />
                </div>
            </div>

            <div className={style.containerContactTiki}>
                <h3>Kết nối với chúng tôi</h3>
                <div className={style.wrapperHinhAnhContact}>
                    <img src={require('./img/facebook.png')} alt='' />
                    <img src={require('./img/youtube.png')} alt='' />
                    <img src={require('./img/zalo.webp')} alt='' />
                </div>
                <div className={style.wrapperDownload}>
                    <h3>Tải ứng dụng trên điện thoại</h3>
                    <div className={style.wrapperDownload_GRID}>
                        <img src={require('./img/qr.png')} className={style.QR} alt='' />
                        <img src={require('./img/IOS.png')} className={style.IOS} alt='' />
                        <img src={require('./img/androi.png')} className={style.ANDROI} alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}
