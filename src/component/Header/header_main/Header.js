import './header.css'
import Header_list_up from '../header_list_up/Header_list_up'
import Header_list_down from '../header_list_down/Header_list_down'
import Header_last from '../header_last/Header_last'
import { useEffect } from 'react'

function Header() {
  const contentLeft = document.getElementById('showHideContentLeft')

  const anSearchInput = document.querySelector('.showHideDataSearch')

  const main = document.getElementById('main')

  if (main) {
    main.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        if (contentLeft) {
          contentLeft.style.display = 'none'
          anSearchInput.style.display = 'none'
        }
      }
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // console.log('rerends')
  return (
    <div
      id='Header'
      className='dienThoai:fixed dienThoai:left-0 dienThoai:right-0 xl:relative bg-[#fff] lg:w-full lg:px-2 lg:px-2 lg:h-16  xl:h-auto xl:w-full xl:px-0 xl:flex xl:flex-col dienThoai:h-auto dienThoai:h-[55px]  dienThoai:px-0 dienThoai:h-14 dienThoai:max-w-full'
    >
      <div className='container-header dienThoai:p-0 dienThoai:w-full dienThoai:h-full lg:px-2 lg:max-w-full xl:py-2 xl:px-[40px] lg:px-7'>
        <Header_list_up></Header_list_up>
        <Header_list_down></Header_list_down>
      </div>
      <Header_last></Header_last>
    </div>
  )
}

export default Header
