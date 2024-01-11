import { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toDoHideBoxSticky, toDoShowBoxSticky } from '../../Redux/uiSlice'
import { debounce } from 'lodash'

type Props = {
      content: string
}

const BoxButton = ({ content }: Props) => {
      return (
            <div className='w-full h-full flex items-center justify-center  bg-white border-[2px] border-red-300 text-red-300 rounded'>
                  {content}
            </div>
      )
}

export default BoxButton
