import { useEffect, useState } from 'react'

export const useGetWidth = () => {
      const [width, setWidth] = useState(0)

      useEffect(() => {
            function handleWindowResize() {
                  setWidth(window.innerWidth)
            }

            // console.log('checkWidth')

            window.addEventListener('resize', handleWindowResize)

            return () => {
                  window.removeEventListener('resize', handleWindowResize)
            }
      }, [width])

      return { width, setWidth }
}
