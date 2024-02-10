import React from 'react'
import style from './style/brandPromotionTiki.module.css'

export default function BrandPromotionTiki() {
      return (
            <div className={style.containerBrandPromotionTiki}>
                  <h3>Tiki - Thật nhanh, thật chất lượng, thật rẻ</h3>
                  <div className={style.promotionItem}>
                        <h4>Tiki có tất cả</h4>
                        <p>
                              Với hàng triệu sản phẩm từ các thương hiệu, cửa hàng uy tín, hàng nghìn loại mặt hàng từ
                              <span className={style.textStrong}> Điện thoại smartphone</span>
                              tới <span className={style.textStrong}> Rau củ quả tươi</span>, kèm theo dịch vụ giao hàng siêu tốc TikiNOW,
                              Tiki mang đến cho bạn một trải nghiệm mua sắm online bắt đầu bằng chữ tín. Thêm vào đó, ở Tiki bạn có thể dễ
                              dàng sử dụng vô vàn các tiện ích khác như
                              <span className={style.textStrong}> mua thẻ cào, thanh toán hoá đơn điện nước, các dịch vụ bảo hiểm.</span>
                        </p>
                  </div>

                  <div className={style.promotionItem}>
                        <h4>Khuyến mãi, ưu đãi tràn ngập</h4>
                        <p>
                              Bạn muốn săn giá sốc, Tiki có <span className={style.textStrong}> giá sốc mỗi ngày </span>cho bạn! Bạn là tín
                              đồ của các thương hiệu, các
                              <span className={style.textStrong}> cửa hàng Official chính hãng đang chờ đón bạn</span> Không cần săn mã
                              freeship, vì Tiki đã có hàng triệu sản phẩm trong
                              <span className={style.textStrong}> chương trình FreeShip+</span>, không giới hạn lượt đặt, tiết kiệm thời
                              gian vàng bạc của bạn. Mua thêm gói <span className={style.textStrong}> TikiNOW tiết kiệm</span> để nhận 100%
                              free ship 2h & trong ngày, hoặc mua gói TikiNOW cao cấp để nhận được 100% freeship, áp dụng cho 100% sản phẩm,
                              100% tỉnh thành Việt Nam. Bạn muốn tiết kiệm hơn nữa? Đã có TikiCARD,{' '}
                              <span className={style.textStrong}>thẻ tín dụng Tiki hoàn tiền 15%</span>trên mọi giao dịch (tối đa hoàn
                              600k/tháng)
                        </p>
                  </div>
            </div>
      )
}
