import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import RouterController from './component/Routes/RouterController'
import { RootState } from './store'
import AuthWrapper from './component/Auth/AuthWrapper'
import FooterMobile from './component/Footer/FooterMobile'
import ScrollToAnchor from './component/Header/Components/ScrollArchor'
import { useLocation } from 'react-router-dom'
import './index.css'
function App() {
      const boxLogin = useSelector((state: RootState) => state.authentication.isOpenBoxLogin)
      const [, setShowBoxAuth] = useState(true)
      const location = useLocation().pathname

      useEffect(() => {
            window.scrollTo({
                  top: 0,
                  left: 0,
            })
      }, [location])

      useEffect(() => {}, [boxLogin])

      return (
            <div className=' min-h-screen  w-full min-w-full bg-[rgb(245_245_250)] '>
                  <div
                        id='main w-full '
                        className='min-h-screen
'
                  >
                        <RouterController />
                        <FooterMobile className='block xl:hidden' />
                        <ScrollToAnchor />
                  </div>

                  {boxLogin && <AuthWrapper setShowBoxAuth={setShowBoxAuth} />}
            </div>
      )
}

export default App
