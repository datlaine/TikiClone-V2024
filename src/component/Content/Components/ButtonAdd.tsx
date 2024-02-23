import { useRef, useEffect } from 'react'
import BoxButton from '../../BoxUi/BoxButton'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash'
import { toDoHideBoxSticky, toDoShowBoxSticky } from '../../../Redux/uiSlice'
type Props = {
      onClick?: React.MouseEventHandler<HTMLElement>
}

const ButtonAdd = (props: Props) => {
      const wrapperBoxButton = useRef<HTMLDivElement>(null)

      const dispatch = useDispatch()

      useEffect(() => {
            const scroll = () => {
                  console.log('re-render')
                  if (wrapperBoxButton.current) {
                        let top = wrapperBoxButton.current.getBoundingClientRect().top
                        if (top > 200) {
                              dispatch(toDoShowBoxSticky())
                        } else {
                              dispatch(toDoHideBoxSticky())
                        }
                  }
            }

            window.addEventListener('scroll', scroll)
            return () => window.removeEventListener('scroll', scroll)
      }, [])

      return (
            <div className='w-[250px] h-[55px] my-[25px]' ref={wrapperBoxButton}>
                  <BoxButton content='Thêm sản phẩm' />
            </div>
      )
}

export default ButtonAdd
