import { connect, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// import BoxLogin from './component/AuthLoginResister/BoxLogin/BoxLogin'
import Header from './component/Header/Header'
import RouterController from './component/Routes/RouterController'
import AboutTiki from './component/AboutTiki/AboutTiki'
import Footer from './component/Footer/Footer'
import { RootState } from './store'
import AuthWrapper from './component/Auth/AuthWrapper'
import FooterMobile from './component/Footer/FooterMobile'
import ScrollToAnchor from './component/Header/Components/ScrollArchor'

function App() {
      const boxLogin = useSelector((state: RootState) => state.authentication.isOpenBoxLogin)
      const [, setShowBoxAuth] = useState(true)
      useEffect(() => {
            window.scrollTo({
                  top: 0,
                  left: 0,
            })
      }, [])

      useEffect(() => {}, [boxLogin])

      return (
            <div className=' min-h-screen  w-full min-w-full'>
                  <div id='main' className='min-h-screen'>
                        <RouterController />
                        <FooterMobile className='block xl:hidden' />
                        <ScrollToAnchor />
                  </div>

                  {boxLogin && <AuthWrapper setShowBoxAuth={setShowBoxAuth} />}
            </div>
      )
}

export default App
