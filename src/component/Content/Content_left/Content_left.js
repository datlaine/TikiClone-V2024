import './content_left.css'
import { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
export default memo(function Content_left(props) {
  const [data, setData] = useState([])

  //render lại khi gọi api
  useEffect(() => {
    fetch(props.urlApi)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        // console.log(data)
        setData(data)
      })
  }, [])

  // console.log(data.title)
  return (
    <ul className='content-left-list'>
      <span className='content-desc-list'>{props.category}</span>
      {data.map((item) => (
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
