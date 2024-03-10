import { useEffect } from 'react'
import { Link, useMatch } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { BookOpenCheck, Wheat } from 'lucide-react'
type TProps = {}

function Sidebar(props: TProps) {
      const showSideBar = useSelector((state: RootState) => state.uiSlice.showSideBar)

      const match = useMatch('/')
      // const pathNameHome = window.location.pathname === '/'
      // const widthWindow = window.innerWidth
      useEffect(() => {
            // console.log('path', match?.pathname)
            if (!match?.params) {
                  // toDoHideSideBar()
            }

            // if (window.innerWidth < 1025 && match?.params) {
            //   toDoHideSideBar()
            // } else {
            //   toDoShowSideBar()
            // }
      }, [match?.params, showSideBar])

      const styleEffect = {
            showSideBar: showSideBar ? 'flex animate-showSideBarAni' : `hidden ${match ? 'xl:flex' : 'xl:hidden'}`,
      }

      return (
            <div
                  className={`${styleEffect.showSideBar}  fixed xl:sticky  w-[180px] xl:w-[300px] min-w-[260px] bg-[#ffffff] top-[75px] xl:top-[20px] h-[500px] z-[20]  `}
            >
                  <ul className='w-full h-[250px] flex flex-col'>
                        <li className=''>
                              <Link to={'/books?'} className='flex gap-[8px] w-full h-[70px] items-center px-[16px] py-[20px]'>
                                    <BookOpenCheck className='text-blue-400' />
                                    <span>Nhà sách Tiki</span>
                              </Link>
                        </li>
                        <li>
                              <Link to={'/foods'} className='flex gap-[8px] w-full h-[70px]  items-center px-[16px] py-[20px]'>
                                    <Wheat className='text-blue-400' />
                                    <span>Sạp thực phẩm</span>
                              </Link>
                        </li>
                  </ul>
            </div>
      )
}

export default Sidebar

//  <Link to='/Contact' className='flex w-full gap-4 2xl:pl-3'>
//                                                 <img
//                                                       src='https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp'
//                                                       alt=''
//                                                       width={28}
//                                                       height={28}
//                                                 />
//                                                 <span>Bán hàng cùng Tiki</span>
//                                           </Link>
