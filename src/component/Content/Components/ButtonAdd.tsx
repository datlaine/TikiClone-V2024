import { useRef, useEffect } from 'react'
import BoxButton from '../../BoxUi/BoxButton'
import { useDispatch } from 'react-redux'
type Props = {
      onClick?: React.MouseEventHandler<HTMLElement>
}

const ButtonAdd = (props: Props) => {
      const wrapperBoxButton = useRef<HTMLDivElement>(null)

      const dispatch = useDispatch()

      useEffect(() => {
            const scroll = () => {
                  if (wrapperBoxButton.current) {
                        let top = wrapperBoxButton.current.getBoundingClientRect().top
                        if (top > 200) {
                        } else {
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
