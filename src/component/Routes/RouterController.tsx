import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContentMain from '../Content/ContentMain/ContentMain'
import Buy from '../Content/Content_right/Buy/Buy'
import NotFound from '../Errors/NotFound'
import Cart from '../Cart/Cart'
import Login from '../AuthLoginResister/Login'
import Resister from '../Auth/Resister'
import Contact from '../Contact/Contact'
import Content from '../Content/Content'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'

const RouterController = () => {
      return (
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
                                          <Route path='*' element={<NotFound />} />
                                    </Routes>
                              }
                        />
                  </Routes>
            </div>
      )
}

export default RouterController
