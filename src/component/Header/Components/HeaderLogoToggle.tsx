import { Link } from 'react-router-dom'
import { RootState, store } from '../../../store'
import { toDoHideSideBar, toDoShowSideBar } from '../../../Redux/uiSlice'
import { connect } from 'react-redux'

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
        <div>
            <Link className='hidden lg:block' to='/'>
                <img
                    src='https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png'
                    className='xl:w-[57px] xl:h-10 xl:block dienThoai:hidden lg:block lg:w-[37px] lg:h-5'
                    alt=''
                />
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
