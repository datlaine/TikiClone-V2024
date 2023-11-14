import { connect } from 'react-redux'
import ContentWrapper from './component/Content/ContentWrapper/ContentWrapper'
import Footer from './component/Footer/Footer'
import Sidebar from './component/Sidebar/Sidebar'
import { useEffect, useRef } from 'react'
import { doCloseBoxLogin } from './Redux/authSlice'
import BoxLogin from './component/AuthLoginResister/BoxLogin/BoxLogin'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import Header from './component/Header/Header'
import { toDoHideSideBar } from './Redux/uiSlice'
function App(props) {
  const { isAuthencation, isOpenBoxLogin, toDoHideSideBar, showwSideBar } = props
  const pathName = window.location.pathname
  console.log(isOpenBoxLogin)

  const refBoxLogin = useRef(null)
  console.log(isAuthencation)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    })
  }, [])

  useEffect(() => {
    console.log('re-render')
    console.log(showwSideBar)

    toDoHideSideBar()
  }, [])

  const handleBoxLogin = () => {
    // doCloseBoxLogin()
  }

  return (
    <PersistGate persistor={persistor}>
      <div className='relative overflow-x-hidden w-full'>
        <div id='main' className='overflox-x-hidden w-full '>
          <Header />
          <ContentWrapper />
          <Sidebar />
          <Footer />
        </div>
        {isOpenBoxLogin && (
          <div
            className=''
            onClick={handleBoxLogin}
          >
            <BoxLogin />
          </div>
        )}
      </div>
    </PersistGate>
  )
}

const mapStateToProps = (state) => ({
  isAuthencation: state.auth.isAuthencation,
  user: state.auth.userCurrent,
  isOpenBoxLogin: state.auth.isOpenBoxLogin,
 showSideBar: state.uiSlice.showSideBar
})

const mapDispatchToProps = (dispatch) => {
  return {
    doCloseBoxLogin: () => store.dispatch(doCloseBoxLogin()),
    toDoHideSideBar: () => store.dispatch(toDoHideSideBar()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
