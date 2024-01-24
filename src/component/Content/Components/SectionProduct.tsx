import React from 'react'

type Props = {
    title?: React.ReactNode | JSX.Element
    other?: React.ReactNode | JSX.Element
    ElementRight?: React.ReactNode | JSX.Element | React.ReactNode[] | JSX.Element[]
    ListProducts: React.ReactNode | JSX.Element
    ArrowLeft?: JSX.Element | React.ReactElement
    ArrowRight?: JSX.Element | React.ReactElement
}

const SectionProduct = (props: Props) => {
    return (
        <div className='custom-product-item'>
            <div className='2xl:h[20%] 2xl:h-[25%] flex justify-between'>
                <div className=' flex items-center  2xl:gap-3 2xl:w-full'>
                    {props.title && props.title}
                    {props.other && props.other}
                </div>
                <div className=''>{props.ElementRight && props.ElementRight}</div>
            </div>

            {props.ListProducts && props.ListProducts}
        </div>
    )
}

export default SectionProduct
