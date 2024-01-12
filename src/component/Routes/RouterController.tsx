import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useMatch } from 'react-router-dom'
import Buy from '../Content/Content_right/Buy/Buy'
import NotFound from '../Errors/NotFound'
import Cart from '../Cart/Cart'
import Login from '../AuthLoginResister/Login'
import Resister from '../Auth/Resister'
import Contact from '../Contact/Contact'
import Content from '../Content/Content'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Admin from '../../pages/admin/Admin'
import Portal from '../Portal'
import Customer from '../../Customer/Customer'
import CustomerAccount from '../../Customer/Components/CustomerAccount'
import CustomerNotification from '../../Customer/Components/CustomerNotification'
import CustomerOrderHistory from '../../Customer/Components/CustomerOrderHistory'
import { ContextResponsive } from '../Context/ContextResponsiveProvider'

const RouterController = () => {
      const matchAdminPath = useMatch('/admin')
      const hiddenHeader = matchAdminPath?.pathname === '/admin'
      const pathName = useLocation().pathname
      const { withWindow } = useContext(ContextResponsive)
      return (
            <>
                  {!hiddenHeader && <Header />}

                  <div id='content' className='relative top-[80px] lg:top-[30px] lg:flex mx-0 lg:mx-[50px] gap-8 '>
                        <Sidebar />
                        <Routes>
                              <Route
                                    path='/*'
                                    element={
                                          <Routes>
                                                <Route path='/' element={<Content />} />
                                                <Route path='/Buy/:id' element={<Buy />} />
                                                <Route path='/Cart' element={<Cart />} />
                                                <Route path='/login' element={<Login />} />
                                                <Route path='/resister' element={<Resister />} />
                                                <Route path='/Contact' element={<Contact />} />
                                                <Route path='/customer' element={<Customer />}>
                                                      <Route path='account' element={<CustomerAccount />} />
                                                      <Route path='notification' element={<CustomerNotification />} />
                                                      <Route path='order_history' element={<CustomerOrderHistory />} />
                                                </Route>
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
