import { textAlign } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import style from './moTaSanPham.module.css'

export default function MoTaSanPham({ isLoading, name }) {
      // console.log('isLoading', isLoading)

      const refLengthText = useRef(null)
      const [length, setLength] = useState(0)
      const [btnDocThem, setBtnDocThem] = useState(false)
      const refHeadingMoTa = useRef(null)

      useEffect(() => {
            if (refLengthText.current) {
                  // console.log('độ dài đoạn văn', refLengthText.current.textContent.trim().length)
                  let lengthContext = refLengthText.current.textContent.trim().length
                  setLength(lengthContext)
            }
      }, [])

      useEffect(() => {
            if (btnDocThem) {
                  refLengthText.current.style.height = 'auto'
            } else {
                  refLengthText.current.style.height = '350px'
                  refHeadingMoTa.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                  })
            }
      }, [btnDocThem])

      const handleDocThem = () => {
            console.log('click', length)
            setBtnDocThem((prev) => !prev)
      }

      return (
            <div>
                  <div
                        className={style.ModuleDesktop}
                        style={{
                              margin: `${isLoading ? '700px' : '35px'} auto 0 `,
                        }}
                  >
                        <div className={style.containerMoTaSanPhamDesktop}>
                              <div className={style.wrapperThongTinChiTiet}>
                                    <h4>Thông tin chi tiết</h4>
                                    <div className={style.thongTinChiTietGrid}>
                                          <p className={`${style.gridItem} ${style.gridItem1}`}>Thương hiệu</p>
                                          <p className={`${style.gridItem} ${style.gridItem2}`}>{name}</p>
                                          <p className={`${style.gridItem} ${style.gridItem3}`}>Xuất xứ thương hiệu</p>
                                          <p className={`${style.gridItem} ${style.gridItem4} ${style.gridItemColor}`}>Thụy Sỹ</p>
                                          <p className={`${style.gridItem} ${style.gridItem5}`}>Hạn sử dụng</p>
                                          <p className={`${style.gridItem} ${style.gridItem6}`}>8 tháng kể từ ngày sản xuất</p>
                                          <p className={`${style.gridItem} ${style.gridItem7}`}>Sản phẩm có được bảo hành không</p>
                                          <p className={`${style.gridItem} ${style.gridItem8} ${style.gridItemColor}`}>Không</p>
                                          <p className={`${style.gridItem} ${style.gridItem9}`}>Xuất xứ</p>
                                          <p className={`${style.gridItem} ${style.gridItem10}`}>Việt Nam</p>
                                          <p className={`${style.gridItem} ${style.gridItem11}`}>Trọng lượng sản phẩm</p>
                                          <p className={`${style.gridItem} ${style.gridItem12} ${style.gridItemColor}`}>...</p>
                                    </div>
                              </div>
                              <div className={style.wrapperMoTaSanPham}>
                                    <h4 ref={refHeadingMoTa}>Mô tả sản phẩm</h4>

                                    <div
                                          className={style.wrapperText}
                                          ref={refLengthText}
                                          style={{
                                                paddingBottom: btnDocThem ? '85px' : '35px',
                                                marginBottom: btnDocThem ? '25px' : '25px',
                                          }}
                                    >
                                          <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique elit justo.
                                                Curabitur lacus ante, tempor ut quam ac, facilisis accumsan leo. Ut quis luctus ex, ut
                                                fermentum mauris. Etiam eu dui sit amet justo efficitur rutrum nec quis mauris. Morbi eget
                                                porta dui, eu vulputate nisl. Vestibulum sit amet felis egestas nulla pretium consectetur.
                                                Etiam et egestas lacus. Donec eu vestibulum magna. Aenean purus mi, tristique eu sodales eu,
                                                ornare sed nisi. Aenean viverra erat sed odio porta mattis. Praesent a rhoncus odio. Nullam
                                                nec mattis elit. Vivamus eget nulla non felis tempor ornare. Donec eget ante nec sapien
                                                venenatis semper. Vestibulum urna nisl, congue eu molestie non, condimentum elementum
                                                tellus. Nam interdum urna id nunc tempus accumsan. Duis lectus felis, suscipit sed purus
                                                suscipit, convallis imperdiet dolor. Sed eu orci eget mi ullamcorper ornare. Vestibulum
                                                dolor felis, rutrum eget massa ut, mollis posuere est. Pellentesque nibh nisi, egestas
                                                vestibulum viverra ac, placerat at dolor. Aliquam fringilla eget tellus at tincidunt.
                                                Maecenas pellentesque diam at diam condimentum, et malesuada sem condimentum. Donec in
                                                dignissim quam. Aliquam erat volutpat. Ut euismod tortor quis porttitor sodales. Nulla vel
                                                ligula sit amet purus varius blandit. Phasellus eget interdum turpis, ac auctor libero.
                                                Aenean condimentum eros non porta placerat. Suspendisse condimentum ipsum sed mi interdum,
                                                vel congue elit blandit. Etiam ultrices, ante sed venenatis mollis, diam quam facilisis
                                                purus, non laoreet ligula lacus lacinia augue. Curabitur quis facilisis nisi, ut porttitor
                                                turpis. Pellentesque massa neque, sodales ac metus eget, facilisis congue est. Cras
                                                tincidunt quam vel ante consectetur blandit. Sed quis velit nec felis vestibulum tincidunt
                                                et eget risus. Mauris consectetur accumsan augue eget egestas. Maecenas maximus pretium leo,
                                                quis fringilla sem dictum id. Maecenas sit amet facilisis lacus. Praesent et ex gravida,
                                                lobortis enim non, scelerisque orci. Proin eu interdum metus, mattis lobortis quam. Interdum
                                                et malesuada fames ac ante ipsum primis in faucibus. Quisque pretium, ipsum at ultricies
                                                aliquet, erat nisi dignissim turpis, at pellentesque sem metus finibus tortor. Nam a quam
                                                nunc. Praesent ultricies sed sapien et ullamcorper. Vestibulum vitae mattis lorem, et tempus
                                                eros. Pellentesque porta lorem velit, nec scelerisque felis volutpat in. Cras varius tempus
                                                turpis, sed faucibus ante rutrum eu. Vivamus fringilla, quam vitae hendrerit gravida, mauris
                                                odio laoreet magna, in consectetur diam nibh in magna. Mauris pellentesque turpis in metus
                                                malesuada, sed porttitor diam efficitur. Sed venenatis sapien erat, malesuada sagittis felis
                                                efficitur nec. Phasellus dignissim lacus non tellus sodales, sit amet ornare ante
                                                consectetur. Maecenas ante ipsum, accumsan a enim id, malesuada eleifend ipsum. Quisque
                                                feugiat justo nec metus ultrices, a lobortis nunc interdum. In justo erat, rutrum in dui
                                                vitae, euismod convallis nisi. Suspendisse ut enim in ex elementum porttitor sit amet sed
                                                quam. Cras quis neque sem. Pellentesque at erat sit amet urna lacinia ornare non a enim.
                                                Duis gravida pharetra enim et vulputate. Phasellus bibendum, augue sed semper condimentum,
                                                dolor nisi dapibus dui, vel mattis mi turpis non est. Quisque bibendum dolor dapibus,
                                                condimentum ligula sed, rutrum quam.
                                          </p>

                                          <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique elit justo.
                                                Curabitur lacus ante, tempor ut quam ac, facilisis accumsan leo. Ut quis luctus ex, ut
                                                fermentum mauris. Etiam eu dui sit amet justo efficitur rutrum nec quis mauris. Morbi eget
                                                porta dui, eu vulputate nisl. Vestibulum sit amet felis egestas nulla pretium consectetur.
                                                Etiam et egestas lacus. Donec eu vestibulum magna. Aenean purus mi, tristique eu sodales eu,
                                                ornare sed nisi. Aenean viverra erat sed odio porta mattis. Praesent a rhoncus odio. Nullam
                                                nec mattis elit. Vivamus eget nulla non felis tempor ornare. Donec eget ante nec sapien
                                                venenatis semper. Vestibulum urna nisl, congue eu molestie non, condimentum elementum
                                                tellus. Nam interdum urna id nunc tempus accumsan. Duis lectus felis, suscipit sed purus
                                                suscipit, convallis imperdiet dolor. Sed eu orci eget mi ullamcorper ornare. Vestibulum
                                                dolor felis, rutrum eget massa ut, mollis posuere est. Pellentesque nibh nisi, egestas
                                                vestibulum viverra ac, placerat at dolor. Aliquam fringilla eget tellus at tincidunt.
                                                Maecenas pellentesque diam at diam condimentum, et malesuada sem condimentum. Donec in
                                                dignissim quam. Aliquam erat volutpat. Ut euismod tortor quis porttitor sodales. Nulla vel
                                                ligula sit amet purus varius blandit. Phasellus eget interdum turpis, ac auctor libero.
                                                Aenean condimentum eros non porta placerat. Suspendisse condimentum ipsum sed mi interdum,
                                                vel congue elit blandit. Etiam ultrices, ante sed venenatis mollis, diam quam facilisis
                                                purus, non laoreet ligula lacus lacinia augue. Curabitur quis facilisis nisi, ut porttitor
                                                turpis. Pellentesque massa neque, sodales ac metus eget, facilisis congue est. Cras
                                                tincidunt quam vel ante consectetur blandit. Sed quis velit nec felis vestibulum tincidunt
                                                et eget risus. Mauris consectetur accumsan augue eget egestas. Maecenas maximus pretium leo,
                                                quis fringilla sem dictum id. Maecenas sit amet facilisis lacus. Praesent et ex gravida,
                                                lobortis enim non, scelerisque orci. Proin eu interdum metus, mattis lobortis quam. Interdum
                                                et malesuada fames ac ante ipsum primis in faucibus. Quisque pretium, ipsum at ultricies
                                                aliquet, erat nisi dignissim turpis, at pellentesque sem metus finibus tortor. Nam a quam
                                                nunc. Praesent ultricies sed sapien et ullamcorper. Vestibulum vitae mattis lorem, et tempus
                                                eros. Pellentesque porta lorem velit, nec scelerisque felis volutpat in. Cras varius tempus
                                                turpis, sed faucibus ante rutrum eu. Vivamus fringilla, quam vitae hendrerit gravida, mauris
                                                odio laoreet magna, in consectetur diam nibh in magna. Mauris pellentesque turpis in metus
                                                malesuada, sed porttitor diam efficitur. Sed venenatis sapien erat, malesuada sagittis felis
                                                efficitur nec. Phasellus dignissim lacus non tellus sodales, sit amet ornare ante
                                                consectetur. Maecenas ante ipsum, accumsan a enim id, malesuada eleifend ipsum. Quisque
                                                feugiat justo nec metus ultrices, a lobortis nunc interdum. In justo erat, rutrum in dui
                                                vitae, euismod convallis nisi. Suspendisse ut enim in ex elementum porttitor sit amet sed
                                                quam. Cras quis neque sem. Pellentesque at erat sit amet urna lacinia ornare non a enim.
                                                Duis gravida pharetra enim et vulputate. Phasellus bibendum, augue sed semper condimentum,
                                                dolor nisi dapibus dui, vel mattis mi turpis non est. Quisque bibendum dolor dapibus,
                                                condimentum ligula sed, rutrum quam.
                                          </p>

                                          {!btnDocThem && <div className={style.suongMuBaoPhu}></div>}
                                          <button onClick={handleDocThem}>{btnDocThem ? 'Thu gọn nội dung' : 'Xem thêm nội dung '}</button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}
