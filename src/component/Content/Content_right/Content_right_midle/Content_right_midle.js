import { useEffect, useState } from 'react'
import './content_right_midle.css'
import GiaTotHomNay from './GiaTotHomNay'

export default function Content_right_midle() {
    // console.log("content-right-midle re-render")

    const [giay, setGiay] = useState(59)
    const [phut, setPhut] = useState(59)
    const [gio, setGio] = useState(2)

    useEffect(() => {
        if (giay < 0) {
            setPhut((minutes) => minutes - 1)
            setGiay(59)
        }

        if (phut < 0) {
            setGio((hours) => hours - 1)
            setPhut(59)
        }
        if (gio < 0) {
            setGiay(59)
            setPhut(59)
            setGio(2)
        }

        const id = setInterval(() => {
            // console.log('setInterval is running')
            setGiay((second) => second - 1)
            // setGiay(giay => giay - 1)
        }, 1000)

        return () => {
            clearInterval(id)
        }
    }, [giay, phut, gio])

    return (
        <div id='Content_right_midle' className=''>
            <div className='content-right-midle-top'>
                <div className='content-midle-top-left'>
                    <span className='content-midle-title'>Giá sốc hôm nay</span>
                    <span className='time'>{gio <= 9 ? `0${gio}` : gio}</span>
                    <span className='dot'>:</span>
                    <span className='time'>{phut <= 9 ? `0${phut}` : phut}</span>
                    <span className='dot'>:</span>
                    <span className='time'>{giay <= 9 ? `0${giay}` : giay}</span>
                </div>
                <div className='xemThem'>
                    <span>Xem thêm</span>
                    <img src='https://salt.tikicdn.com/ts/upload/d8/38/d3/4bef23fec35f9fbfa1757d30184ddb9c.png' alt='' />
                </div>
            </div>

            <div className='content-right-midle-bottom'>
                <GiaTotHomNay />
            </div>
        </div>
    )
}
