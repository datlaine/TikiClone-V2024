import './header_list_up.css'
import ModuleHover from '../module_hover/Module_hover'
import { useState } from 'react'
import { useEffect } from 'react'
import InputSearch from './InputSearch'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getData } from '../../../apis/getDataMain'
import { SLATE_TIME } from '../../../apis/staleTime'
import { useGetWidth } from '../../CustomHooks/useGetWidth'
import { debounce } from 'lodash'
import { doOpenBoxLogin } from '../../../Redux/authSlice'
function Header_list_up() {
  const [search, setSearch] = useState('')
  const [showHideContentLeft, setShowHideContentLeft] = useState(false)
  const [apiSearch, setApiSearch] = useState([])
  const [ketQua, setKetQua] = useState([])
  let user = useSelector((state) => state.auth?.userCurrent) || localStorage.getItem('account')
  let navigate = useNavigate()
  const quantityProduct = useSelector((state) => state.cartList?.soLuong)
  const dispatch = useDispatch()

  const { data, isLoading } = useQuery({
    queryKey: ['search'],
    queryFn: () => getData('/danhSachSanPham'),
    staleTime: SLATE_TIME,
  })

  useEffect(() => {
    if (!isLoading) {
      // console.log(data?.data)
      setApiSearch(data?.data)
    }
  }, [isLoading])

  useEffect(() => {
    if (!search) {
      setKetQua('')
    }
  }, [search])

  const { width } = useGetWidth()

  useEffect(() => {
    // console.log('checkWidth', window.innerWidth)

    if (window.innerWidth < 1023) {
      const elementContentLeft = document.querySelector('#big')
      if (showHideContentLeft) {
        console.log(elementContentLeft)
        if (elementContentLeft) {
          elementContentLeft.style.display = 'block'
          elementContentLeft.style.opacity = 1
          // console.log('hiện')
        }
      }
      if (!showHideContentLeft) {
        if (elementContentLeft) {
          elementContentLeft.style.display = 'none'
          // console.log('ẩn')
        }
      }
    }else return
  }, [width, showHideContentLeft])

  const handleChange = debounce((e) => {
    let result = []
    console.log('search', search)
    setSearch(e.target.value)
    result = apiSearch.filter((item) => {
      let nameLowerCase = item.name.toLowerCase()
      return nameLowerCase.includes(search.toLowerCase())
    })
    if (result.length === 0) {
      setKetQua('')
    } else {
      console.log(result)
      setKetQua(result)
    }
  }, 500)

  const handleSubMit = (e) => {
    e.preventDefault()
  }

  const handleClick = (e) => {
    const showHideDataSearch = document.querySelector('.showHideDataSearch')
    showHideDataSearch.style.display = 'block'
  }

  const handleBlur = () => {
    // console.log('đang blur')
    const inputSearch = document.querySelector('.inputSearchHeader')
    inputSearch.value = ''
  }

  const goToCart = () => {
    if (!user) {
      console.log(user)
      dispatch(doOpenBoxLogin())
    } else {
      console.log(user)
      console.log('success')
      navigate('/Cart')
    }
  }

  const mobileShowContentLeft = (e) => {
    setShowHideContentLeft(!showHideContentLeft)
    console.log('clickdi')
  }

  return (
    <div
      id=''
      className='containerHeaderListUp xl:flex xl:items-center xl:justify-between xl:gap-x-4 dienThoai:px-2 dienThoai:h-full dienThoai:flex dienThoai:items-center dienThoai:gap-x-[8px]'
    >
      <Link className='logo' to='/'>
        <img
          src='https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png'
          className='xl:w-[57px] xl:h-10 xl:block dienThoai:hidden lg:block lg:w-[37px] lg:h-5'
          alt=''
        />
      </Link>

      <div className='dienThoai:block xl:hidden lg:hidden ' onClick={mobileShowContentLeft}>
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

      <form
        className='inputSearchWrapper relative  dienThoai:p-2 dienThoai:border-[1px] dienThoai:border-solid  dienThoai:border-[#ccc] dienThoai:rounded-[6px] lg:w-6/12 lg:mt-0 xl:mt-0 relative  xl:flex xl:w-7/12 xl:h-[40px] xl:justify-center xl:items-center  xl:pl-[16px] xl:rounded-[8px] xl:border xl:border-solid xl:border-[rgb(221, 221, 227)]  dienThoai:flex dienThoai:items-center dienThoai:gap-x-2 dienThoai:h-full dienThoai:w-full'
        id='inputFormSearch'
        onBlur={handleBlur}
        onSubmit={handleSubMit}
      >
        <i className='fa-solid fa-magnifying-glass xl:px-[4px]'></i>
        <input
          type='text'
          className='inputSearchHeader xl:border-none xl:flex-1 xl:px-[10px] xl:outline-none flex-1  focus:outline-none focus:border-none'
          placeholder='Bạn tìm gì hôm nay'
          onChange={handleChange}
          onClick={handleClick}
        />
        <div className='dienThoai:hidden sm:hidden md:hidden w-[0.5px] h-5 bg-gray-400'></div>
        <button
          type='submit'
          className='md:hidden sm:hidden dienThoai:hidden dienThoai:bg-sky-500 dienThoai:text-zinc-200 xl:bg-transparent  xl:hover:bg-sky-500 xl:hover:text-slate-50 xl:border-none xl:border-l-2 xl:text-[#0a68ff] xl:text-[14px] xl:font-medium  xl:px-[16px] dienThoai:p-2 dienThoai:rounded-[8px]'
          onClick={handleClick}
        >
          Tìm kiếm
        </button>
        <InputSearch data={ketQua} />
      </form>

      <div
        id=''
        className='dienThoai:hidden xl:flex xl:flex-1 lg:flex lg:items-center lg:h-full 2xl:justify-evenly lg:justify-evenly xl:justify-evenly'
      >
        <Link
          className='nav_item flex items-center justify-center gap-x-2 px-[16px] py-2 h-full  rounded-lg lg:flex	md:hidden xl:inline-block xl:min-w-[150px] xl:flex'
          to='/'
        >
          <img
            src='https://salt.tikicdn.com/ts/upload/32/56/db/d919a4fea46f498b5f4708986d82009d.png'
            alt=''
            className='w-5 h-5'
          />
          <button>Trang Chủ</button>
        </Link>
        <div className='nav_item'>
          <img
            src='https://salt.tikicdn.com/ts/upload/41/28/7d/4713aa0d2855c5c770799f248692f0c5.png'
            alt=''
            className='w-5 h-5'
          />
          <button>Astra</button>
        </div>
        <div className='nav_item'>
          <img
            src='https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png'
            alt=''
            className='w-5 h-5'
          />
          <button>Tài Khoản</button>
          <ModuleHover></ModuleHover>
        </div>
      </div>
      <div className='container-cart flex items-center justify-center'>
        <span className='cart' onClick={goToCart}>
          <img src='https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png' alt='' />
          <span className='numbers-cart'>{quantityProduct}</span>
        </span>
      </div>
    </div>
  )
}

export default Header_list_up
