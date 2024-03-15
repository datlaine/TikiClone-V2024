import SliderProducts from './Components/SliderProducts'
import hinhAnhSlider from './utils/Image'
import Banner from './Components/Banner'
import SectionProduct from './Components/SectionProduct'
import TitleProductSection from './Components/TitleProductSection'
import CountDown from './Components/CountDown'
import Footer from '../Footer/Footer'
import { memo } from 'react'
import SectionProductItem from './Components/SectionProductItem'
import SliderProductV2 from './Components/SliderProductV2'
import ContentLabel from './Components/ContentLabel'
import ProductCare from './Components/ProductCare'
import ProductGenuineBrand from './Components/ProductGenuineBrand'
import ContentBook from './Components/ContentBook'
import ContentFood from './Components/ContentFood'
import ContentProduct from './Components/ContentProduct'

const Content = () => {
      //Query data -> components Products
      // const giaTotHomNay = useFetchProducts('/giaTotHomNay', 'Gia tot homnay')
      // const thuongHieuChinhHang = useFetchProducts('/thuongHieuChinhHang', 'Thuong hieu chinh Hang')
      // const thuongHieuGiaTot = useFetchProducts('/hangThuongHieuGiaTot', 'Hang Thuong Hieu Gia Tot')
      // const goiYHomNay = useFetchProducts('/goiYHomNay', 'Goi Y Hom Nay')
      // console.log(thuongHieuGiaTot.data)
      return (
            <div className='wrapper h-max flex flex-col gap-[20px] '>
                  <div className=' hidden 2xl:gap-6 2xl:flex'>
                        <SliderProducts hinhAnhSlider={hinhAnhSlider} height={300} delay={1} />
                        <Banner />
                  </div>

                  <div className='w-full p-[16px] h-[400px] bg-[#ffffff]'>
                        <SliderProductV2 />
                  </div>

                  <SectionProduct
                        title={<TitleProductSection content={<p className='pl-[13px]'>Gía Tốt Hôm Nay</p>} />}
                        other={<CountDown />}
                        ListProducts={<SectionProductItem />}
                  />

                  <ContentLabel />

                  <SectionProduct
                        title={<TitleProductSection content='Sản phẩm bạn quan tâm' />}
                        // other={<CountDown />}
                        ListProducts={<ProductCare />}
                  />

                  <SectionProduct
                        title={<TitleProductSection content='Sản phẩm bạn quan tâm' />}
                        // other={<CountDown />}
                        background={`linear-gradient(rgba(255, 255, 255, 0) 22.49%, rgb(255, 255, 255) 73.49%), linear-gradient(264.03deg, rgb(220, 229, 251)
                  -10.27%, rgb(234, 236, 255) 35.65%, rgb(213, 236, 253) 110.66%)`}
                        ListProducts={<ProductGenuineBrand />}
                  />

                  <ContentBook />
                  <ContentFood />

                  <ContentProduct />
                  <div className='w-full h-[1500px] bg-black'></div>
                  {/* 
                  <SectionProduct
                        title={<TitleProductSection content='Thương hiệu chính hãng' />}
                        ListProducts={<ListProduct query={thuongHieuChinhHang} />}
                  />
                  <GridProduct query={thuongHieuGiaTot} />
                  <BoxSticky
                        Element={<LinkCategory query={goiYHomNay} Title={<TitleProductSection content='Gợi Ý Hôm Nay' />} />}
                        ClassName='bg-white'
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Gía Tốt Hôm Nay' />}
                        other={<CountDown />}
                        ListProducts={<ListProduct query={giaTotHomNay} />}
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Thương hiệu chính hãng' />}
                        ListProducts={<ListProduct query={thuongHieuChinhHang} />}
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Gía Tốt Hôm Nay' />}
                        other={<CountDown />}
                        ListProducts={<ListProduct query={giaTotHomNay} />}
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Thương hiệu chính hãng' />}
                        ListProducts={<ListProduct query={thuongHieuChinhHang} />}
                  />{' '}
                  <SectionProduct
                        title={<TitleProductSection content='Gía Tốt Hôm Nay' />}
                        other={<CountDown />}
                        ListProducts={<ListProduct query={giaTotHomNay} />}
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Thương hiệu chính hãng' />}
                        ListProducts={<ListProduct query={thuongHieuChinhHang} />}
                  />
                  <GridProduct query={thuongHieuGiaTot} /> */}
                  {/* <GridProductList /> */}
                  {/* <SectionProduct
                        title={<TitleProductSection content='Thương hiệu chính hãng' />}
                        ListProducts={<ListProduct query={thuongHieuChinhHang} />}
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Thương hiệu chính hãng' />}
                        ListProducts={<ListProduct query={thuongHieuChinhHang} />}
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Gía Tốt Hôm Nay' />}
                        other={<CountDown />}
                        ListProducts={<ListProduct query={giaTotHomNay} />}
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Thương hiệu chính hãng' />}
                        ListProducts={<ListProduct query={thuongHieuChinhHang} />}
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Gía Tốt Hôm Nay' />}
                        other={<CountDown />}
                        ListProducts={<ListProduct query={giaTotHomNay} />}
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Thương hiệu chính hãng' />}
                        ListProducts={<ListProduct query={thuongHieuChinhHang} />}
                  />
                  <SectionProduct
                        title={<TitleProductSection content='Gía Tốt Hôm Nay' />}
                        other={<CountDown />}
                        ListProducts={<ListProduct query={giaTotHomNay} />}
                  /> */}
                  <Footer className='hidden xl:block' />
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
                  {/* <SectionProduct title={<TitleProductSection />} other={<CountDown />} ListProducts={<ListProduct />} /> */}
            </div>
      )
}

export default memo(Content)
