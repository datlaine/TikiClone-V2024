import './content_left.css'
import { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getData } from '../../../apis/getDataMain'
import { SLATE_TIME } from '../../../apis/staleTime'
export default memo(function ContentLeft(props) {
  const [list, setList] = useState([])

  //render lại khi gọi api
  // useEffect(() => {
  //   fetch(props.urlApi)
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((list) => {
  //       // console.log(list)
  //       setlist(list)
  //     })
  // }, [])

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: [`${props.category}`],
    queryFn: () => getData('/noiBat'),
    staleTime: SLATE_TIME,
  })

  useEffect(() => {
    if (!isLoading) {
      setList(data?.data)
    }
  }, [isLoading])

  const isDesktop = null

  {
    /*content-left-list content-desc-list content-left-list .content-left-list-item */
  }

  // console.log(list.title)
  return (
    <ul className='content-left-list'>
      <span className='content-desc-list'>{props.category}</span>
      {isSuccess &&
        list.map((item) => (
          <li key={item.id} className='content-left-list-item'>
            <Link to='*' className='link'>
              <img src={require(`${item.imgSrc}`)} alt='' height={32} width={32} />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
    </ul>
  )
})
