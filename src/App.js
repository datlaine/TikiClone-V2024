import { useDispatch, useSelector } from 'react-redux'
import ContentWrapper from './component/Content/ContentWrapper/ContentWrapper'
import Footer from './component/Footer/Footer'
import Header from './component/Header/header_main/Header'
import Sidebar from './component/Sidebar/Sidebar'
import style from './app.module.css'
import { useEffect, useRef, useState } from 'react'
import { doCloseBoxLogin } from './Redux/authSlice'
import BoxLogin from './component/AuthLoginResister/BoxLogin/BoxLogin'
function App() {
  const isOpenBoxLogin = useSelector((state) => state.auth?.isOpenBoxLogin)
  const user = useSelector((state) => state.auth?.userCurrent)
  const [reRender, setReRender] = useState(false)
  const refBoxLogin = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    })
  }, [])

  useEffect(() => {
    console.log('user', user)
    setReRender((prev) => !prev)
  }, [user])

  const handleBoxLogin = () => {
    if (refBoxLogin.current) {
      refBoxLogin.current.style.display = 'none'
      dispatch(doCloseBoxLogin())
    }
  }

  return (
    <div className={style.wrapper}>
      <div id='main' className=''>
        <Header></Header>

        <ContentWrapper />
        <Sidebar />
        <Footer />
      </div>
      {isOpenBoxLogin && (
        <div className={style.containerBoxLogin} ref={refBoxLogin} onClick={handleBoxLogin}>
          <BoxLogin />
        </div>
      )}
    </div>
  )
}

export default App
