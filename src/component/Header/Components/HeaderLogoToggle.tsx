import { Link } from 'react-router-dom'
import { RootState, store } from '../../../store'
import { toDoHideSideBar, toDoShowSideBar } from '../../../Redux/uiSlice'
import { connect } from 'react-redux'
import logo from './logo.png'

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const HeaderLogoToggle = (props: Props) => {
      const { stateSideBar, toDoShowSideBar, toDoHideSideBar } = props
      // console.log(toDoShowSideBar)
      const changeStateSideBar = () => {
            if (stateSideBar) {
                  toDoHideSideBar()
            } else {
                  toDoShowSideBar()
            }
            // console.log(props)
      }

      return (
            <div className='w-full h-full'>
                  <Link className='hidden lg:flex flex-col w-full gap-[6px] h-full content-between ' to='/'>
                        <img src={logo} className='w-[40%] h-[36px] ' alt='' />
                        <p className='text-[14px] h-[40%] w-full text-blue-700 font-extrabold'>Bảo vệ khách hàng 111%</p>
                  </Link>
                  <div className='block lg:hidden' onClick={changeStateSideBar}>
                        <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-8 h-8 lg:w-9 lg:h-9'
                        >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                        </svg>
                  </div>
            </div>
      )
}

const mapStateToProps = (state: RootState) => ({
      stateSideBar: state.uiSlice.showSideBar,
})

const mapDispatchToProps = (dispatch: any) => ({
      toDoShowSideBar: () => store.dispatch(toDoShowSideBar()),
      toDoHideSideBar: () => store.dispatch(toDoHideSideBar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogoToggle)
