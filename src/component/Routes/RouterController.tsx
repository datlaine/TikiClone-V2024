import { Route, Routes, useLocation, useMatch, useSearchParams } from 'react-router-dom'

//page
import Admin from '../../pages/admin/Admin'
// import Buy from '../Content/Content_right/Buy/Buy'
// import Contact from '../Contact/Contact'
import Content from '../Content/Content'
import Cart from '../Cart/Cart'
import NotFound from '../Errors/NotFound'

// section layout
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

//page -> path /customer
import Customer from '../../Customer/Customer'
import CustomerAccount from '../../Customer/Components/CustomerAccount'
import CustomerNotification from '../../Customer/Components/CustomerNotification'
import CustomerOrderHistory from '../../Customer/Components/CustomerOrderHistory'
import QueryParams from '../../QueryParams'
import CustomerUpdateEmail from '../../Customer/Account/Update/CustomerUpdateEmail'
import CustomerUpdatePassword from '../../Customer/Account/Update/CustomerUpdatePassword'
import RegisterSell from '../../Customer/Sell/RegisterSell'
import Product from '../../pages/product/Product'
import CustomerRouter from '../../Customer/Components/CustomerRouter'
import Payment from '../../pages/payment/Payment'
import CustomerUserAddress from '../../Customer/UserAddress/CustomerUserAddress'
import PermisionProductUpdate from '../../Customer/Sell/Category/Book/PermissionProductUpdate'
import OrderCheck from '../../pages/orderCheck/OrderCheck'
import Category from '../../pages/ProductCategories/Category'
import Box from '../BoxUi/Box'
import Shop from '../../pages/shop/Shop'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import ShopWrapper from '../../Customer/Shop/ShopWrapper'
import ShopProductList from '../../Customer/Shop/ShopProductList'

const RouterController = () => {
      const pathHiddenHeader = ['/admin', '/payment', '/box']
      const hideHeaderShopPath = window.location.pathname.startsWith('/shop')
      // console.log(window.location.pathname, hideHeaderShopPath)
      const hiddenHeader = pathHiddenHeader.includes(window.location.pathname)
      const pathName = useLocation().pathname
      const showOverload = useSelector((state: RootState) => state.uiSlice.showOverload)

      const styleEffect = {
            matchPathName: window.location.pathname !== '/payment' ? 'xl:p-[20px_80px]  pt-[75px]' : 'px-0 xl:px-[50px]',
            matchPathNameCustomer: pathName.startsWith('/customer') ? 'top-[0px] h-screen' : 'top-[60px] lg:h-[calc(100vh-100px)]',
      }

      return (
            <>
                  {!hiddenHeader && <Header />}

                  <div
                        className={`${styleEffect.matchPathName} w-full min-w-full min-h-screen h-max  flex gap-[28px]    bg-[rgb(245_245_250)] `}
                  >
                        <Sidebar />
                        <Routes>
                              <Route path='/admin' element={<Admin />} />
                              <div id='' className={`${styleEffect.matchPathNameCustomer}  relative  lg:flex  gap-8 `}>
                                    <Route path='/' element={<Content />} />
                                    <Route path='/product/:id' element={<Product />} />
                                    <Route path='/cart' element={<Cart />} />
                                    <Route path='/payment' element={<Payment />} />
                                    <Route path='/order-check/:order_id' element={<OrderCheck />} />
                                    <Route path='/books' element={<Category product_type='Book' />} />
                                    <Route path='/shop' element={<ShopWrapper />} />
                                    <Route path='/foods' element={<Category product_type='Food' />} />
                                    <Route path='/shop/:shop_id' element={<Shop />} />

                                    <Route
                                          path='/box'
                                          element={
                                                <Box>
                                                      <div className='fixed inset-0 bg-[rgba(0,0,0,.4)] h-screen flex items-center justify-center z-[500]'>
                                                            {/* <BoxCommentProduct /> */}
                                                      </div>{' '}
                                                </Box>
                                          }
                                    />
                                    <Routes>
                                          <Route path='/customer' element={<Customer />}>
                                                <Route path='account' element={<CustomerAccount />} />
                                                <Route path='account/update/email' element={<CustomerUpdateEmail />} />
                                                <Route path='account/update/password' element={<CustomerUpdatePassword />} />

                                                <Route path='notification' element={<CustomerNotification />} />
                                                <Route path='order_history' element={<CustomerOrderHistory />} />
                                                <Route path='shop' element={<ShopWrapper />} />
                                                <Route path='shop/product-list' element={<ShopProductList />} />
                                                <Route path='account/address' element={<CustomerUserAddress />} />

                                                <Route path='register-sell' element={<RegisterSell />} />
                                                <Route path='router' element={<CustomerRouter />} />
                                          </Route>
                                          <Route path='product/update-book/:product_id' element={<PermisionProductUpdate />} />
                                          <Route path='query-params' element={<QueryParams />} />
                                    </Routes>
                              </div>

                              <Route path='*' element={<NotFound />} />
                        </Routes>
                        {showOverload && (
                              <div className='w-full h-full fixed inset-0 bg-[rgba(0,0,0,.75)] z-[500] mt-[75px] xl:mt-[85px]'></div>
                        )}
                  </div>
            </>
      )
}

export default RouterController
