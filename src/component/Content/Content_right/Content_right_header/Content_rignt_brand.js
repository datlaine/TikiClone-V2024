import './content_right_brand.css'

import {useState, useEffect} from 'react'

export default function Content_right_brand(props) {

    // console.log("content-right_brand re-render")

    const [dataApiBrand, setDataApiBrand] = useState([])
    
    //render lại khi gọi api
    useEffect(() => {

        fetch(props.urlApi)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                // console.log(data)
                setDataApiBrand(data)
            })
            
    }, [])
    
   
    return(
        <div className="content_right_brand">
            {
                dataApiBrand.map((item) => (
                <div className="content_right_brand_item" key={item.id}>
                    <img src={require(`${item.img}`)} alt="" />
                </div>
            ))
            }   
        </div>
    )

}