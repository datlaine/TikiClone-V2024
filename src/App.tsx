import { connect } from 'react-redux'
import { useEffect } from 'react'
import BoxLogin from './component/AuthLoginResister/BoxLogin/BoxLogin'
import Header from './component/Header/Header'
import RouterController from './component/Routes/RouterController'
import AboutTiki from './component/AboutTiki/AboutTiki'
import Footer from './component/Footer/Footer'

type Props = ReturnType<typeof mapStateToProps>

function App(props: Props) {
      const { isOpenBoxLogin } = props
      // console.log(isOpenBoxLogin)

      useEffect(() => {
            window.scrollTo({
                  top: 0,
                  left: 0,
            })
      }, [])

      useEffect(() => {
            // console.log('re-render')
      }, [])

      return (
            <div className=' min-h-screen'>
                  <div id='main' className='min-h-screen'>
                        <RouterController />
                  </div>
                  {isOpenBoxLogin && (
                        <div className=''>
                              <BoxLogin />
                        </div>
                  )}
            </div>
      )
}

const mapStateToProps = (state: any) => ({
      isOpenBoxLogin: state.auth.isOpenBoxLogin,
})

export default connect(mapStateToProps, null)(App)
