import React, { useEffect, useState } from 'react'
import './hangThuongHieuGiaTot.css'

const apiThuongHieuGiaTot = 'http://localhost:8000/hangThuongHieuGiaTot'

export default function HangThuongHieuGiaTot() {

    const [hinhAnh, setHinhAnh] = useState([])

    useState()

    useEffect(() => {
        fetch(apiThuongHieuGiaTot)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                // console.log(data)
                setHinhAnh(data)
            })
    }, [])

    const style = {
        width: '100%',
        height: '100%',
        borderRadius: '4px'
    }



  return (
    <div className="container_thuongHieuGiaTot">
        <h2 className='thuongHieuGiaTot_title'>Thương hiệu giá tốt</h2>
        <div className='hangThuongHieuGiaTot'>
        {
            hinhAnh && hinhAnh.map((data) => {
                return <div className={`item item${data.id}`} key={data.id}>
                        <img src={require(`${data.hinhAnh}`)} alt="" style={style}/>
                    </div>
                })
            }
            </div>
    </div>
  )
}
