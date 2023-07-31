import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './content.css'
import { apiLink } from '../../../apis/api'
import Content_left from '../Content_left/ContentLeft'
import Content_right from '../Content_right/Content_right'
import { screen } from '@testing-library/react'
import { useGetWidth } from '../../CustomHooks/useGetWidth'

function ContentMain({ getDataContent }) {
  const [height, setHeight] = useState(145)
  const [responsive, setResponsive] = useState(window.innerWidth)

  // console.log('>>>checkResponsive', responsive)

  useLayoutEffect(() => {
    const listenToScroll = function () {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop
      // console.log("winScroll ," + winScroll);
      const bigElement = document.getElementById('big')
      // console.log('trục Y:', winScroll)
      // console.log('checkVarWidth', window.innerWidth)
      if (winScroll < 50) {
        if (window.innerWidth <= 1280) {
          bigElement.style.top = '80px'
        }
        if (window.innerWidth > 1280) {
          bigElement.style.top = '160px'
        }
      }

      if (winScroll >= 45) {
        if (window.innerWidth <= 1280) {
          bigElement.style.top = '65.7px'
        }
        if (window.innerWidth > 1280) {
          bigElement.style.top = '25px'
        }
        setHeight(0)
      }
    }
    window.addEventListener('scroll', listenToScroll)
    return () => window.removeEventListener('scroll', listenToScroll)
  }, [height])

  const { width } = useGetWidth()

  useLayoutEffect(() => {
    const bigElement = document.querySelector('#big')
    const main = document.querySelector('#main')
    if (window.innerWidth < 768) {
      if (main) {
        main.addEventListener('click', () => {
          bigElement.style.display = 'none'
        })
      }
    } else {
      bigElement.style.display = 'block'
    }

    return () => {
      main.removeEventListener('click', console.log('run'), () => {
        bigElement.style.display = 'none'
      })
    }
  })
  const getData = (data, check) => {
    if (check) {
      getDataContent(data, check)
    }
  }

  useEffect(() => {
    // Thực hiện cuộn lên đầu trang khi component được render
    // window.scrollTo(0, 0);

    // Hoặc có thể sử dụng cú pháp này:
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth', // Nếu muốn có hiệu ứng cuộn mượt
    })
  }, [])

  // const controlShowHideContentLeft = (e) => {
  //   console.log('click')
  //   e.stopPropagation()
  // }

  return (
    <div id='content-container' className=''>
      <Content_right getDataContentRight={getData} />
    </div>
  )
}

export default ContentMain
