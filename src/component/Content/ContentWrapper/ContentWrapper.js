import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../../Cart/Cart'
import Contact from '../../Contact/Contact'
import NotFound from '../../Errors/NotFound'
import ContentMain from '../ContentMain/ContentMain'
import Buy from '../Content_right/Buy/Buy'

export default function ContentWrapper() {
  return (
    <div id='content'>
      <Routes>
        <Route
          path='/*'
          element={
            <Routes>
              <Route path='/' element={<ContentMain />} />
              <Route path='/Buy/:id' element={<Buy />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/Cart' element={<Cart />} />
            </Routes>
          }
        />
        <Route path='/Contact' element={<Contact />} />
      </Routes>
    </div>
  )
}
