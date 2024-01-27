import { Route, Routes, useLocation, useMatch } from 'react-router-dom'

//page
import Admin from '../../pages/admin/Admin'
// import Buy from '../Content/Content_right/Buy/Buy'
// import Contact from '../Contact/Contact'
import Content from '../Content/Content'
import Cart from '../Cart/Cart'
import NotFound from '../Errors/NotFound'

// section layout
import Header from '../Header/Header'
import Portal from '../Portal'
import Sidebar from '../Sidebar/Sidebar'

//page -> path /customer
import Customer from '../../Customer/Customer'
import CustomerAccount from '../../Customer/Components/CustomerAccount'
import CustomerNotification from '../../Customer/Components/CustomerNotification'
import CustomerOrderHistory from '../../Customer/Components/CustomerOrderHistory'
import CustomerUpdateEmail from '../../Customer/Components/Update/CustomerUpdateEmail'
import CustomerUpdatePassword from '../../Customer/Components/Update/CustomerUpdatePassword'
import Shop from '../../Customer/Components/Shop/Shop'
import RegisterSell from '../../Customer/Components/RegisterSell/RegisterSell'
import QueryParams from '../../QueryParams'
import ShopProductList from '../../Customer/Components/Shop/ShopProductList'

const RouterController = () => {
    const matchAdminPath = useMatch('/admin')
    const hiddenHeader = matchAdminPath?.pathname === '/admin'
    const pathName = useLocation().pathname
    return (
        <>
            {!hiddenHeader && <Header />}

            {/* <Sidebar /> */}
            <Routes>
                <Route path='/admin' element={<Admin />} />
                <div
                    id=''
                    className={` bg-main relative ${
                        pathName.startsWith('/customer') ? 'top-[0px] h-screen' : 'top-[60px] lg:h-[calc(100vh-100px)]'
                    }  lg:flex px-0 lg:px-[50px] gap-8 `}
                >
                    <Route path='/' element={<Content />} />
                    {/* <Route path='/Buy/:id' element={<Buy />} /> */}
                    <Route path='/Cart' element={<Cart />} />
                    {/* <Route path='/login' element={<Login />} /> */}
                    {/* <Route path='/resister' element={<Resister />} /> */}
                    {/* <Route path='/Contact' element={<Contact />} /> */}
                    <Routes>
                        <Route path='/customer' element={<Customer />}>
                            <Route path='account' element={<CustomerAccount />} />
                            <Route path='account/update/email' element={<CustomerUpdateEmail />} />
                            <Route path='account/update/password' element={<CustomerUpdatePassword />} />

                            <Route path='notification' element={<CustomerNotification />} />
                            <Route path='order_history' element={<CustomerOrderHistory />} />
                            <Route path='shop' element={<Shop />} />
                            <Route path='shop/product-list' element={<ShopProductList />} />

                            <Route path='register-sell' element={<RegisterSell />} />
                        </Route>
                        <Route path='query-params' element={<QueryParams />} />
                    </Routes>
                </div>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default RouterController
