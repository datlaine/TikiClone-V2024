import { useRef } from 'react'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    Element: JSX.Element | string | React.ReactNode
    ClassName?: string
}

const BoxSticky = (props: Props) => {
    console.log('re-render')
    const wrapperBoxSticky = useRef<HTMLDivElement>(null)
    const show = useSelector((state: RootState) => state.uiSlice.showBoxSticky)
    console.log(show)

    return (
        <div
            ref={wrapperBoxSticky}
            className={`${
                show ? 'sticky shadow-lg rounded-[8px] mt-[25px] opacity-100 duration-700' : 'relative opacity-0 duration-0'
            } transition-all duration-200 lg:duration-400 top-[75px] lg:top-[0px]  w-full  z-[22] lg:pt-[15px] ${
                props.ClassName ? props.ClassName : ''
            }`}
        >
            <div className='h-full'>{props.Element && props.Element}</div>
        </div>
    )
}

export default BoxSticky
