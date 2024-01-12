import SliderProducts from './Components/SliderProducts'
import hinhAnhSlider from './utils/Image'
import Banner from './Components/Banner'
import SectionProduct from './Components/SectionProduct'
import TitleProductSection from './Components/TitleProductSection'
import CountDown from './Components/CountDown'
import ListProduct from './Components/SectionProductItem'
import BoxSticky from '../ui/BoxSticky'
import BoxCenter from '../ui/BoxCenter'
import ButtonAdd from './Components/ButtonAdd'
import { useFetchProducts } from './utils/useFetchProduct'
import GridProduct from './Components/GridProduct'
import LinkCategory from './Components/LinkCategory'
import GridProductList from './Components/GridProductList'
import Footer from '../Footer/Footer'
import { memo } from 'react'

const Content = () => {
      //Query data -> components Products
      // const giaTotHomNay = useFetchProducts('/giaTotHomNay', 'Gia tot homnay')
      // const thuongHieuChinhHang = useFetchProducts('/thuongHieuChinhHang', 'Thuong hieu chinh Hang')
      // const thuongHieuGiaTot = useFetchProducts('/hangThuongHieuGiaTot', 'Hang Thuong Hieu Gia Tot')
      // const goiYHomNay = useFetchProducts('/goiYHomNay', 'Goi Y Hom Nay')
      // console.log(thuongHieuGiaTot.data)
      return (
            <div className='wrapper'>
                  <div className=' hidden 2xl:gap-6 2xl:flex'>
                        <SliderProducts hinhAnhSlider={hinhAnhSlider} height={300} delay={1} />
                        <Banner />
                  </div>
                  {/* <SectionProduct
                        title={<TitleProductSection content='Gía Tốt Hôm Nay' />}
                        other={<CountDown />}
                        ListProducts={<ListProduct query={giaTotHomNay} />}
                  />
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
                  <Footer />
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
