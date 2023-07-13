import './header_list_up.css'
import ModuleHover from '../module_hover/Module_hover'
import { useState } from 'react'
import { useEffect } from 'react'
import InputSearch from './InputSearch'
import { apiLink } from '../../../apis/api'
import { useSelect } from '@mui/base'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getData } from '../../../apis/getDataMain'
import { SLATE_TIME } from '../../../apis/staleTime'
function Header_list_up() {
  const [search, setSearch] = useState('')
  const [apiSearch, setApiSearch] = useState([])
  const [ketQua, setKetQua] = useState([])

  const quantityProduct = useSelector((state) => state.cartList.soLuong)
  // console.log(quantityProduct)

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

  const handleChange = (e) => {
    let result = []
    // console.log('search', search)
    setSearch(e.target.value)
    result = apiSearch.filter((item) => {
      let nameLowerCase = item.name.toLowerCase()
      return nameLowerCase.includes(search.toLowerCase())
    })
    if (result.length === 0) {
      setKetQua('')
    } else {
      // console.log(result)
      setKetQua(result)
    }
  }

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
    const main = document.getElementById('main')
    main.addEventListener('click', () => {
      const showHideDataSearch = document.querySelector('.showHideDataSearch')
      showHideDataSearch.style.display = 'none'
    })
  }

  return (
    <div id='header_list_up'>
      <Link className='logo' to='/'>
        <img
          src='https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png'
          width='57px'
          height='40px'
          alt=''
        />
      </Link>
      <div className='inputSearchWrapper' onBlur={handleBlur}>
        <form className='input' id='inputFormSearch' onSubmit={handleSubMit}>
          <i className='fa-solid fa-magnifying-glass'></i>
          <input
            type='text'
            className='inputSearchHeader'
            placeholder='Bạn tìm gì hôm nay'
            onChange={handleChange}
            onClick={handleClick}
          />
          <button type='submit' className='btn-header' onClick={handleClick}>
            Tìm kiếm
          </button>
          <InputSearch data={ketQua} />
        </form>
      </div>
      <div id='nav'>
        <Link className='nav_item bg-stone-900   text-white rounded-lg	' to='/'>
          <img
            src='https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png'
            alt=''
          />
          <button>Trang Chủ</button>
        </Link>
        <div className='nav_item'>
          <img
            src='https://salt.tikicdn.com/ts/upload/41/28/7d/4713aa0d2855c5c770799f248692f0c5.png'
            alt=''
          />
          <button>Astra</button>
        </div>
        <div className='nav_item'>
          <img
            src='https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png'
            alt=''
          />
          <button>Tài Khoản</button>
          <ModuleHover></ModuleHover>
        </div>
        <div className='container-cart'>
          <Link className='cart' to='/Cart'>
            <img
              src='https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png'
              alt=''
            />
            <span className='numbers-cart'>{quantityProduct}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header_list_up
