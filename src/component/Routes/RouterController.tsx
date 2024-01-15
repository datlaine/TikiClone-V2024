import { Route, Routes, useLocation, useMatch } from 'react-router-dom'

//page
import Admin from '../../pages/admin/Admin'
import Buy from '../Content/Content_right/Buy/Buy'
import Contact from '../Contact/Contact'
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
import CustomerEditEmail from '../../Customer/Components/Edit/CustomerEditEmail'
import CustomerEditPass from '../../Customer/Components/Edit/CustomerEditPass'

const RouterController = () => {
      const matchAdminPath = useMatch('/admin')
      const hiddenHeader = matchAdminPath?.pathname === '/admin'
      const pathName = useLocation().pathname

      return (
            <>
                  {!hiddenHeader && <Header />}

                  <div
                        id='content'
                        className={` bg-[#ebebf0] relative ${
                              pathName.startsWith('/customer') ? 'top-[0px] h-screen' : 'top-[60px] lg:h-[calc(100vh-100px)]'
                        }  lg:flex px-0 lg:px-[50px] gap-8 `}
                  >
                        <Sidebar />
                        <Routes>
                              <Route
                                    path='/*'
                                    element={
                                          <Routes>
                                                <Route path='/' element={<Content />} />
                                                <Route path='/Buy/:id' element={<Buy />} />
                                                <Route path='/Cart' element={<Cart />} />
                                                {/* <Route path='/login' element={<Login />} /> */}
                                                {/* <Route path='/resister' element={<Resister />} /> */}
                                                <Route path='/Contact' element={<Contact />} />
                                                <Routes>
                                                      <Route path='/customer/*' element={<Customer />}>
                                                            <Route path='account' element={<CustomerAccount />} />
                                                            <Route path='account/edit/email' element={<CustomerEditEmail />} />
                                                            <Route path='account/edit/pass' element={<CustomerEditPass />} />

                                                            <Route path='notification' element={<CustomerNotification />} />
                                                            <Route path='order_history' element={<CustomerOrderHistory />} />
                                                      </Route>
                                                </Routes>
                                                <Route
                                                      path='/admin'
                                                      element={
                                                            <Portal>
                                                                  <Admin />
                                                            </Portal>
                                                      }
                                                />
                                                <Route path='*' element={<NotFound />} />
                                          </Routes>
                                    }
                              />
                        </Routes>
                  </div>
            </>
      )
}

export default RouterController
