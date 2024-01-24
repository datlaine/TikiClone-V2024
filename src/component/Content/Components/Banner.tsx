import { useEffect, useRef } from 'react'
import hinhAnhSlider from '../utils/Image'

const Banner = () => {
    const imgRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        if (imgRef.current) {
            const randomImage = Math.trunc(Math.random() * hinhAnhSlider.length)

            imgRef.current.src = hinhAnhSlider[randomImage]
        }
    }, [])

    return (
        <div className='hidden 2xl:block basis-1/3'>
            <img className='w-full h-full ' ref={imgRef} />
        </div>
    )
}

export default Banner
