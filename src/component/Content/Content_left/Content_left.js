
import './content_left.css'
import { useState, useEffect, memo } from 'react'
// const url = 'http://localhost:8000/noiBat'
export default memo(function Content_left(props) {
    // xét data
    // console.log("content-left re-render")

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
    return(
            <ul className='content-left-list'>
                <span className="content-desc-list">{props.category}</span>
            {
                data.map((item) =>  (
                        <li key={item.id} className='content-left-list-item'>
                            <img src={require(`${item.imgSrc}`)} alt="" height={32} width={32} />
                            <span>{item.title}</span>
                        </li>                     
                ))
            }
            </ul>
    )
}
)