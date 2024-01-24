import { useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { apiLink } from '../../apis/api'
import { connect } from 'react-redux'
import { RootState, store } from '../../store'
import { toDoHideSideBar, toDoShowSideBar } from '../../Redux/uiSlice'
import { useQuery } from '@tanstack/react-query'
import { SLATE_TIME } from '../../apis/staleTime'
import { getData } from '../../apis/getDataMain'
import SideBarSection from './SideBarSection'
import { fetchData } from '../../apis/fetchData'

const category = {
    noiBat: 'Nổi bật',
    danhMuc: 'Danh mục',
}

const urlNoiBat = `/noiBat`
const urlDanhMuc = `/danhMuc`

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

function Sidebar(props: Props) {
    const noiBat = useQuery({
        queryKey: [`${urlNoiBat}`],
        queryFn: () => fetchData('/noiBat'),
        staleTime: SLATE_TIME,
    })

    const danhMuc = useQuery({
        queryKey: [`${urlDanhMuc}`],
        queryFn: () => fetchData('/danhMuc'),
    })

    // console.log(noiBat.isSuccess && noiBat.data)
    const match = useMatch('/')
    const { showSideBar, toDoHideSideBar } = props
    const pathNameHome = window.location.pathname === '/'
    const widthWindow = window.innerWidth
    useEffect(() => {
        // console.log('path', match?.pathname)
        if (!match?.params) {
            toDoHideSideBar()
        }

        // if (window.innerWidth < 1025 && match?.params) {
        //   toDoHideSideBar()
        // } else {
        //   toDoShowSideBar()
        // }
    }, [match?.params])

    return (
        <>
            {
                <div
                    onClick={(e) => e.stopPropagation()}
                    id=''
                    className={`hidden absolute top-[15px] lg:sticky lg:top-[10px]  w-[180px]  lg:max-h-screen pb-[170px]  z-[23] overflow-scroll  lg:w-[200px]    ${
                        pathNameHome ? 'lg:block' : 'lg:hidden'
                    }  ${widthWindow < 1025 && (showSideBar === true ? 'block animate-showSideBarAni' : 'hidden animate-hideSideBarAni')}`}
                >
                    <div className='rounded '>
                        {danhMuc.isSuccess && <SideBarSection products={danhMuc?.data.data} />}

                        {noiBat.isSuccess && <SideBarSection products={noiBat?.data.data} />}
                        {/**banHang-container */}
                        <div className='bg-[#fff]  py-5 px-1 shadow-[-7px_5px_20px_6px_rgba(0,0,0,0.1);]'>
                            <Link to='/Contact' className='flex w-full gap-4 2xl:pl-3'>
                                <img
                                    src='https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp'
                                    alt=''
                                    width={28}
                                    height={28}
                                />
                                <span>Bán hàng cùng Tiki</span>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export const mapStateToProps = (state: RootState) => ({
    showSideBar: state.uiSlice.showSideBar,
})

export const mapDispatchToProps = (dispatch: any) => ({
    toDoHideSideBar: () => store.dispatch(toDoHideSideBar()),
    toDoShowSideBar: () => store.dispatch(toDoShowSideBar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
