import SimpleImageSlider from 'react-simple-image-slider'
import {
    slider1,
    slider2,
    slider3,
    slider4,
    slider5,
    slider6,
    slider7,
    slider8,
    slider9,
    slider10,
    slider11,
    slider12,
    slider13,
    slider14,
    slider15,
    slider16,
    slider17,
    slider18,
} from './HandleImage.js'
import './contentRightHeader.css'
import Content_right_brand from './Content_rignt_brand'
import { memo } from 'react'
import SliderProducts from '../../Components/SliderProducts.js'

const ContentRightHeader = () => {
    const hinhAnh = [
        { url: slider1 },
        { url: slider2 },
        { url: slider3 },
        { url: slider4 },
        { url: slider5 },
        { url: slider6 },
        { url: slider7 },
        { url: slider8 },
        { url: slider9 },
        { url: slider10 },
        { url: slider11 },
        { url: slider12 },
        { url: slider13 },
        { url: slider14 },
        { url: slider15 },
        { url: slider16 },
        { url: slider17 },
        { url: slider18 },
    ]

    return (
        <div id='Content_right_header' className=''>
            <div className='content-slider w-full'>
                <div className='content-slider-right w-full' style={{ borderRadius: '8px' }}>
                    <SimpleImageSlider
                        width={840}
                        height={274}
                        images={hinhAnh}
                        showBullets={false}
                        showNavs={true}
                        loop={true}
                        autoPlay={true}
                        autoPlayDelay={1}
                        borderRadius={150}
                    />
                </div>
                <div className='content-slider-left lg:hidden 2xl:block'>
                    <img src={require('./img/left.jpg')} alt='' className='' />
                </div>
            </div>

            <div className='content-brand'>
                <span className='desc-brand'>
                    Thương Hiệu Chính Hãng
                    <img
                        src={require('./img/logoBrand.jpg')}
                        style={{
                            height: '16px',
                            width: '70px',
                        }}
                        alt=''
                    />
                </span>

                <Content_right_brand />
                <SliderProducts />
            </div>
        </div>
    )
}

export default memo(ContentRightHeader)
